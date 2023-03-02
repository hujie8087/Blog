import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { User } from 'src/interface/user.interface';
import { Role } from '../role/role.decorator';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('用户模块')
// @UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('jwt')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Role('admin')
  findAll() {
    return this.userService.findAll();
  }

  @Get('hello')
  hello() {
    return this.userService.hello();
  }
}
