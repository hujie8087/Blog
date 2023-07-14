import { Controller } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { TimeLine } from '@libs/db/models/timeLine.model';
import { ApiTags } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';

@Controller('timeline')
@Crud({
  model: TimeLine,
  config: {
    // 这里是配置一些crud的配置
    sort: { time: -1 },
  },
})
@ApiTags('时间轴')
export class TimelineController {
  constructor(@InjectModel(TimeLine) private readonly model) {}
}
