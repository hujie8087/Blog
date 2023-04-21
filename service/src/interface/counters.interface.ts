import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Counters extends Document {
  @Prop()
  @ApiProperty({
    description: '集合名称',
    example: 'menuId',
  })
  readonly name: string;

  @Prop()
  @ApiProperty({
    description: '当前值',
    example: 0,
  })
  readonly sequence_value: number;
}
