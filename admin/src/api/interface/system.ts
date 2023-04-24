import { ReqPage } from "./index";

// 菜单管理模块
export namespace Menu {
  export type ReqMenuParams = ReqPage;
  export interface ResMenuList {
    id: number;
    parentId?: number;
    sort?: number;
    path?: string;
    name?: string;
    component?: string;
    type?: number;
    title?: string;
    meta: {
      icon?: string;
      title?: string;
      isLink?: string;
      isHide?: boolean;
      isFull?: boolean;
      isAffix?: boolean;
      isKeepAlive?: boolean;
    };
    children?: ResMenuList[];
  }
  export interface ResMenu {
    id: number;
    auth?: string;
    icon?: string;
    name?: string;
    path?: string;
    parentId?: number;
    component?: string;
    sort?: number;
    title?: string;
    type?: number;
    isLink: string;
    isHide: boolean;
    isFull: boolean;
    isAffix: boolean;
    isKeepAlive: boolean;
  }
}

// 角色管理模块
export namespace Role {
  export interface ReqRoleParams {
    map: {
      name?: string;
      level?: number;
      status?: boolean;
    };
    page: ReqPage;
  }
  export interface ResRoleList {
    name: string;
    id: number;
    createTime: string;
    level: number;
    status: number;
    sort: number;
    remark: string;
    menuIds: number[];
  }
}
