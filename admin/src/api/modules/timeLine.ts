import http from "@/api";
import { TIMELINE } from "@/api/config/servicePort";
import { ResPage, ResultData } from "@/api/interface";
import { TimeLine } from "@/api/interface/timeLine";

/**
 * @name 文章管理模块
 */

// * 新增文章
export const addTimeLine = (params: TimeLine.TimeLine) => {
  return http.post(TIMELINE, params);
};

// 查询文章列表
export const getTimeLineList = (params: TimeLine.ReqTimeLineParams) => {
  return http.get<ResPage<TimeLine.TimeLine[]>>(TIMELINE, params);
};

// 查询文章详情
export const getTimeLineById = (id: string) => {
  return http.get<TimeLine.TimeLine>(`${TIMELINE}/${id}`);
};

// 修改文章
export const updateTimeLine = (params: TimeLine.TimeLine) => {
  return http.put<ResultData>(`${TIMELINE}/${params._id}`, params);
};

// 删除文章
export const delTimeLine = (id: string) => {
  return http.delete<ResultData>(`${TIMELINE}/${id}`);
};

// 修改文章状态
export const changeTimeLineStatus = (params: { id: string; status: boolean }) => {
  return http.put<ResultData>(`${TIMELINE}/status/${params.id}`, { status: params.status });
};
