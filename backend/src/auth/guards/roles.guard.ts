import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Role } from '../../enums/role.enum';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { UserInfoDto } from '../dto/user-info.dto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  /* Check if roles array from the roles decorator includes the user's role */

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const userInfo: UserInfoDto = context.switchToHttp().getRequest().user;
    return requiredRoles.some((role) => {
      return userInfo.user.role === role;
    });
  }
}
