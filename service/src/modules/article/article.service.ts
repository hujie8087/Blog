import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleType } from './classes/article';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('article')
    private readonly articleModel: Model<Article>,
  ) {}
  // 新建文章
  async create(body: Article): Promise<void> {
    console.log(body);

    await this.articleModel.create(body);
  }
  // 查找所有数据
  async findAll(): Promise<Article[]> {
    const articles = await this.articleModel.find();
    return articles;
  }
  //  编辑文章
  async update(body: ArticleType) {
    await this.articleModel.findByIdAndUpdate(body._id, body);
  }
  // 查询文章详情
  async findOne(id: string): Promise<Article> {
    return await this.articleModel.findOne({ _id: id });
  }
  // 删除文章
  async delete(id: string) {
    await this.articleModel.findByIdAndDelete(id);
  }
}
