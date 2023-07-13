import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from '@libs/db/models/message.model';
import { ApiTags } from '@nestjs/swagger';

@Controller('messages')
@ApiTags('留言')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() createMessageDto: Message, @Req() req: any) {
    return this.messagesService.create(createMessageDto);
  }

  @Get('childComment/:id')
  findChildCommentById(@Param('id') id: string) {
    return this.messagesService.getAllComment(id);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.messagesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: Message) {
    return this.messagesService.update(id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(id);
  }
}
