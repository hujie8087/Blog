import { Role } from 'src/interface/role.interface';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Counters } from 'src/interface/Counters.interface';
import { IResponse } from 'src/interface/response.interface';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel('ROLE_MODEL') private readonly roleModel: Model<Role>,
    @InjectModel('COUNTERS_MODEL')
    private readonly countersModel: Model<Counters>,
  ) {}

  private response: IResponse;

  public async getRoleList(map, page) {
    const total = await this.roleModel.countDocuments({ ...map, isDel: 0 });
    return await this.roleModel
      .find({ ...map, isDel: 0 }, { _id: 0, __v: 0, menuIds: 0 })
      .sort('sort')
      .skip(page.pageNum ? (page.pageNum - 1) * page.pageSize : 0)
      .limit(page.pageSize)
      .then((res) => {
        this.response = {
          code: 200,
          msg: '角色列表',
          data: {
            list: res,
            total: total,
            pageNum: page.pageNum,
            pageSize: page.pageSize,
          },
        };
        return this.response;
      });
  }

  public async addRole(role: Role) {
    const sequenceDocument = await this.countersModel.findOneAndUpdate(
      { name: 'roleId' },
      { $inc: { sequence_value: 1 } },
    );
    const createRole = new this.roleModel({
      ...role,
      id: sequenceDocument.sequence_value,
      isDel: 0,
      createTime: new Date(),
    });
    await createRole.save();
    this.response = { code: 200, data: '', msg: '添加角色成功' };
    return this.response;
  }

  public async updateRole(role: Role) {
    return await this.roleModel.findOne({ id: role.id }).then(async () => {
      return await this.roleModel
        .findOneAndUpdate(
          { id: role.id },
          { ...role, updateTime: new Date() },
          {},
          () => {
            Logger.log(`角色${role.name}修改成功`);
          },
        )
        .then(() => {
          return (this.response = {
            code: 200,
            data: '',
            msg: '角色修改成功！',
          });
        })
        .catch((err) => {
          return err;
        });
    });
  }

  public async getRoleById(id: number) {
    const data = await this.roleModel.findOne({ id });
    this.response = {
      code: 200,
      msg: '角色详情',
      data,
    };
    return this.response;
  }

  public async delRole(id: number) {
    return await this.roleModel
      .findById(id)
      .then(async () => {
        await this.roleModel
          .findOneAndUpdate({ id }, { isDel: 1 }, {}, () => {
            Logger.log(`删除角色${id}成功`);
          })
          .then(() => {
            return (this.response = {
              code: 200,
              data: '',
              msg: '角色删除成功！',
            });
          })
          .catch((err) => {
            return err;
          });
      })
      .catch(() => {
        this.response = {
          code: 500,
          msg: '角色不存在',
          data: '',
        };
      });
  }
}
