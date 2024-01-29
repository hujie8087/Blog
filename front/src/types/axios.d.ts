export interface CustomResponseType<T> {
  code: number;
  msg: string;
  data: T;
}

export interface ResList<T> {
  list: T;
  pageNum: number;
  pageSize: number;
  total: number;
}
