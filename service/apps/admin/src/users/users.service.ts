import { CreateUserDto, User } from '@libs/db/models/user.model';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { cryptoString } from '../../../../libs/lib';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const { username, password } = createUserDto;
    createUserDto.password = cryptoString(password);
    const isExist = await this.findOneByName(username);
    if (isExist) {
      return {
        statusCode: 202,
        message: '已存在',
      };
    }
    const createUser = new this.userModel(createUserDto);
    return await createUser.save();
  }

  async findOneByName(username: string): Promise<any> {
    return this.userModel.findOne({
      username,
    });
  }
}
