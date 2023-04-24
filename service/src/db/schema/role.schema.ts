import { SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/interface/role.interface';

export const RoleSchema = SchemaFactory.createForClass(Role);
