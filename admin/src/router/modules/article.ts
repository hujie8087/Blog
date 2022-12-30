const article: AuthRoute.Route = {
	name: "article",
	path: "/article",
	component: "basic",
	children: [
		{
			name: "article_list",
			path: "/article/list",
			component: "self",
			meta: {
				title: "文章列表",
				requiresAuth: true,
				icon: "ic:baseline-block",
			},
		},
		{
			name: "article_create",
			path: "/article/create",
			component: "self",
			meta: {
				title: "新建文章",
				requiresAuth: true,
				icon: "ic:baseline-block",
			},
		},
		{
			name: "article_edit",
			path: "/article/edit",
			component: "self",
			meta: {
				title: "编辑文章",
				requiresAuth: true,
				icon: "ic:baseline-block",
			},
		},
	],
	meta: {
		title: "文章管理",
		icon: "ant-design:exception-outlined",
		order: 1,
	},
};

export default article;
