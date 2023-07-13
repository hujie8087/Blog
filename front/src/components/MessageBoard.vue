<template>
  <div class="WriteMessageFrameFadeOut">
    <div class="WriteMessageFrameLeft">
      <HldAvatar
        id="HldAvatar"
        style="width: 48px; height: 48px"
        v-bind="config"
        :key="count"
      />
      <el-popover :visible="visible" placement="left" :width="360">
        <el-form
          label-width="100px"
          :model="avatarConfig"
          style="max-width: 460px"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="背景颜色">
                <el-color-picker
                  v-model="avatarConfig.bgColor"
                /> </el-form-item></el-col
            ><el-col :span="12">
              <el-form-item label="帽子颜色">
                <el-color-picker
                  v-model="avatarConfig.hatColor"
                /> </el-form-item></el-col
            ><el-col :span="12">
              <el-form-item label="脸部颜色">
                <el-color-picker
                  v-model="avatarConfig.faceColor"
                /> </el-form-item></el-col
            ><el-col :span="12">
              <el-form-item label="头发颜色">
                <el-color-picker
                  v-model="avatarConfig.hairColor"
                /> </el-form-item></el-col
            ><el-col :span="12">
              <el-form-item label="衣服颜色">
                <el-color-picker
                  v-model="avatarConfig.shirtColor"
                /> </el-form-item></el-col
            ><el-col :span="12">
              <el-form-item label="性别">
                <el-select v-model="avatarConfig.sex">
                  <el-option label="男" value="male" />
                  <el-option label="女" value="female" />
                </el-select> </el-form-item></el-col
            ><el-col :span="12">
              <el-form-item label="耳朵大小">
                <el-select v-model="avatarConfig.earSize">
                  <el-option label="小" value="small" />
                  <el-option label="大" value="big" />
                </el-select> </el-form-item></el-col
            ><el-col :span="12">
              <el-form-item label="眼睛类型">
                <el-select v-model="avatarConfig.eyeType">
                  <el-option label="圆形" value="circle" />
                  <el-option label="椭圆" value="oval" />
                  <el-option label="微笑" value="smile" />
                </el-select> </el-form-item></el-col
            ><el-col :span="12">
              <el-form-item label="帽子类型">
                <el-select v-model="avatarConfig.hatType">
                  <el-option label="无" value="none" />
                  <el-option label="无檐" value="beanie" />
                  <el-option label="头巾" value="turban" />
                </el-select> </el-form-item></el-col
            ><el-col :span="12">
              <el-form-item label="发型">
                <el-select v-model="avatarConfig.hairType">
                  <el-option label="正常" value="normal" />
                  <el-option label="粗" value="thick" />
                  <el-option label="莫霍克" value="mohawk" />
                  <el-option label="女长" value="femaleLong" />
                  <el-option label="女短" value="femaleShort" />
                </el-select> </el-form-item></el-col
            ><el-col :span="12">
              <el-form-item label="鼻子类型">
                <el-select v-model="avatarConfig.noseType">
                  <el-option label="短" value="short" />
                  <el-option label="长" value="long" />
                  <el-option label="圆" value="round" />
                </el-select> </el-form-item></el-col
            ><el-col :span="12">
              <el-form-item label="口型">
                <el-select v-model="avatarConfig.mouthType">
                  <el-option label="笑" value="laugh" />
                  <el-option label="微笑" value="smile" />
                  <el-option label="平静" value="peace" />
                </el-select> </el-form-item></el-col
            ><el-col :span="12">
              <el-form-item label="衣服类型">
                <el-select v-model="avatarConfig.shirtType">
                  <el-option label="连帽衫" value="hoody" />
                  <el-option label="短款" value="short" />
                  <el-option label="Polo衫" value="polo" />
                </el-select> </el-form-item></el-col
            ><el-col :span="12">
              <el-form-item label="眼镜类型">
                <el-select v-model="avatarConfig.glassesType">
                  <el-option label="无" value="none" />
                  <el-option label="圆形" value="round" />
                  <el-option label="方形" value="square" />
                </el-select> </el-form-item></el-col
            ><el-col :span="12">
              <el-form-item label="头像形状">
                <el-select v-model="avatarConfig.shape">
                  <el-option label="圆形" value="circle" />
                  <el-option label="圆角" value="rounded" />
                  <el-option label="方形" value="square" />
                </el-select> </el-form-item
            ></el-col>
          </el-row>
        </el-form>
        <div style="text-align: right; margin: 0">
          <el-button size="small" type="primary" @click="handleConfirm"
            >确认</el-button
          >
        </div>
        <template #reference>
          <el-button class="btn" @click="visible = true">DIY头像</el-button>
        </template>
      </el-popover>
      <div class="title">{{ title }}</div>
    </div>
    <div style="flex: 1 1 0%">
      <el-form ref="messageForm" :model="form" :rules="rules">
        <el-form-item prop="content">
          <el-input
            ref="formContent"
            v-model="form.content"
            :rows="4"
            type="textarea"
            :placeholder="placeholder"
          />
          <V3Emoji
            size="mid"
            :options-name="optionsName"
            :recent="true"
            @click-emoji="appendText"
          />
        </el-form-item>
        <el-form-item class="OpenMessageSubmit" prop="name">
          <el-input
            v-model="form.name"
            class="LeaveMessageName"
            placeholder="输入您的大名"
          />
          <el-button
            type="primary"
            @click="onSubmit(messageForm)"
            class="OpenMessageSubmitButton"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { postMessage } from 'api/message';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import V3Emoji from 'vue3-emoji';
