import { ReqPage } from "./index";

// 用户管理模块
export namespace User {
  export interface ReqUserParams extends ReqPage {
    username: string;
    gender: number;
    idCard: string;
    email: string;
    address: string;
    createTime: string[];
    status: number;
  }
  export interface ResUserList {
    id: string;
    username: string;
    gender: number;
    user: { detail: { age: number } };
    idCard: string;
    email: string;
    address: string;
    createTime: string;
    status: number;
    avatar: string;
    photo: any[];
    children?: ResUserList[];
  }
  export interface ResStatus {
    userLabel: string;
    userValue: number;
  }
  export interface ResGender {
    genderLabel: string;
    genderValue: number;
  }
  export interface ResDepartment {
    id: string;
    name: string;
    children?: ResDepartment[];
  }
  export interface ResRole {
    id: string;
    name: string;
    children?: ResDepartment[];
  }
}

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
