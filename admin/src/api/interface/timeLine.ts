import { ReqPage } from "./index";

export namespace TimeLine {
  export interface TimeLine {
    _id: string;
    title: string;
    time: string;
  }
  export interface CreateTimeLine {
    title: string;
    time: string;
  }
  export interface ReqTimeLineParams {
    params: {
      title?: string;
    };
    page: ReqPage;
  }
}
