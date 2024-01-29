<template>
  <div class="BigBlock">
    <div class="TitleFontLine">联系我</div>
    <div class="BlogStatistic">
      <div class="BlogStatisticItem">
        <a
          href="https://github.com/hujie8087"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="iconfont icon-github" style="color: #948aec"></i>
        </a>
      </div>
      <div class="BlogStatisticItem">
        <i class="iconfont icon-weixin" style="color: #f46e65" />
      </div>
      <div class="BlogStatisticItem">
        <a href="mailto:80776811@qq.com">
          <i class="iconfont icon-youxiang" style="color: #49a9ee"
        /></a>
      </div>
      <div class="BlogStatisticItem">
        <a
          href="https://www.zhihu.com/people/mo-lu-feng-jing-99"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="iconfont icon-zhihu" style="color: #3dbd7d" />
        </a>
      </div>
      <div class="BlogStatisticItem">
        <a
          href="https://blog.csdn.net/qq_37575040?type=blog"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="iconfont icon-csdn" style="color: #f78e3d" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.BigBlock {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #fff;
  .TitleFontLine {
    text-align: center;
    font-size: 1.2rem;
    font-weight: 400;
    color: #333;
    margin-top: 1rem;
  }
  .BlogStatistic {
    display: flex;
    align-items: center;
    color: #5e5e5e;
    padding: 1.5rem 0 1rem;
    .BlogStatisticItem {
      flex: 1;
      text-align: center;
      cursor: pointer;
      .iconfont {
        padding: 0 0.5rem;
        font-size: 1.2rem;
      }
    }
  }
}
</style>
