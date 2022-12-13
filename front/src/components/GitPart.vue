<template>
  <div class="GitPart">
    <div class="TopBackBlack">
      <img src="../assets/images/github.png" alt="" srcset="" />
    </div>
    <div class="Content">
      <div class="GitName">
        {{ blogStatistic.title }}
      </div>
      <a
        href="https://github.com/hujie8087"
        target="_blank"
        class="BlueButton"
        rel="noopener noreferrer"
        >博客源码</a
      >
      <div class="BlogStatistic">
        <div class="BlogStatisticItem">
          <div class="BlogStatisticItemNum">
            {{ blogStatistic.articleNum }}
          </div>
          <div class="BlogStatisticItemText">Followers</div>
        </div>
        <div class="BlogStatisticItem">
          <div class="BlogStatisticItemNum">
            {{ blogStatistic.commentNum }}
          </div>
          <div class="BlogStatisticItemText">Star</div>
        </div>
        <div class="BlogStatisticItem">
          <div class="BlogStatisticItemNum">
            {{ blogStatistic.messageNum }}
          </div>
          <div class="BlogStatisticItemText">Repositories</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const blogStatistic = reactive({
  title: "Jayden's Blog",
  avatar: 'http://39.104.22.73:67/img/ZhihuIcon.4afbfd37.jpg',
  articleNum: 100,
  commentNum: 120,
  messageNum: 80,
  github: 'https://github.com/hujie8087',
});
</script>

<style scoped lang="less">
.GitPart {
  position: relative;
  .TopBackBlack {
    background-color: #555;
    height: 110px;
    text-align: center;
    position: relative;
    overflow: hidden;
    img {
      width: 104px;
      height: auto;
      position: relative;
      bottom: -20px;
    }
  }
  .Content {
    text-align: center;
    background-color: #fff;
    padding-bottom: 1rem;
    padding-top: 2.3rem;
    border-bottom: 1px solid #e9e9e9;
    z-index: 1000;
    .GitName {
      font-size: 1.1rem;
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
          color: rgba(0, 0, 0, 0.43);
        }
      }
    }
  }
}
</style>
