import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { join } from 'path';
import { zip } from 'compressing';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('文件接口')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiOperation({ summary: '文件上传' })
  @Post('album')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: CreateUploadDto) {
    console.log(file, '1213');
    return this.uploadService.upload(file);
  }

  @ApiOperation({ summary: '普通文件下载' })
  @Get('export')
  download(@Res() res: Response) {
    return res.download(join(__dirname, '../../images/1672876589052.jpeg'));
  }

  @ApiOperation({ summary: '文件流下载' })
  @Get('stream')
  async down(@Res() res: Response) {
    const url = join(__dirname, '../../images/1672876589052.jpeg');
    const targetStream = new zip.Stream();
    await targetStream.addEntry(url);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment;filename=jayden');
    targetStream.pipe(res);
  }
}
