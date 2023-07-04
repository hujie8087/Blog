import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiProperty } from '@nestjs/swagger';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  getHello(): string {
    return this.adminService.getHello();
  }

  @Post('upload')
  @ApiProperty({ description: '单文件上传' })
  @ApiOperation({ summary: '单文件上传' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      data: {
        fileUrl: `/uploads/${file.filename}`,
        code: 200,
        msg: '文件上传成功',
      },
    };
  }
}
