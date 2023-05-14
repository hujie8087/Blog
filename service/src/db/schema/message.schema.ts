import { SchemaFactory } from '@nestjs/mongoose';
import { Message } from 'src/interface/message.interface';

export const MessageSchema = SchemaFactory.createForClass(Message);
