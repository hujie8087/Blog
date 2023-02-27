import { Schema } from 'mongoose';
/**
 * 用户状态
 * - 1: 启用
 * - 2: 禁用
 * - 3: 冻结
 * - 4: 软删除
 */
export const UserSchema = new Schema({
  userName: { type: String, required: true },
  password: { type: String, require: true },
  age: { type: Number },
  gender: { type: String },
  phone: { type: String },
  email: { type: String },
  userStatus: { type: String },
  userRole: { type: Array },
  createDate: { type: String, timestamps: true },
  updateDate: { type: String, timestamps: true },
});
