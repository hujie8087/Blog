<template>
  <div class="TimeLineTr">
    <div class="TimeLineTdLeft">
      <div class="Bubble bubble-margin" v-if="!(index % 2)">
        <span class="TimeLineTime">{{ setTimeFormat(timeInfo.time) }}</span>
        {{ timeInfo.title }}
      </div>
    </div>
    <div class="TimeLineTdCenter"></div>
    <div class="TimeLineTdRight">
      <div class="BubbleRight bubble-right-margin" v-if="index % 2">
        <span class="TimeLineTime">{{ setTimeFormat(timeInfo.time) }}</span>
        {{ timeInfo.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';

const { timeInfo, index } = defineProps(['timeInfo', 'index']);
const setTimeFormat = (time: string) => {
  return dayjs(time).format('YYYY-MM-DD');
};
</script>

<style scoped lang="less">
.TimeLineTr {
  display: flex;
  align-items: center;
  position: relative;
  .TimeLineTdLeft {
    flex: 1;
    padding-right: 2rem;
    position: relative;
    .Bubble {
      margin: 1rem 0;
      position: relative;
      background-color: #fff;
      border-radius: 5px;
      padding: 1rem;
      border: 1px solid #01aaed;
      &::before {
        content: '';
        border: 8px solid transparent;
        width: 0;
        height: 0;
        display: inline-block;
        border-left: 8px solid #01aaed;
        right: -16px;
        position: absolute;
        top: 1.3rem;
      }
      &::after {
        content: '';
        width: 1rem;
        height: 1rem;
        display: inline-block;
        background-color: #01aaed;
        border-radius: 100%;
        border: 0.25rem solid #fff;
        position: absolute;
        right: -2.9rem;
        top: 1rem;
        z-index: 1000;
      }
    }
    .bubble-margin {
      margin-left: 8rem;
    }
  }
  .TimeLineTdCenter {
    width: 2px;
    background-color: #01aaed;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
  }
  .TimeLineTdRight {
    padding-left: 2rem;
    flex: 1;
    .BubbleRight {
      margin: 1rem 0;
      position: relative;
      background-color: #fff;
      border-radius: 5px;
      padding: 1rem;
      border: 1px solid #01aaed;
      &::before {
        content: '';
        border: 8px solid transparent;
        width: 0;
        height: 0;
        display: inline-block;
        border-right: 8px solid #01aaed;
        left: -16px;
        position: absolute;
        top: 1.3rem;
      }
      &::after {
        content: '';
        width: 1rem;
        height: 1rem;
        display: inline-block;
        background-color: #fff;
        border-radius: 100%;
        border: 0.2rem solid #01aaed;
        position: absolute;
        left: -2.7rem;
        top: 1rem;
        z-index: 1000;
      }
    }
    .bubble-right-margin {
      margin-right: 8rem !important;
    }
  }
  .TimeLineTime {
    color: #01aaed;
    margin-right: 1rem;
  }
}
</style>
