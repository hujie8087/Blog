import { UsersService } from './users.service';
import { CreateUserDto, User } from '@libs/db/models/user.model';
import { Body, Controller, Post } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Crud({
  model: User,
})
@Controller('users')
@ApiTags('用户')
export class UsersController {
  constructor(
    @InjectModel(User) private readonly model,
    private readonly usersService: UsersService,
  ) {}

  //   @UseGuards(JwtAuthGuardUser)
  @Post('create')
  @ApiOperation({ summary: '注册' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }
}
