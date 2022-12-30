import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  Admin = 'admin',
  User = 'user',
}

export class Hello {
  @ApiProperty({ example: '姓名', description: '姓名' })
  name: string;
  @ApiProperty({ example: '品种', description: '品种' })
  breed: string;
  @ApiProperty({ example: 18, description: '年龄' })
  age: number;
}
