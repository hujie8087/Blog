<template>
  <div class="TimeBoardCover">
    <Clock class="clock" />
    <div class="FriendUrlBac">
      <div class="TimeLIneTitle">
        <div class="FriendUrlTitleText">时间轴</div>
        <div class="FriendUrlTitleSummary">
          努力追上那个曾经被赋予厚望的自己
        </div>
        <div class="FriendUrlTitleSummary">零星的变得优秀，也能拼凑出星河</div>
      </div>
    </div>
  </div>
  <div
    class="TimeLineCardList"
    v-infinite-scroll="load"
    :infinite-scroll-disabled="disabled"
    :style="{ overflow: disabled ? 'hidden' : 'auto' }"
  >
    <time-item
      v-for="(item, index) in timeLineList"
      :key="item._id"
      :time-info="item"
      :index="index"
    >
    </time-item>
  </div>
</template>

<script setup lang="ts">
import { accountTimeLine } from '@/api/timeline';
import Clock from './Clock.vue';
import TimeItem from './TimeItem.vue';
import { PageType } from '@/types/article';
import { TimeLineType } from '@/types/timeLine';

const timeLineList = ref<TimeLineType[]>([]);

const page = reactive<PageType>({
  pageNum: 1,
  pageSize: 10,
});

const total = ref<number>(0);
const disabled = computed(() => timeLineList.value.length >= total.value);
const getTimeLineList = async () => {
  const res = await accountTimeLine(page);
  if (page.pageNum === 1) {
    timeLineList.value = [];
  }
  timeLineList.value.push(...res.data.list);
  total.value = res.data.total;
};
const load = async () => {
  if (timeLineList.value.length >= total.value) return;
  page.pageNum++;
  getTimeLineList();
};
getTimeLineList();
</script>

<style scoped lang="less">
.TimeBoardCover {
  width: 100%;
  height: 95vh;
  position: relative;
  background: url('@/assets/images/time-bg1.jpg') no-repeat;
  background-position: center right;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .clock {
    position: absolute;
    top: 0rem;
    left: -8rem;
  }
  .FriendUrlBac {
    width: 100%;
    text-align: center;
    margin-bottom: 10rem;
    .FriendUrlTitleText {
      font-size: 2.2rem;
      margin-bottom: 2rem;
      color: black;
    }
    .FriendUrlTitleSummary {
      color: #000;
      font-size: 1rem;
      font-family: Helvetica, STHeiti STXihei, Microsoft JhengHei,
        Microsoft YaHei, Tohoma, Arial;
      margin-top: 1rem;
    }
  }
}
.TimeLineCardList {
  position: relative;
  width: 1200px;
  margin: 1rem auto 0;
  min-height: 29rem;
  background-color: #fff;
  padding: 2rem 2rem 2rem;
}
</style>
