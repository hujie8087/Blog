import { ArticleTag } from '@libs/db/models/articleTag.model';
import { Injectable, Logger } from '@nestjs/common';
import { IResponse } from 'libs/interface/response.interface';
import { Model } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class ArticleTagsService {
  constructor(
    @InjectModel(ArticleTag)
    private articleTagModel: Model<ArticleTag>,
  ) {}
  private response: IResponse;

  async create(articleTag: ArticleTag) {
    const createArticleTag = new this.articleTagModel({
      ...articleTag,
    });
    await createArticleTag.save();
    Logger.log(`文章${articleTag.title}添加成功`);
    this.response = { code: 200, data: '', msg: '添加文章标签成功' };
    return this.response;
  }

  async findAll(query) {
    const { pageNum, pageSize, ...params } = query;
    if (params.title) {
      params.title = { $regex: params.title, $options: 'i' };
    }
    const total = await this.articleTagModel.countDocuments({
      ...params,
      isDel: false,
    });
    const data = await this.articleTagModel
      .find({ ...params, isDel: false }, { __v: 0, token: 0, isDel: 0 })
      .sort('sort')
      .skip(pageNum ? (pageNum - 1) * pageSize : 0)
      .limit(pageSize);
    this.response = {
      code: 200,
      msg: '文章标签列表',
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
    return await this.articleTagModel
      .findOne({ _id: id, isDel: false })
      .then(async () => {
        const data = await this.articleTagModel.findOne(
          { _id: id, isDel: false },
          { __v: 0, token: 0, createdAt: 0, updatedAt: 0, isDel: 0 },
        );
        this.response = {
          code: 200,
          msg: '文章标签详情',
          data,
        };
        return this.response;
      })
      .catch(() => {
        return (this.response = {
          code: 500,
          msg: '文章标签不存在',
          data: '',
        });
      });
  }

  async update(_id: string, updateArticleTag: ArticleTag) {
    return await this.articleTagModel
      .findOne({ _id, isDel: false })
      .then(async () => {
        await this.articleTagModel.findOneAndUpdate(
          { _id },
          updateArticleTag,
          {},
        );
        Logger.log(`文章标签${updateArticleTag.title}修改成功`);
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
          msg: '文章标签不存在',
          data: '',
        });
      });
  }

  async remove(_id: string) {
    return await this.articleTagModel
      .findOne({ _id: _id })
      .then(async () => {
        await this.articleTagModel.findOneAndUpdate(
          { _id },
          { isDel: true },
          {},
        );
        this.response = {
          code: 200,
          msg: '文章删除成功',
          data: '',
        };
        return this.response;
      })
      .catch((err) => {
        Logger.error(err);
        return (this.response = {
          code: 500,
          msg: '文章不存在',
          data: '',
        });
      });
  }
  async getArticleTagDict() {
    const data = await this.articleTagModel.find(
      { isDel: false },
      {
        __v: 0,
        token: 0,
        createdAt: 0,
        status: 0,
        sort: 0,
        remark: 0,
        updatedAt: 0,
        isDel: 0,
      },
    );
    this.response = {
      code: 200,
      msg: '文章标签字典',
      data,
    };
    return this.response;
  }
}
