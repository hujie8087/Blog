'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async userInfo() {
    const { ctx } = this;
    ctx.body = {
      name: '张三',
      age: 18,
    };
  }
}

module.exports = HomeController;
