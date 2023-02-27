import { request } from "../request";
import { adapter } from "@/utils";
import { adapterOfFetchArticleList } from "./management.adapter";

/** 获取文章列表 */
export const fetchArticleList = async () => {
	const data = await request.get<ApiArticleManagement.Article[] | null>(
		"/article"
	);
	return adapter(adapterOfFetchArticleList, data);
};
