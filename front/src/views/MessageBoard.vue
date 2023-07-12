<template>
  <div class="MessageBoardCover">
    <MessageBoard :title="'欢迎您来'" @submitMessage="submitMessage" />
  </div>
  <div class="BlogIndexContent">
    <div class="BlogFlex">
      <div class="BlogIndexContentLeft">
        <div class="CommentList">
          <CommentItem
            v-for="item in CommentList"
            :comment="item"
            :key="item._id"
            @reply-handle="clickHandle"
          ></CommentItem>
        </div>
      </div>
      <div class="BlogIndexContentRight">
        <div class="Module GitModule">
          <GitPart />
        </div>
        <BigBlock />
      </div>
    </div>
  </div>
  <el-dialog
    v-model="dialogTableVisible"
    destroy-on-close
    class="replyBox"
    width="42rem"
  >
    <MessageBoard :title="'回复留言'" />
  </el-dialog>
</template>

<script setup lang="ts">
import CommentItem from '@/components/CommentItem.vue';
import GitPart from '@/components/GitPart.vue';
import BigBlock from '@/components/BigBlock.vue';
import MessageBoard from '@/components/MessageBoard.vue';
import { MessageType } from '@/types/message';
import { accountMessage } from '@/api/message';

const dialogTableVisible = ref(false);
const CommentList = ref<MessageType[]>([]);
const clickHandle = () => {
  dialogTableVisible.value = true;
};
onMounted(() => {
  getMessageList();
});
const getMessageList = async () => {
  const res = await accountMessage({ pageNum: 1, pageSize: 10 });
  CommentList.value = res.data.list;
};

const submitMessage = () => {
  getMessageList();
};
</script>
<style lang="less">
.replyBox {
  .el-dialog__body {
    padding: 0;
  }
}
</style>
<style scoped lang="less">
.MessageBoardCover {
  width: 100%;
  height: 95vh;
  position: relative;
  background: url(../assets/images/message-bg.jpg) no-repeat 50% #cef;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.BlogIndexContent {
  width: 1088px;
  margin: 0 auto;
  .BlogFlex {
    display: flex;
    align-items: flex-start;
    margin-top: 1rem;
    .BlogIndexContentLeft {
      width: 75%;
      margin-right: 1rem;
      min-height: 52rem;
      position: relative;
      background-color: #fff;
    }
    .BlogIndexContentRight {
      width: 25%;
      position: sticky;
      top: 60px;
      .GitModule {
        padding: 0;
        margin: 0;
      }
    }
  }
}
</style>
