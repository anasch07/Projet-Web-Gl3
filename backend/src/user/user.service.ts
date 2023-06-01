import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ILike, Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserQuery } from './user.query';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ){}
  async save(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.findByUsername(createUserDto.username);

    if (user) {
      throw new HttpException(
        `User with username ${createUserDto.username} is already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const { password } = createUserDto;
    createUserDto.password = await bcrypt.hash(password, 10);
    return this.userRepo.save(this.userRepo.create(createUserDto));
  }

  async findAll(userQuery: UserQuery): Promise<User[]> {
    Object.keys(userQuery).forEach((key) => {
      if (key !== 'role') {
        userQuery[key] = ILike(`%${userQuery[key]}%`);
      }
    });

    return this.userRepo.find({
      where: userQuery,
      order: {
        firstName: 'ASC',
        lastName: 'ASC',
      },
    });
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepo.findOne(id);

    if (!user) {
      throw new HttpException(
        `Could not find user with matching id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepo.findOne({ where: { username } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const currentUser = await this.findById(id);

    /* If username is same as before, delete it from the dto */
    if (currentUser.username === updateUserDto.username) {
      delete updateUserDto.username;
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    if (updateUserDto.username) {
      if (await this.findByUsername(updateUserDto.username)) {
        throw new HttpException(
          `User with username ${updateUserDto.username} is already exists`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    return this.userRepo.save(this.userRepo.create({ id, ...updateUserDto }));
  }

  async delete(id: string): Promise<string> {
    await this.userRepo.delete(await this.findById(id));
    return id;
  }

  async count(): Promise<number> {
    return await this.userRepo.count();
  }

  /* Hash the refresh token and save it to the database */
  async setRefreshToken(id: string, refreshToken: string): Promise<void> {
    await this.userRepo.update(id, {
      refreshToken: refreshToken ? await bcrypt.hash(refreshToken, 10) : null,
    });
  }
}
