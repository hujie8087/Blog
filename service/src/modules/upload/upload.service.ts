import { Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';
import { IResponse } from 'src/interface/response.interface';

@Injectable()
export class UploadService {
  private response: IResponse;

  upload(file: CreateUploadDto) {
    if (file) {
      this.response = {
        code: 200,
        data: file.filename,
        msg: '图片上传成功',
      };
    } else {
      this.response = {
        code: 200,
        data: '',
        msg: '图片上传失败',
      };
    }
    return this.response;
  }
}
