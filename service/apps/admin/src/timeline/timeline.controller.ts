import { TimeLine } from '@libs/db/models/timeLine.model';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TimelineService } from './timeline.service';

@Controller('timeline')
@ApiTags('时间轴')
export class TimelineController {
  constructor(private readonly timeLineService: TimelineService) {}

  @Post()
  create(@Body() createTimeLine: TimeLine) {
    return this.timeLineService.create(createTimeLine);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.timeLineService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeLineService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTimeLineDto: TimeLine) {
    return this.timeLineService.update(id, updateTimeLineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeLineService.remove(id);
  }
}
