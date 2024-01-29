import { ResPage } from "@/api/interface/index";
import { USER } from "@/api/config/servicePort";
import { User } from "@/api/interface/system";
import http from "@/api";

/**
 * @name 用户管理模块
 */
// 获取用户列表
export const getUserList = (params: User.ReqUserParams) => {
  return http.post<ResPage<User.ResUserList>>(USER, params);
};

// 新增用户
export const addUser = (params: { id: string }) => {
  return http.post(USER, params);
};

// 批量添加用户
export const BatchAddUser = (params: FormData) => {
  return http.post(USER + `/import`, params);
};

// 编辑用户
export const updateUser = (params: { id: string }) => {
  return http.put(USER, params);
};

// 删除用户
export const delUser = (params: { id: string[] }) => {
  return http.delete(USER, params);
};

// 切换用户状态
export const changeUserStatus = (params: { id: string; status: number }) => {
  return http.put(USER, params);
};

// 重置用户密码
export const resetUserPassWord = (params: { id: string }) => {
  return http.post(USER + `/rest_password`, params);
};

// 导出用户数据
export const exportUserInfo = (params: User.ReqUserParams) => {
  return http.download(USER + `/export`, params);
};

// 获取用户状态
export const getUserStatus = () => {
  return http.get<User.ResStatus>(USER + `/status`);
};

// 获取用户性别字典
export const getUserGender = () => {
  return http.get<User.ResGender>(USER + `/gender`);
};

// 获取用户角色字典
export const getUserRole = () => {
  return http.get<User.ResRole>(USER + `/role`);
};
