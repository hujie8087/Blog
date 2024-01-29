// 系统组织接口管理
import { Menu } from "@/api/interface/system";
import http from "@/api";

/**
 * @name 系统菜单管理模块
 */

// * 新增系统菜单
export const addMenu = (params: FormData) => {
  return http.post(`/menu`, params);
};

// * 编辑系统菜单
export const editMenu = (params: FormData) => {
  return http.put(`/menu`, params);
};

// * 删除系统菜单
export const deleteMenu = (id: number) => {
  return http.delete(`/menu/${id}`);
};

// * 批量删除系统菜单
export const batchDeleteMenu = (ids: number[]) => {
  return http.put(`/menu/del`, ids);
};

// * 获取系统菜单详情
export const getMenuById = (id: number) => {
  return http.get<Menu.ResMenu>(`/menu/${id}`);
};

// * 获取系统菜单数据
export const getMenuTree = () => {
  return http.get<Menu.ResMenuList[]>(`/menu/tree`);
};
