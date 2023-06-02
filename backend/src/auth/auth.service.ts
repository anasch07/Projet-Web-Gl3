import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { Role } from 'src/enums/role.enum';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { UserInfoDto } from './dto/user-info.dto';

@Injectable()
export class AuthService {
  private readonly SECRET = process.env.JWT_SECRET;
  private readonly REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    loginDto: LoginDto,
    response: Response,
  ): Promise<LoginResponseDto> {
    const { username, password } = loginDto;
    const user = await this.userService.findByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid username or password')
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is disabled')
    }

    const { id, firstName, lastName, role } = user;

    const accessToken = await this.jwtService.signAsync(
      { username, firstName, lastName, role },
      { subject: id, expiresIn: '15m', secret: this.SECRET },
    );

    /* Generates a refresh token and stores it in a httponly cookie */
    const refreshToken = await this.jwtService.signAsync(
      { username, firstName, lastName, role },
      { subject: id, expiresIn: '1y', secret: this.REFRESH_SECRET },
    );

    await this.userService.setRefreshToken(id, refreshToken);

    response.cookie('refresh-token', refreshToken, { httpOnly: true });

    return { token: accessToken, user };
  }

  async logout(request: Request, response: Response): Promise<boolean> {
    // @ts-ignore
    const {user}: UserInfoDto = request.user;
    await this.userService.setRefreshToken(user.id, null);
    response.clearCookie('refresh-token');
    return true;
  }

  async register(registerDto: CreateUserDto) {
    const { role, ...data } = registerDto;
    return await this.userService.save({ ...data, role: Role.Student });
  }

  async refresh(
    refreshToken: string,
    response: Response,
  ): Promise<LoginResponseDto> {
    if (!refreshToken) {
      throw new BadRequestException('Refresh token required')
    }

    const decoded = this.jwtService.decode(refreshToken);
    const user = await this.userService.findById(decoded['sub']);
    const { firstName, lastName, username, id, role } = user;

    if (!(await bcrypt.compare(refreshToken, user.refreshToken))) {
      response.clearCookie('refresh-token');
      throw new ForbiddenException('Refresh token is not valid')
    }

    try {
      await this.jwtService.verifyAsync(refreshToken, {
        secret: this.REFRESH_SECRET,
      });
      const accessToken = await this.jwtService.signAsync(
        { username, firstName, lastName, role },
        { subject: id, expiresIn: '15m', secret: this.SECRET },
      );

      return { token: accessToken, user };
    } catch (error) {
      response.clearCookie('refresh-token');
      await this.userService.setRefreshToken(id, null);
      throw new ForbiddenException('Refresh token is not valid')
    }
  }
}
