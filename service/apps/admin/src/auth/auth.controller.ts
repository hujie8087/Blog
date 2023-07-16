import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
// import { LocalAuthGuardUser } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { LoginUserDto } from '@libs/db/models/user.model';

@ApiTags('用户权限')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(LocalAuthGuardUser)
  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @Post('logout')
  @ApiOperation({ summary: '用户登出' })
  async logout() {
    return this.authService.logout();
  }
}
