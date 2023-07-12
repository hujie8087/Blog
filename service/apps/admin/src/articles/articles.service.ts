import { Article } from '@libs/db/models/article.model';
import { Injectable, Logger } from '@nestjs/common';
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
  // 新建
  async create(article: Article) {
    const createArticle = new this.articlesModel({
      ...article,
    });
    await createArticle.save();
    Logger.log(`文章${article.title}添加成功`);
    this.response = { code: 200, data: '', msg: '添加文章成功' };
    return this.response;
  }
  // 查询列表
  async findAll(query): Promise<any> {
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
  // 查询详情
  async findOne(id: string) {
    return await this.articlesModel
      .findOne({ _id: id, isDel: false })
      .then(async () => {
        const data = await this.articlesModel.findOne(
          { _id: id, isDel: false },
          { __v: 0, token: 0, createdAt: 0, updatedAt: 0, isDel: 0 },
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
  // 更新文章
  async update(id: string, article: Article) {
    return await this.articlesModel
      .findOne({ _id: id, isDel: false })
      .then(async () => {
        await this.articlesModel.findOneAndUpdate({ _id: id }, article, {});
        Logger.log(`文章${article.title}修改成功`);
        this.response = {
          code: 200,
          msg: '修改文章成功',
          data: '',
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
  // 删除文章
  async remove(_id: string) {
    return await this.articlesModel
      .findOne({ _id })
      .then(async () => {
        await this.articlesModel.findOneAndUpdate({ _id }, { isDel: true }, {});
        this.response = {
          code: 200,
          msg: '文章删除成功',
          data: '',
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
  // 修改文章状态
  async changeArticleStatus(_id: string, status: number) {
    return await this.articlesModel
      .findOne({ _id })
      .then(async () => {
        await this.articlesModel.findOneAndUpdate({ _id }, { status }, {});
        this.response = {
          code: 200,
          msg: '文章状态修改成功',
          data: '',
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
}
