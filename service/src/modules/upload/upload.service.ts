import { Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';

@Injectable()
export class UploadService {
  upload(file: CreateUploadDto) {
    if (file) {
      return {
        code: 200,
        fileUrl: 'images/' + file.filename,
        success: '图片上传成功',
      };
    } else {
      return {
        code: 400,
        success: '图片上传失败',
      };
    }
  }
}
