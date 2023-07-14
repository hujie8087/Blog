import { ApiProperty } from '@nestjs/swagger';
import { Prop, modelOptions } from '@typegoose/typegoose';
import { IsString } from 'class-validator';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class TimeLine {
  @Prop({ default: '' })
  @ApiProperty({ description: '时间轴', example: '标题' })
  @IsString()
  title: string;
  @Prop({ default: 0 })
  @ApiProperty({ description: '时间', example: '' })
  @IsString()
  time: string;
  @Prop({ default: false })
  isDel: boolean;
}
