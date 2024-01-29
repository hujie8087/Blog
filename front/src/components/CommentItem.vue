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
          v-if="comment.replyName && comment.replyId !== comment.replyRootId"
        >
          <el-icon><CaretRight /></el-icon>
          {{ comment.replyName }}
        </span>
      </div>
      <div class="ArticleCommentText">{{ comment.content }}</div>
      <div class="DateAnswer">
        <div class="DateAnswerLeft">
          {{ setTimeFormate(comment.createdAt) }}
          <span
            ><el-icon><Location /></el-icon>{{ comment.cityName }}</span
          >
        </div>
        <div class="DateAnswerRight">
          <el-button link @click="replyHandle">回复</el-button>
        </div>
      </div>
      <div v-if="replayBox">
        <MessageBoard
          :comment="comment"
          :placeholder="`回复:${comment.name}`"
          @submitMessage="submitMessage"
        />
      </div>
      <slot name="reply"> </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { Avatar } from 'holiday-avatar';
import MessageBoard from './MessageBoard.vue';
import { MessageType } from '@/types/message';
const { comment } = defineProps(['comment']);
const replayBox = ref(false);
const emit = defineEmits(['submitMessage']);
const replyHandle = () => {
  replayBox.value = !replayBox.value;
};
const setTimeFormate = (time: string) => {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss');
};
const submitMessage = (data: MessageType) => {
  emit('submitMessage', data);
  replayBox.value = false;
};
</script>

<style scoped lang="less">
.CommentItem {
  display: flex;
  align-items: 'middle';
  padding: 1rem;
  .CommentItemIcon {
    margin-right: 0.5rem;
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
