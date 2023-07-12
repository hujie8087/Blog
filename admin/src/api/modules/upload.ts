import { Upload } from "@/api/interface/index";
import { UPLOAD } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 文件上传模块
 */
// 图片上传
export const uploadImg = (params: FormData) => {
  return http.post<Upload.ResFileUrl>(UPLOAD, params);
};

// 视频上传
export const uploadVideo = (params: FormData) => {
  return http.post<Upload.ResFileUrl>(UPLOAD + `/file/upload/video`, params);
};
