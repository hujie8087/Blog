<template>
  <div class="BlogIndexContent">
    <div class="BlogFlex">
      <div class="BlogIndexContentLeft">
        <article-item
          v-for="item in articleList"
          :key="item._id"
          :article="item"
        />
      </div>
      <div class="BlogIndexContentRight">
        <HotArticleModule
          :hot-article="articleList"
          :tag-listHead="tagListHead"
        />
        <div class="Module">
          <div class="TopBack"></div>
          <div class="ZhihuIcon">
            <img :src="blogStatistic.avatar" alt="" />
          </div>
          <div class="TextCenter">
            {{ blogStatistic.title }}
            <a
              :href="blogStatistic.github"
              target="_blank"
              rel="noopener noreferrer"
              class="BlueButton"
            >
              博客源码
            </a>
          </div>
          <div class="BlogStatistic">
            <div class="BlogStatisticItem">
              <div class="BlogStatisticItemNum">
                {{ blogStatistic.articleNum }}
              </div>
              <div class="BlogStatisticItemText">博客文章</div>
            </div>
            <div class="BlogStatisticItem">
              <div class="BlogStatisticItemNum">
                {{ blogStatistic.commentNum }}
              </div>
              <div class="BlogStatisticItemText">博文评论</div>
            </div>
            <div class="BlogStatisticItem">
              <div class="BlogStatisticItemNum">
                {{ blogStatistic.messageNum }}
              </div>
              <div class="BlogStatisticItemText">留言量</div>
            </div>
          </div>
        </div>
        <div class="Module ArticleTagModule">
          <div class="TagListHead">
            文章分类<span class="tagSubtitle">（点击筛选呦）</span>
          </div>
          <div class="TagListTr">
            <el-check-tag
              v-for="item in tagList"
              :checked="tagCheckedList.includes(item._id)"
              @change="onChange(item._id)"
              :key="item._id"
              effect="dark"
            >
              {{ item.label }}
            </el-check-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ArticleType } from '#/article';
import ArticleItem from '@/components/ArticleItem.vue';
import HotArticleModule from '@/components/HotArticleModule.vue';
const tagListHead = ref('热门博文');
const articleList: Array<ArticleType> = reactive([
  {
    ArticleCover: 'http://39.104.22.73:8888/maiDian.jpg',
    ArticleTag: '技术笔记',
    CommentNum: 4,
    Content: '内容副标题',
    CreateDate: '2022-12-11',
    Summary: '概括',
    Title: '文章标题',
    Token: 'fdsfdsagafdsafdsagdsafdsa',
    articleReadNum: 100,
    order: 1,
    _id: '1',
  },
  {
    ArticleCover: 'http://39.104.22.73:8888/maiDian.jpg',
    ArticleTag: '技术笔记',
    CommentNum: 5,
    Content: '内容副标题',
    CreateDate: '2022-12-11',
    Summary: '概括',
    Title: '文章标题',
    Token: 'fdsfdsagafdsafdsagdsafdsa',
    articleReadNum: 10,
    order: 2,
    _id: '1',
  },
]);
const tagList = reactive([
  { _id: 1, label: '技术笔记' },
  { _id: 2, label: '成长感悟' },
  { _id: 3, label: '征求意见' },
  { _id: 4, label: '服务器部署' },
]);
let tagCheckedList: Array<number> = reactive([]);
const blogStatistic = reactive({
  title: "Jayden's Blog",
  avatar: 'http://39.104.22.73:67/img/ZhihuIcon.4afbfd37.jpg',
  articleNum: 100,
  commentNum: 120,
  messageNum: 80,
  github: 'https://github.com/hujie8087',
});

const onChange = (_id: number): void => {
  if (tagCheckedList.includes(_id)) {
    tagCheckedList.splice(tagCheckedList.indexOf(_id), 1);
  } else {
    tagCheckedList.push(_id);
  }
};
</script>

<style scoped lang="less">
.BlogIndexContent {
  width: 1088px;
  margin: 74px auto 20px;
  .BlogFlex {
    display: flex;
    align-items: flex-start;
    .BlogIndexContentLeft {
      width: 75%;
      margin-right: 1rem;
      min-height: 52rem;
      position: relative;
    }
    .BlogIndexContentRight {
      width: 25%;
    }
  }
}
.TopBack {
  height: 8rem;
  background-image: url(../assets/images/zhihu-bg.jpg);
  background-position: 0 0;
  background-size: 100% 110px;
  background-repeat: no-repeat;
  background-color: #fff;
}
.ZhihuIcon {
  width: 6rem;
  height: 6rem;
  border-radius: 100%;
  border: 5px solid hsla(0, 0%, 100%, 0.5);
  margin: 0 auto;
  margin-top: -4.5rem;
  z-index: 100;
  img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }
}
.TextCenter {
  text-align: center;
  margin: 1.5rem;
}
.BlogStatistic {
  display: flex;
  align-items: center;
  color: #5e5e5e;
  padding: 1.5rem 0 1rem;
  border-top: 1px solid #e9e9e9;
  .BlogStatisticItem {
    flex: 1;
    text-align: center;
    .BlogStatisticItemNum {
      margin-bottom: 0.5rem;
      font-size: 1.2rem;
    }
    .BlogStatisticItemText {
      font-size: 0.8rem;
    }
  }
}
.ArticleTagModule {
  min-height: 175px;
  .TagListHead {
    padding: 0 0 0.5rem;
    border-bottom: 1px solid #01aaed;
    margin-bottom: 0.5rem;
    margin-right: 0.5rem;
    color: #01aaed;
    .tagSubtitle {
      color: #aaaaaa;
      font-size: 0.8rem;
    }
  }
  .TagListTr {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .el-check-tag {
      padding: 0.5rem 0;
      border: 1px solid #01aaed;
      background-color: #ffffff;
      margin-bottom: 0.5rem;
      flex: 1;
      min-width: 40%;
      margin-right: 0.5rem;
      text-align: center;
      cursor: pointer;
      -webkit-transition: all 0.3s;
      transition: all 0.3s;
      &:hover {
        transform: scale(0.9);
      }
      &.is-checked {
        background-color: #01aaed;
        color: #ffffff;
      }
    }
  }
}
</style>
