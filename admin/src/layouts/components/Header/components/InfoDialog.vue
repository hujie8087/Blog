<template>
  <el-dialog v-model="dialogVisible" title="个人信息" width="500px" draggable>
    <el-form ref="infoFormRef" :model="infoForm" :rules="rules" label-width="140px">
      <el-form-item label="账户" prop="username">
        <el-input v-model="infoForm.username" />
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="infoForm.nickname" />
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="infoForm.phone" placeholder="Activity phone" />
      </el-form-item>
      <el-form-item label="微信" prop="WeChat">
        <el-input v-model="infoForm.WeChat" placeholder="Activity phone" />
      </el-form-item>
      <el-form-item label="QQ" prop="qq">
        <el-input v-model="infoForm.qq" placeholder="" />
      </el-form-item>
      <el-form-item label="出生日期" prop="birthday">
        <el-date-picker
          v-model="infoForm.birthday"
          type="date"
          value-format="YYYY-MM-DD"
          format="YYYY-MM-DD"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="infoForm.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
          <el-radio :label="0">保密</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="个性签名" prop="desc">
        <el-input v-model="infoForm.desc" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm(infoFormRef)">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { checkPhoneNumber } from "@/utils/eleValidate";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { ref, reactive } from "vue";

const dialogVisible = ref(false);
const openDialog = () => {
  dialogVisible.value = true;
};
const rules = reactive<FormRules>({
  phone: [{ required: true, validator: checkPhoneNumber, trigger: "blur" }],
  nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }]
});

const infoFormRef = ref<FormInstance>();
const infoForm = reactive({
  username: "",
  phone: "",
  qq: "",
  WeChat: "",
  nickname: "",
  birthday: "",
  sex: 0,
  desc: ""
});
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      ElMessage.success("提交的数据为 : " + JSON.stringify(infoForm));
      dialogVisible.value = false;
    } else {
      console.log("error submit!", fields);
    }
  });
};

defineExpose({ openDialog });
</script>
