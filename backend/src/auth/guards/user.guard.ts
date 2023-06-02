import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserInfoDto } from '../dto/user-info.dto';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class UserGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const params = request.params;
    const { user }: UserInfoDto = request.user;

    /* It returns true if user's role is admin or user's id is match with the request parameter */
    if (user.role === Role.Admin) {
      return true;
    }

    return user.id === params.id;
  }
}
