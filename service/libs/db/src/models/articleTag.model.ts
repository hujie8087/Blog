import { ApiProperty } from '@nestjs/swagger';
import { Prop, modelOptions } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class ArticleTag {
  @Prop({ default: '' })
  @ApiProperty({
    description: '标签名称',
    example: 'tags',
  })
  readonly title: string;

  @Prop({ default: new Date() })
  readonly createTime: string;

  @Prop({ default: new Date() })
  readonly updateTime: string;

  @Prop({ required: true })
  readonly id: number;

  @Prop({ default: 0 })
  readonly isDel: number;

  @Prop({ default: 0 })
  @ApiProperty({
    description: '是否禁用',
    example: 0,
  })
  readonly status: number;

  @Prop({ default: 999 })
  @ApiProperty({
    description: '排序',
    example: 999,
  })
  readonly sort: number;

  @Prop({ default: '' })
  @ApiProperty({
    description: '备注',
    example: '',
  })
  readonly remark: string;
}