import 'vue3-emoji/dist/style.css';
import { Avatar as HldAvatar, genConfig } from 'holiday-avatar';
import axios from 'axios';
import { ref } from 'vue';

const userInfo = computed(() => localStorage.getItem('jaydenBlog'));
const count = ref(0);
const config = ref(
  userInfo.value ? JSON.parse(userInfo.value).avatar : genConfig()
);
const avatarConfig = ref(config.value);
const { title, comment, placeholder } = defineProps([
  'title',
  'comment',
  'placeholder',
]);
const emit = defineEmits(['submitMessage']);
const visible = ref(false);
const form = reactive({
  name: userInfo.value ? JSON.parse(userInfo.value).name : '',
  content: '',
  cityName: '',
  replyId: comment?._id || '',
  avatar: {},
});
const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入您的姓名或昵称', trigger: 'blur' }],
  content: [{ required: true, message: '请输入您的留言内容', trigger: 'blur' }],
});

const optionsName = {
  'Smileys & Emotion': '笑脸&表情',
  'Food & Drink': '食物&饮料',
  'Animals & Nature': '动物&自然',
  'Travel & Places': '旅行&地点',
  'People & Body': '人物&身体',
  Objects: '物品',
  Symbols: '符号',
  Flags: '旗帜',
  Activities: '活动',
};

watch(
  () => avatarConfig.value,
  (newVal) => {
    config.value = newVal;
    count.value++;
  },
  {
    deep: true,
  }
);

const handleConfirm = () => {
  visible.value = false;
};
const messageForm = ref<FormInstance>();
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      form.avatar = config.value;
      // const { data } = await axios.get(
      //   'https://restapi.amap.com/v3/ip?ip=114.247.50.2&key=63accee3b61b553cc4cd4252f2a3b7e4'
      // );
      // form.cityName = data.city;
      form.cityName = '上海';
      const res = await postMessage(form);
      if (res.code === 200) {
        localStorage.setItem(
          'jaydenBlog',
          JSON.stringify({
            name: form.name,
            avatar: form.avatar,
          })
        );
        ElMessage({
          message: '留言成功',
          offset: 100,
          type: 'success',
        });
        messageForm.value?.resetFields();
        emit('submitMessage');
      }
    }
  });
};
const formContent = ref();
const appendText = (emoji: any) => {
  const start = formContent.value.$el.children[0].selectionStart;
  form.content =
    form.content.slice(0, start) + emoji + form.content.slice(start);
};
</script>

<style scoped lang="less">
.WriteMessageFrameFadeOut {
  background-color: #fff;
  width: 42rem;
  margin: auto;
  display: flex;
  align-items: start;
  padding: 1.5rem 1.5rem 1.5rem 1rem;
  box-sizing: border-box;
  .WriteMessageFrameLeft {
    width: 48px;
    margin-right: 0.5rem;
    font-size: 0.4rem;
    .title {
      text-align: center;
    }
    .btn {
      width: 4rem;
      height: 0.8rem;
      margin: 0.4rem 0;
      font-size: 0.4rem;
    }
  }

  .emoji-item {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 35px;
    height: 35px;
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
