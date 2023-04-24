// 系统组织接口管理
import { Role } from "@/api/interface/system";
import http from "@/api";
import { ResPage } from "@/api/interface";
import { ROLE } from "@/api/config/servicePort";

/**
 * @name 系统角色管理模块
 */

// * 新增系统角色
export const addRole = (params: FormData) => {
  return http.post(`/role`, params);
};

// * 获取系统角色列表
export const getRoleList = (params: Role.ReqRoleParams) => {
  return http.get<ResPage<Role.ResRoleList>>(ROLE, params);
};

// * 编辑系统角色
export const updateRole = (params: { id: string }) => {
  return http.put(ROLE, params);
};

// * 删除系统角色
export const delRole = (id: number) => {
  return http.delete(ROLE + `/${id}`);
};

// 切换角色状态
export const changeRoleStatus = (params: { id: number; status: number }) => {
  return http.put(ROLE, params);
};
