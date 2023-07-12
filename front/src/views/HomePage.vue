<template>
  <div class="BlogIndexContent">
    <div class="BlogFlex">
      <div class="BlogIndexContentLeft">
        <article-item
          v-for="item in articleList"
          :key="item._id"
          :article="item"
          @click="toDetail(item)"
        />
      </div>
      <div class="BlogIndexContentRight">
        <HotArticleModule
          v-if="hotArticleList.length > 0"
          :hot-article-list="hotArticleList"
          :tag-list-head="tagListHead"
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
              :checked="tagCheckedList.includes(item.value)"
              @change="onChange(item.value)"
              :key="item.value"
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
import type { ArticleType, PageType, articleTagType } from '#/article';
import { accountArticle, getArticleTag, getHotArticle } from '@/api/article';
import ArticleItem from '@/components/ArticleItem.vue';
import HotArticleModule from '@/components/HotArticleModule.vue';
import router from '@/router';
import { dayjs } from 'element-plus';
const tagListHead = ref('热门博文');
const articleList = ref<ArticleType[]>([]);
const hotArticleList = ref<ArticleType[]>([]);
const tagList = ref<articleTagType[]>([]);
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

const page = reactive<PageType>({
  pageNum: 1,
  pageSize: 10,
});

const getArticleList = async () => {
  const { data } = await accountArticle(page);
  articleList.value = data.list.map((item) => {
    return {
      ...item,
      createdAt: dayjs(item.createDate).format('YYYY-MM-DD HH:mm:ss'),
    };
  });
};

const getArticleTagDict = async () => {
  const { data } = await getArticleTag();
  tagList.value = data;
};

const toDetail = (article: ArticleType) => {
  router.push(`/BlogDetail?id=${article._id}`);
};

const getHotArticleList = async () => {
  const { data } = await getHotArticle();
  hotArticleList.value = data;
};
onBeforeMount(() => {
  getArticleTagDict();
  getArticleList();
  getHotArticleList();
});
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
