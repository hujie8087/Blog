import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/interface/user.interface';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('用户权限模块')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: '用户登录',
  })
  public async userLogin(@Body() userDto: User) {
    return await this.authService.login(userDto);
  }

  @Post('regist')
  @ApiOperation({
    summary: '用户注册',
  })
  async create(@Body() createUserDto: User) {
    return await this.authService.create(createUserDto);
  }
  @Post('alter')
  @ApiOperation({
    summary: '用户修改密码',
  })
  async alter(@Body() userDto: User) {
    return await this.authService.alter(userDto);
  }
}
