import { adapter } from "@/utils";
import { mockRequest } from "../request";
import {
	adapterOfFetchUserList,
	adapterOfFetchArticleList,
} from "./management.adapter";

/** 获取用户列表 */
export const fetchUserList = async () => {
	const data = await mockRequest.post<ApiUserManagement.User[] | null>(
		"/getAllUserList"
	);
	return adapter(adapterOfFetchUserList, data);
};

/** 获取文章列表 */
export const fetchArticleList = async () => {
	const data = await mockRequest.post<ApiArticleManagement.Article[] | null>(
		"/getAllArticleList"
	);
	return adapter(adapterOfFetchArticleList, data);
};
