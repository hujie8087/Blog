import { SchemaFactory } from '@nestjs/mongoose';
import { Counters } from 'src/interface/Counters.interface';

export const CountersSchema = SchemaFactory.createForClass(Counters);
