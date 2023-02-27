import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: '用户id' })
  _id: string;
  @ApiProperty({ description: '用户创建日期' })
  createDate: string;
  @ApiProperty({ description: '用户更新日期' })
  updateDate: string;
}
