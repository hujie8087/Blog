import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Role extends Document {
  @Prop()
  @ApiProperty({
    description: '角色名称',
    example: 'admin',
  })
  readonly name: string;

  @Prop()
  @ApiProperty({
    description: '菜单权限',
    example: [0, 1],
  })
  readonly menuIds: number[];

  @Prop()
  readonly createTime: string;
  @Prop()
  readonly updateTime: string;

  @Prop()
  readonly id: number;

  @Prop()
  @ApiProperty({
    description: '权重',
    example: 0,
  })
  readonly level: number;

  @Prop()
  readonly isDel: number;

  @Prop()
  @ApiProperty({
    description: '是否禁用',
    example: false,
  })
  readonly status: number;

  @Prop()
  @ApiProperty({
    description: '排序',
    example: 999,
  })
  readonly sort: number;

  @Prop()
  @ApiProperty({
    description: '备注',
    example: '',
  })
  readonly remark: string;
}
