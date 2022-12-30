export function adapterOfFetchUserList(
	data: ApiUserManagement.User[] | null
): UserManagement.User[] {
	if (!data) return [];

	return data.map((item, index) => {
		const user: UserManagement.User = {
			index: index + 1,
			key: item.id,
			...item,
		};

		return user;
	});
}

export function adapterOfFetchArticleList(
	data: ApiArticleManagement.Article[] | null
): ArticleManagement.Article[] {
	if (!data) return [];

	return data.map((item, index) => {
		const article: ArticleManagement.Article = {
			index: index + 1,
			key: item._id,
			...item,
		};

		return article;
	});
}
