import { Article } from '@libs/db/models/article.model';
import { Injectable } from '@nestjs/common';
import { IResponse } from 'libs/interface/response.interface';
import { Model } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article)
    private articlesModel: Model<Article>,
  ) {}
  private response: IResponse;

  async findAll(query) {
    const { pageNum, pageSize, ...params } = query;
    if (params.title) {
      params.title = { $regex: params.title, $options: 'i' };
    }
    if (params.summary) {
      params.summary = { $regex: params.summary, $options: 'i' };
    }
    const total = await this.articlesModel.countDocuments({
      ...params,
      isDel: false,
    });
    const data = await this.articlesModel
      .find({ ...params, isDel: false })
      .sort('sort')
      .skip(pageNum ? (pageNum - 1) * pageSize : 0)
      .limit(pageSize);
    this.response = {
      code: 200,
      msg: '文章列表',
      data: {
        list: data,
        total,
        pageNum: +pageNum,
        pageSize: +pageSize,
      },
    };
    return this.response;
  }

  async findOne(id: string) {
    return await this.articlesModel
      .findOne({ _id: id, isDel: false })
      .then(async (res) => {
        const data = await this.articlesModel.findOne(
          { _id: id, isDel: false },
          { __v: 0, token: 0, createdAt: 0, updatedAt: 0, isDel: 0 },
        );
        await this.articlesModel.findOneAndUpdate(
          { _id: id },
          { articleReadNum: res.articleReadNum + 1 },
          {},
        );
        this.response = {
          code: 200,
          msg: '文章详情',
          data,
        };
        return this.response;
      })
      .catch(() => {
        return (this.response = {
          code: 500,
          msg: '文章不存在',
          data: '',
        });
      });
  }

  async getHotArticles() {
    const data = await this.articlesModel
      .find({ isDel: false })
      .sort('articleReadNum')
      .limit(10);
    this.response = {
      code: 200,
      msg: '文章列表',
      data,
    };
    return this.response;
  }
}
