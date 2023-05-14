import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MessageService } from './message.service';
import { Message } from 'src/interface/message.interface';

@ApiTags('留言接口')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @ApiOperation({ summary: '新建文章' })
  async create(@Body() createMessageDto: Message) {
    return await this.messageService.create(createMessageDto);
  }
}
