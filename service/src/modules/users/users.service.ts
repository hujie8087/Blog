import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as svgCaptcha from 'svg-captcha';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users') private readonly usersModel: Model<UpdateUserDto>, //private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    await this.usersModel.create(createUserDto);
    return {
      code: 200,
      message: '新建用户成功',
    };
  }

  async getCode() {
    const Captcha = await svgCaptcha.create({
      size: 4,
      fontSize: 80,
      width: 160,
      height: 60,
      background: '#ffffff',
    });
    return Captcha;
  }

  async findOne(username: string) {
    return await this.usersModel.findOne({
      userName: username,
    });
  }
  findAll() {
    return `This action returns all users`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
