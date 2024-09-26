import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../user/role.enum';
import { RolesIN } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(RolesIN, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request?.user;
    return matchRoles(roles, user?.role);
  }
}

function matchRoles(roles: Roles[], userRole: Roles): boolean {
  for(let role of roles){
    if(role === userRole ) return true ;
  }
  return false ;
}
