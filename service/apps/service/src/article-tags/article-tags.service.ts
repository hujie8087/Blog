import { ArticleTag } from '@libs/db/models/articleTag.model';
import { Injectable } from '@nestjs/common';
import { IResponse } from 'libs/interface/response.interface';
import { Model } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class ArticleTagsService {
  constructor(
    @InjectModel(ArticleTag) private articleTagsModel: Model<ArticleTag>,
  ) {}
  private response: IResponse;

  async findAll() {
    const data = (await this.articleTagsModel.find({ isDel: false })).map(
      (item) => {
        return {
          label: item.title,
          value: item._id,
        };
      },
    );
    this.response = {
      code: 200,
      data,
      msg: '文章标签',
    };
    return this.response;
  }
}
