import { Injectable, Logger } from '@nestjs/common';
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
    const menuList = (await this.menuModel.find())
      .sort(this.compare('sort'))
      .map((item) => {
        return {
          id: item.id,
          parentId: item.parentId,
          path: item.path,
          name: item.name,
          component: item.component,
          title: item.title,
          sort: item.sort,
          meta: {
            icon: item.icon,
            title: item.title,
            isLink: item.isLink,
            isHide: item.isHide,
            isFull: item.isFull,
            isAffix: item.isAffix,
            isKeepAlive: item.isKeepAlive,
          },
        };
      });
    const data = this.arrayToTree(menuList);
    this.response = {
      code: 200,
      msg: '获取菜单列表',
      data: data,
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

  public async updateMenu(menu: Menu) {
    return this.menuModel.findOne({ id: menu.id }).then(async () => {
      return await this.menuModel
        .findOneAndUpdate({ id: menu.id }, menu, {}, () => {
          Logger.log(`菜单${menu.name}修改成功`);
        })
        .then(() => {
          return (this.response = {
            code: 200,
            data: '',
            msg: '菜单修改成功！',
          });
        })
        .catch((err) => {
          return err;
        });
    });
  }

  public async findMenuById(id: number) {
    const data = await this.menuModel.findOne({ id });
    this.response = {
      code: 200,
      msg: '获取菜单详情',
      data: data,
    };
    return this.response;
  }

  private arrayToTree = (data) => {
    const map = new Map();
    const result = []; // 存放树形结果

    // 生成一个用 id 作为 key，用原对象值并添加 children 以作为值的 Map 对象
    data.forEach((item) => map.set(item.id, { ...item, children: [] }));

    // 循环 map 数组
    map.forEach((item) => {
      if (map.has(item.parentId)) {
        const parentNode = map.get(item.parentId);
        parentNode.children.push(item);
      } else {
        result.push(map.get(item.id));
      }
    });

    return result;
  };

  private compare(key) {
    return (n, m) => {
      const a = n[key];
      const b = m[key];
      return a - b;
    };
  }
}
