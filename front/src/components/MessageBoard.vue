<template>
  <div class="WriteMessageFrameFadeOut">
    <div class="WriteMessageFrameLeft">
      <img src="../assets/images/message-avator.jpg" alt="" srcset="" />
      <div>{{ title }}</div>
    </div>
    <div style="flex: 1 1 0%">
      <el-form :model="form">
        <el-form-item>
          <el-input
            v-model="form.content"
            :rows="4"
            type="textarea"
            placeholder="欢迎留下您的脚印！"
          />
        </el-form-item>
        <el-form-item class="OpenMessageSubmit">
          <el-input
            v-model="form.name"
            class="LeaveMessageName"
            placeholder="输入您的大名"
          />
          <el-button
            type="primary"
            @click="onSubmit"
            class="OpenMessageSubmitButton"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import Bus from '../plugins/Bus.js';
const { title } = defineProps(['title']);
const form = reactive({
  name: '',
  content: '',
  replyId: '',
});
onMounted(() => {
  Bus.on('comment', (e: any) => {
    form.replyId = e._id;
    form.content = '@' + e.MessageLeaveName;
  });
});
const onSubmit = () => {
  console.log('submit!');
};
onBeforeUnmount(() => {
  Bus.off('comment');
});
</script>

<style scoped lang="less">
.WriteMessageFrameFadeOut {
  background-color: #fff;
  width: 42rem;
  margin: auto;
  display: flex;
  align-items: start;
  padding: 1.5rem 1.5rem 1.5rem 1rem;
  overflow: hidden;
  box-sizing: border-box;
  .WriteMessageFrameLeft {
    width: 4rem;
    text-align: center;
    margin-right: 0.5rem;
    font-size: 0.8rem;
    img {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 5px;
    }
  }
  .OpenMessageSubmit {
    display: flex;
    align-items: center;
    margin-bottom: 0;
    /deep/ .el-form-item__content {
      justify-content: space-between;
    }
    .LeaveMessageName {
      width: 12rem;
    }
    .OpenMessageSubmitButton {
      background-color: #01aaed;
      padding: 0.3rem 1rem rem;
      color: #fff;
      font-size: 0.8rem;
      border-radius: 2px;
      display: inline-block;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>
