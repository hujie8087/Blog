import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Menu extends Document {
  @Prop()
  @ApiProperty({
    description: '菜单路径',
    example: '/home/index',
  })
  readonly path: string;

  @Prop()
  @ApiProperty({
    description: '菜单名称',
    example: 'home',
  })
  readonly name: string;

  @Prop()
  @ApiProperty({
    description: '组件路径',
    example: '/home/index',
  })
  readonly component: string;

  @Prop()
  @ApiProperty({
    description: '图标',
    example: 'HomeFilled',
  })
  readonly icon: string;

  @Prop()
  @ApiProperty({
    description: '标题',
    example: '首页',
  })
  readonly title: string;

  @Prop()
  @ApiProperty({
    description: '外链',
    example: '',
  })
  readonly isLink: string;

  @Prop()
  @ApiProperty({
    description: '是否隐藏',
    example: false,
  })
  readonly isHide: boolean;

  @Prop()
  @ApiProperty({
    description: '是否全屏',
    example: false,
  })
  readonly isFull: boolean;
  @Prop()
  @ApiProperty({
    description: '是否固定显示',
    example: false,
  })
  readonly isAffix: boolean;

  @Prop()
  @ApiProperty({
    description: '是否缓存',
    example: false,
  })
  readonly isKeepAlive: boolean;

  @Prop()
  @ApiProperty({
    description: '父级id',
    example: 0,
  })
  readonly parentId?: number;

  @Prop()
  @ApiProperty({
    description: '排序',
    example: 999,
  })
  readonly sort: number;

  @Prop()
  @ApiProperty({
    description: '类型：1目录，2菜单，3按钮',
    example: 2,
  })
  readonly type: number;

  @Prop()
  readonly id: number;

  @Prop()
  @ApiProperty({
    description: '权限标记',
    example: 'system:menu:add',
  })
  readonly auth: string;

  @Prop()
  children?: MenuList[];
}

export class MenuList extends Document {
  path: string;
  name: string;
  component?: string | (() => Promise<unknown>);
  redirect?: string;
  meta: {
    icon: string;
    title: string;
    activeMenu?: string;
    isLink?: string;
    isHide: boolean;
    isFull: boolean;
    isAffix: boolean;
    isKeepAlive: boolean;
  };
  children?: MenuList[];
}
