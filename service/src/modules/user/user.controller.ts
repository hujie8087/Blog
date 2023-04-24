import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
@ApiTags('用户模块')
// @UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('jwt')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Query() query) {
    const page = {
      pageNum: Number(query.pageNum),
      pageSize: Number(query.pageSize),
    };
    const map = JSON.parse(JSON.stringify(query));
    delete map.pageNum;
    delete map.pageSize;
    return this.userService.getUserList(map, page);
  }
}
