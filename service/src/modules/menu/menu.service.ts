import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Counters } from 'src/interface/Counters.interface';
import { Menu } from 'src/interface/menu.interface';
import { IResponse } from 'src/interface/response.interface';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel('MENU_MODEL') private readonly menuModel: Model<Menu>,
    @InjectModel('COUNTERS_MODEL')
    private readonly countersModel: Model<Counters>,
  ) {}
  private response: IResponse;

  public async getMenu() {
    const menuList = await this.menuModel.find();
    this.response = {
      code: 200,
      msg: '获取菜单列表',
      data: menuList,
    };
    return this.response;
  }

  public async addMenu(menu: Menu) {
    const sequenceDocument = await this.countersModel.findOneAndUpdate(
      { name: 'menuId' },
      { $inc: { sequence_value: 1 } },
    );
    const createMenu = new this.menuModel({
      ...menu,
      id: sequenceDocument.sequence_value,
      parentId: menu.parentId || 0,
    });

    await createMenu.save();
    this.response = { code: 200, data: '', msg: '添加菜单成功' };
    return this.response;
  }
}
