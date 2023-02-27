import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';
import { Model } from 'mongoose';
import { Article, CreateArticle } from './classes/article';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('article')
    private readonly articleModel: Model<Article>,
  ) {}
  // 新建文章
  async create(body: CreateArticle): Promise<void> {
    const article = Object.assign(body, {
      CreateDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    });
    await this.articleModel.create(article);
  }
  // 查找所有数据
  async findAll(): Promise<Article[]> {
    const articles = await this.articleModel.find();
    return articles;
  }
  //  编辑文章
  async update(body: Article) {
    body.UpdateDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
    await this.articleModel.findByIdAndUpdate(body._id, body);
  }
  // 查询文章详情
  async findOne(id: string): Promise<Article | string> {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const articleInfo = await this.articleModel.findById(id);
      return articleInfo;
    } else {
      return '文章不存在';
    }
  }
  // 删除文章
  async delete(id: string) {
    await this.articleModel.findByIdAndDelete(id);
  }
}
