import { Reflector } from '@nestjs/core';
import { Roles } from 'src/user/role.enum';

export const RolesIN = Reflector.createDecorator<Roles[]>();