import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiQuery,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { Hello, UserRole } from './classes/hello';
import { HelloService } from './hello.service';

@ApiBearerAuth()
@ApiTags('hello')
@Controller('/hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Get()
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'role', enum: UserRole })
  @ApiResponse({
    status: 200,
    description: '接口说明',
    type: Hello,
  })
  fetch(@Query() { id }, @Headers('token') token): string {
    console.log(token);
    return this.helloService.fetch(id);
  }

  @Post()
  @ApiBody({ description: '接口说明' })
  @ApiResponse({
    status: 200,
    description: '接口说明',
    type: Hello,
  })
  save(@Body() { message }): string {
    return this.helloService.save(message);
  }

  @Patch(':id')
  @ApiParam({ name: 'id' })
  @ApiBody({ description: '接口说明' })
  @ApiResponse({
    status: 200,
    description: '接口说明',
    type: Hello,
  })
  update(@Param() { id }, @Body() { message }): string {
    return this.helloService.update(id, message);
  }
  @Delete()
  remove(@Query() { id }): string {
    return this.helloService.remove(id);
  }
}
