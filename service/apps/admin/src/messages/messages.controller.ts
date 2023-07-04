import { Message } from '@libs/db/models/message.model';
import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';
import { JwtAuthGuardUser } from '../auth/guards/jwt-auth.guard';

@Crud({
  model: Message,
})
@Controller('messages')
@ApiTags('留言')
@UseGuards(JwtAuthGuardUser)
export class MessagesController {
  constructor(@InjectModel(Message) private readonly model) {}
}
