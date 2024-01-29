<template>
  <el-dialog
    v-model="dialogVisible"
    title="评论回复"
    width="800"
    style="height: 80vh; margin-top: 10vh"
    class="dialog"
  >
    <div class="rootComment CommentItem">
      <div class="CommentItemIcon">
        <Avatar
          style="width: 48px; height: 48px"
          v-bind="{ ...rootComment?.avatar as any }"
        />
      </div>
      <div class="CommentItemContent">
        <div>
          {{ rootComment?.name }}
          <span
            v-if="
              rootComment?.replyName &&
              rootComment?.replyId !== rootComment?.replyRootId
            "
          >
            <el-icon><CaretRight /></el-icon>
            {{ rootComment?.replyName }}
          </span>
        </div>
        <div class="ArticleCommentText">{{ rootComment?.content }}</div>
        <div class="DateAnswer">
          <div class="DateAnswerLeft">
            {{ setTimeFormate(rootComment?.createdAt as string) }}
            <span
              ><el-icon><Location /></el-icon>{{ rootComment?.cityName }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="infinite-list-wrapper" style="overflow: auto">
      <div class="ChildComment" v-infinite-scroll="load">
        <div class="Total">{{ rootComment?.replyNum }} 条回复</div>
        <div v-if="commentInfo">
          <CommentItem
            v-for="(item, index) in commentInfo"
            :comment="item"
            :key="index"
          >
            <template #reply>
              <div class="ReplyBox">
                <CommentItem
                  v-for="reply in item?.replyList"
                  class="ReplyItem"
                  :comment="reply"
                  :key="item._id"
                />
              </div>
            </template>
          </CommentItem>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { getAllComment } from '@/api/message';
import { Avatar } from 'holiday-avatar';
import CommentItem from '@/components/CommentItem.vue';
import { MessageType, PageType } from '@/types/message';
import dayjs from 'dayjs';

const page = reactive<PageType>({
  pageNum: 1,
  pageSize: 5,
});
const dialogVisible = ref(false);
const rootComment = ref<MessageType>();

const commentInfo = ref<MessageType[]>([]);
const acceptParams = (params: MessageType): void => {
  rootComment.value = params;
  dialogVisible.value = true;
};

const getAllMessage = async (comment: MessageType) => {
  const data = await getAllComment(comment._id, page);
  commentInfo.value?.push(...data.data.list);
  console.log(commentInfo.value, ...data.data.list);
};
const setTimeFormate = (time: string) => {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss');
};
const load = () => {
  if (commentInfo.value?.length === rootComment.value?.replyNum) return;
  getAllMessage(rootComment.value as MessageType);
  page.pageNum++;
};

defineExpose({
  acceptParams,
});
</script>
<style>
.dialog .el-dialog__body {
  height: calc(100% - 54px);
  box-sizing: border-box;
}
</style>
<style lang="less" scoped>
.rootComment {
  display: flex;
  padding-bottom: 20px;
  border-bottom: 20px solid rgba(133, 144, 166, 0.1);
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
.ChildComment {
  .Total {
    padding: 15px 0;
    font-size: 15px;
    color: rgb(68, 68, 68);
    border-bottom: 1px solid rgba(133, 144, 166, 0.1);
  }
}
.infinite-list-wrapper {
  height: calc(100% - 136px);
}
</style>
