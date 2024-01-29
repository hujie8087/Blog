import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TimelineService } from './timeline.service';

@Controller('timeline')
@ApiTags('时间轴')
export class TimelineController {
  constructor(private readonly timeLineService: TimelineService) {}

  @Get()
  findAll(@Query() query: any) {
    return this.timeLineService.findAll(query);
  }
}
