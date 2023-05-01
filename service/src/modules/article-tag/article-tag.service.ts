import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Counters } from 'src/interface/Counters.interface';
import { ArticleTag } from 'src/interface/articleTag.interface';
import { IResponse } from 'src/interface/response.interface';

@Injectable()
export class ArticleTagService {
  constructor(
    @InjectModel('ARTICLE_TAG_MODEL')
    private readonly articleTagModel: Model<ArticleTag>,
    @InjectModel('COUNTERS_MODEL')
    private readonly countersModel: Model<Counters>,
  ) {}

  private response: IResponse;
  public async getArticleTagList(params, page) {
    const total = await this.articleTagModel.countDocuments({
      ...params,
      isDel: 0,
    });
    const title = params.title;
    //正则匹配 i忽略大小写
    const reg = new RegExp(title, 'i');
    let _filter = {
      //多字段匹配
      title: { $regex: reg },
      isDel: 0,
    };
    if (params.status) {
      _filter = Object.assign(_filter, { status: params.status });
    }
    const data = await this.articleTagModel
      .find(_filter, { __v: 0, _id: 0, isDel: 0 })
      .sort('sort')
      .skip(page.pageNum ? (page.pageNum - 1) * page.pageSize : 0)
      .limit(page.pageSize);
    this.response = {
      code: 200,
      msg: '文章标签列表',
      data: {
        list: data,
        total: total,
        pageNum: page.pageNum,
        pageSize: page.pageSize,
      },
    };
    return this.response;
  }

  public async addArticleTag(articleTag: ArticleTag) {
    const sequenceDocument = await this.countersModel.findOneAndUpdate(
      { name: 'articleTagId' },
      { $inc: { sequence_value: 1 } },
    );
    const createArticleTag = new this.articleTagModel({
      ...articleTag,
      id: sequenceDocument.sequence_value,
      isDel: 0,
      createTime: new Date(),
    });
    await createArticleTag.save();
    this.response = { code: 200, data: '', msg: '添加文章标签成功' };
    return this.response;
  }

  public async getArticleTagById(id: number) {
    return await this.articleTagModel
      .findOne({ id: id, isDel: 0 })
      .then(async () => {
        const data = await this.articleTagModel.findOne(
          { id: id, isDel: 0 },
          { _id: 0, __v: 0, isDel: 0 },
        );
        this.response = {
          code: 200,
          msg: '标签详情',
          data,
        };
        return this.response;
      })
      .catch(() => {
        this.response = {
          code: 500,
          msg: '数据不存在',
          data: '',
        };
        return this.response;
      });
  }

  public async updateArticleTag(articleTag: ArticleTag) {
    return await this.articleTagModel
      .findOneAndUpdate(
        { id: articleTag.id, isDel: 0 },
        { ...articleTag, updateTime: new Date() },
      )
      .then(() => {
        Logger.log(`标签${articleTag.title}修改成功`);
        return (this.response = {
          code: 200,
          data: '',
          msg: '文章标签修改成功',
        });
      });
  }

  public async delArticleTag(id: number) {
    return await this.articleTagModel
      .findOne({ id })
      .then(async () => {
        await this.articleTagModel.findOneAndUpdate({ id: id }, { isDel: 1 });
        this.response = { code: 200, data: '', msg: '删除文章标签成功' };
        return this.response;
      })
      .catch(() => {
        this.response = { code: 500, data: '', msg: '文章标签不存在' };
        return this.response;
      });
  }

  public async getArticleTagDict() {
    const data = await this.articleTagModel
      .find({ isDel: 0 }, { id: 1, title: 1, _id: 0 })
      .sort('sort');
    this.response = {
      code: 200,
      msg: '文章标签字典',
      data,
    };
    return this.response;
  }
}
