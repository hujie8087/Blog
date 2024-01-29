<template>
  <div class="TestField">
    <div class="FriendUrlBac">
      <div class="FriendUrlTitle">
        <div class="FriendUrlTitleText">我的试验田</div>
        <div class="CreateFriendUrlButton">你只管努力，收获的季节终会到来</div>
      </div>
    </div>
    <div class="TestList">
      <test-item
        v-for="item in articleList"
        :key="item._id"
        :articleInfo="item"
      ></test-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ArticleType } from '#/article';
import testItem from './testItem.vue';

const articleList = reactive<ArticleType[]>([
  {
    articleCover: 'http://39.104.22.73:8888/maiDian.jpg',
    articleTag: '技术笔记',
    commentNum: 4,
    content: '内容副标题',
    createDate: '2022-12-11',
    summary: '概括',
    title: '文章标题',
    token: 'fdsfdsagafdsafdsagdsafdsa',
    articleReadNum: 100,
    sort: 1,
    _id: '1',
  },
  {
    articleCover: 'http://39.104.22.73:8888/maiDian.jpg',
    articleTag: '技术笔记',
    commentNum: 5,
    content: '内容副标题',
    createDate: '2022-12-11',
    summary: '概括',
    title: '文章标题',
    token: 'fdsfdsagafdsafdsagdsafdsa',
    articleReadNum: 10,
    sort: 2,
    _id: '2',
  },
  {
    articleCover: 'http://39.104.22.73:8888/maiDian.jpg',
    articleTag: '技术笔记',
    commentNum: 5,
    content: '内容副标题',
    createDate: '2022-12-11',
    summary: '概括',
    title: '文章标题',
    token: 'fdsfdsagafdsafdsagdsafdsa',
    articleReadNum: 10,
    sort: 2,
    _id: '3',
  },
  {
    articleCover: 'http://39.104.22.73:8888/maiDian.jpg',
    articleTag: '技术笔记',
    commentNum: 5,
    content: '内容副标题',
    createDate: '2022-12-11',
    summary: '概括',
    title: '文章标题',
    token: 'fdsfdsagafdsafdsagdsafdsa',
    articleReadNum: 10,
    sort: 2,
    _id: '4',
  },
  {
    articleCover: 'http://39.104.22.73:8888/maiDian.jpg',
    articleTag: '技术笔记',
    commentNum: 5,
    content: '内容副标题',
    createDate: '2022-12-11',
    summary: '概括',
    title: '文章标题',
    token: 'fdsfdsagafdsafdsagdsafdsa',
    articleReadNum: 10,
    sort: 2,
    _id: '5',
  },
  {
    articleCover: 'http://39.104.22.73:8888/maiDian.jpg',
    articleTag: '技术笔记',
    commentNum: 5,
    content: '内容副标题',
    createDate: '2022-12-11',
    summary: '概括',
    title: '文章标题',
    token: 'fdsfdsagafdsafdsagdsafdsa',
    articleReadNum: 10,
    sort: 2,
    _id: '6',
  },
  {
    articleCover: 'http://39.104.22.73:8888/maiDian.jpg',
    articleTag: '技术笔记',
    commentNum: 5,
    content: '内容副标题',
    createDate: '2022-12-11',
    summary: '概括',
    title: '文章标题',
    token: 'fdsfdsagafdsafdsagdsafdsa',
    articleReadNum: 10,
    sort: 2,
    _id: '7',
  },
  {
    articleCover: 'http://39.104.22.73:8888/maiDian.jpg',
    articleTag: '技术笔记',
    commentNum: 5,
    content: '内容副标题',
    createDate: '2022-12-11',
    summary: '概括',
    title: '文章标题',
    token: 'fdsfdsagafdsafdsagdsafdsa',
    articleReadNum: 10,
    sort: 2,
    _id: '8',
  },
]);
</script>

<style scoped lang="less">
.TestField {
  margin-top: 58px;
  .FriendUrlBac {
    height: 27rem;
    position: relative;
    background: url('@/assets/images/test-field-bg.jpg') no-repeat 100% #cef;
    background-position: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .FriendUrlTitle {
      padding: 9rem 0 0 0;
      width: 80%;
      height: 20%;
      text-align: center;
      margin-bottom: 15rem;
      .FriendUrlTitleText {
        color: #fff;
        font-size: 2.2rem;
        font-family: Helvetica, STHeiti STXihei, Microsoft JhengHei,
          Microsoft YaHei, Tohoma, Arial;
      }
      .CreateFriendUrlButton {
        color: #ffffff;
        display: inline-block;
        height: 2.5rem;
        line-height: 2.5rem;
        padding: 0 1.5rem;
        margin-top: 1.5rem;
        bsort-radius: 3px;
        cursor: pointer;
        font-size: 1rem;
      }
    }
  }
  .TestList {
    width: 1200px;
    margin: 1rem auto 0;
    min-height: 29rem;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    margin-top: 1rem;
  }
}
</style>
