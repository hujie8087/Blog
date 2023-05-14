import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IResponse } from 'src/interface/response.interface';
import { Counters } from 'src/interface/Counters.interface';
import { Article } from 'src/interface/article.interface';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('ARTICLE_MODEL')
    private readonly articleModel: Model<Article>,
    @InjectModel('COUNTERS_MODEL')
    private readonly countersModel: Model<Counters>,
  ) {}
  private response: IResponse;

  // 新建文章
  public async create(body: Article) {
    const sequenceDocument = await this.countersModel.findOneAndUpdate(
      { name: 'articleId' },
      { $inc: { sequence_value: 1 } },
    );

    const createArticle = new this.articleModel({
      ...body,
      id: sequenceDocument.sequence_value,
    });
    await createArticle.save();
    Logger.log(`文章${body.title}添加成功`);
    this.response = { code: 200, data: '', msg: '添加文章成功' };
    return this.response;
  }

  // 查找所有数据
  public async findAll(param, page) {
    const total = await this.articleModel.countDocuments({
      ...param,
      isDel: 0,
    });
    const data = await this.articleModel
      .find({ ...param, isDel: 0 })
      .sort('sort')
      .skip(page.pageNum ? (page.pageNum - 1) * page.pageSize : 0)
      .limit(page.pageSize);
    this.response = {
      code: 200,
      msg: '文章列表',
      data: {
        list: data,
        total,
        pageNum: page.pageNum,
        pageSize: page.pageSize,
      },
    };
    return this.response;
  }

  //  编辑文章
  public async update(body: Article) {
    return await this.articleModel
      .findOne({ id: body.id, isDel: 0 })
      .then(async () => {
        await this.articleModel.findOneAndUpdate({ id: body.id }, body, {});
        Logger.log(`文章${body.title}修改成功`);
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

  // 查询文章详情
  public async findOne(id: number) {
    return await this.articleModel
      .findOne({ id, isDel: 0 })
      .then(async () => {
        const data = await this.articleModel.findOne(
          { id, isDel: 0 },
          { __v: 0, _id: 0, token: 0, updateDate: 0 },
        );
        await this.articleModel.findOneAndUpdate(
          { id },
          { $inc: { articleReadNum: 1 } },
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

  // 删除文章
  public async delete(id: number) {
    return this.articleModel
      .findOne({ id })
      .then(async () => {
        await this.articleModel.findOneAndUpdate(
          { id },
          { isDel: 1 },
          {},
          () => {
            Logger.log(`文章删除${id}成功`);
          },
        );
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

  // 获取热门文章推荐
  public async getHotArticle() {
    const res = await this.articleModel
      .find({ isDel: 0 }, { __v: 0, _id: 0, token: 0, updateDate: 0 })
      .sort({ articleReadNum: 1 })
      .limit(10);
    this.response = {
      code: 200,
      msg: '热门文章',
      data: res,
    };
    return this.response;
  }
}
