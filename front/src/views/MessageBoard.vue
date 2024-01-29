<template>
  <div class="MessageBoardCover">
    <MessageBoard
      :title="'欢迎您来'"
      placeholder="欢迎留下您的脚印！"
      @submitMessage="submitMessage"
      style="width: 42rem"
    />
  </div>
  <div class="BlogIndexContent">
    <div class="BlogFlex">
      <div class="BlogIndexContentLeft">
        <div
          class="CommentList"
          v-infinite-scroll="load"
          style="overflow: auto"
          :infinite-scroll-disabled="disabled"
          :style="{ overflow: disabled ? 'hidden' : 'auto' }"
        >
          <CommentItem
            v-for="(item, index) in commentList"
            :comment="item"
            :key="item._id"
            @submitMessage="submitMessage"
          >
            <template #reply>
              <div class="ReplyBox">
                <CommentItem
                  v-for="reply in item.replyList"
                  class="ReplyItem"
                  :comment="reply"
                  :key="item._id"
                />
                <el-button
                  v-if="item.replyNum && item.replyNum > 2 && item.replyNum < 5"
                  type="info"
                  text
                  bg
                  @click="getAllMessage(item, index)"
                  >展开其他 {{ item.replyNum - 2 }} 条回复</el-button
                >
                <el-button
                  v-else-if="item.replyNum && item.replyNum > 4"
                  type="info"
                  text
                  bg
                  @click="showAllMessage(item)"
                  >查看全部 {{ item.replyNum }} 条回复</el-button
                >
              </div>
            </template>
          </CommentItem>
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
  <AllMessage ref="allMessage"></AllMessage>
</template>

<script setup lang="ts">
import CommentItem from '@/components/CommentItem.vue';
import GitPart from '@/components/GitPart.vue';
import BigBlock from '@/components/BigBlock.vue';
import MessageBoard from '@/components/MessageBoard.vue';
import { MessageType } from '@/types/message';
import { accountMessage, getAllComment } from '@/api/message';
import AllMessage from '@/components/AllMessage.vue';

const commentList = ref<MessageType[]>([]);

const page = reactive({
  pageNum: 1,
  pageSize: 10,
});

onMounted(() => {
  getMessageList();
});
const total = ref(0);
const disabled = computed(() => commentList.value.length >= total.value);
const getMessageList = async () => {
  const res = await accountMessage(page);
  total.value = res.data.total;
  if (page.pageNum === 1) {
    commentList.value = [];
  }
  commentList.value.push(...res.data.list);
};

const load = async () => {
  if (commentList.value.length >= total.value) return;
  page.pageNum++;
  getMessageList();
};

const submitMessage = () => {
  page.pageNum = 1;
  getMessageList();
};

const getAllMessage = async (item: MessageType, index: number) => {
  const res = await getAllComment(item._id, { pageNum: 1, pageSize: 2 });
  commentList.value[index].replyList?.push(...res.data.list);
  commentList.value[index].replyNum = 0;
};
const allMessage = ref();
const showAllMessage = async (item: MessageType) => {
  allMessage.value.acceptParams(item);
};
</script>
<style lang="less">
.ReplyBox {
  .ReplyItem {
    padding: 1rem 0;
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
