<template>
  <div class="CommentItem">
    <div class="CommentItemIcon">
      <Avatar
        style="width: 48px; height: 48px"
        v-bind="{ ...comment.avatar }"
      />
    </div>
    <div class="CommentItemContent">
      <div>
        {{ comment.name }}
        <span
          ><el-icon><Location /></el-icon>{{ comment.cityName }}</span
        >
      </div>
      <div class="ArticleCommentText">{{ comment.content }}</div>
      <div class="DateAnswer">
        <div class="DateAnswerLeft">
          {{ setTimeFormate(comment.createdAt) }}
        </div>
        <div class="DateAnswerRight">
          <el-button link @click="replyHandle">回复</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Bus from '@/plugins/Bus.js';
import dayjs from 'dayjs';
import { Avatar } from 'holiday-avatar';
const emit = defineEmits(['reply-handle']);
const { comment } = defineProps(['comment']);
const replyHandle = () => {
  Bus.emit('comment', comment);
  emit('reply-handle');
};
const setTimeFormate = (time: string) => {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss');
};
</script>

<style scoped lang="less">
.CommentItem {
  border-bottom: 1px solid #e9e9e9;
  display: flex;
  align-items: 'middle';
  padding: 1rem;
  .CommentItemIcon {
    margin-right: 0.5rem;
    img {
      width: 3rem;
      height: 3rem;
      border-radius: 1rem;
    }
  }
  .CommentItemContent {
    font-size: 0.9rem;
    flex: 1;
    vertical-align: middle;
    > div {
      padding-bottom: 0.5rem;
      span {
        font-size: 0.8rem;
        margin-left: 0.5rem;
        .iconfont {
          background-color: #fff;
          font-size: 0.8rem;
        }
      }
    }
    .ArticleCommentText {
      font-size: 0.85rem;
      word-break: break-all;
      line-height: 1.5rem;
    }
    .DateAnswer {
      color: rgba(0, 0, 0, 0.43);
      display: flex;
      align-items: center;
      width: 100%;
      padding-bottom: 0 !important;
      .DateAnswerLeft {
        flex: 1;
      }
      .DateAnswerRight {
        text-align: right;
        cursor: pointer;
        flex: 1;
      }
    }
  }
}
</style>
