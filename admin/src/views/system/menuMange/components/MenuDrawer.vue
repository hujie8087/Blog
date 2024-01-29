<template>
  <el-dialog v-model="drawerVisible" :destroy-on-close="true" width="680" :title="`${drawerProps.title}菜单`">
    <el-form
      ref="ruleFormRef"
      label-width="120px"
      label-suffix=" :"
      :rules="rules"
      :model="drawerProps.rowData"
      :hide-required-asterisk="drawerProps.isView"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item label="父级" prop="parentId">
            <el-tree-select
              v-model="drawerProps.rowData!.parentId"
              :data="drawerProps.menuOptions"
              :props="{ value: 'id', label: 'title', children: 'children' }"
              value-key="id"
              placeholder="请选择父级"
              :render-after-expand="false"
              :check-strictly="true"
              style="width: 100%"
            /> </el-form-item
        ></el-col>
        <el-col :span="24">
          <el-form-item label="类型" prop="type">
            <el-radio-group v-model="drawerProps.rowData!.type" placeholder="请选择类型">
              <el-radio :label="1">目录</el-radio>
              <el-radio :label="2">菜单</el-radio>
              <el-radio :label="3">按钮</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="drawerProps.rowData!.type !== 3">
          <el-form-item label="图标" prop="icon"> <SelectIcon v-model:iconValue="drawerProps.rowData!.icon" /> </el-form-item
        ></el-col>
        <el-col :span="12">
          <el-form-item label="标题" prop="title">
            <el-input v-model="drawerProps.rowData!.title" placeholder="请输入标题" clearable></el-input> </el-form-item
        ></el-col>
        <el-col :span="12">
          <el-form-item label="名称" prop="name">
            <el-input v-model="drawerProps.rowData!.name" placeholder="请输入名称" clearable></el-input> </el-form-item
        ></el-col>
        <el-col :span="12">
          <el-form-item label="排序" prop="sort">
            <el-input-number
              v-model="drawerProps.rowData!.sort"
              placeholder="请输入排序"
              :min="0"
              clearable
            ></el-input-number> </el-form-item
        ></el-col>
        <el-col :span="12" v-if="drawerProps.rowData!.type !== 3">
          <el-form-item label="路径" prop="path">
            <el-input v-model="drawerProps.rowData!.path" placeholder="请输入路径" clearable></el-input> </el-form-item
        ></el-col>
        <el-col :span="12" v-if="drawerProps.rowData!.type === 2">
          <el-form-item label="组件" prop="component">
            <el-input v-model="drawerProps.rowData!.component" placeholder="请输入组件" clearable></el-input> </el-form-item
        ></el-col>
        <el-col :span="12" v-if="drawerProps.rowData!.type === 2">
          <el-form-item label="外链" prop="isLink">
            <el-input v-model="drawerProps.rowData!.isLink" placeholder="请输入外链" clearable></el-input> </el-form-item
        ></el-col>
        <el-col :span="12" v-if="drawerProps.rowData!.type !== 3">
          <el-form-item label="是否隐藏" prop="isHide">
            <el-radio-group v-model="drawerProps.rowData!.isHide">
              <el-radio :label="false">显示</el-radio>
              <el-radio :label="true">隐藏</el-radio>
            </el-radio-group>
          </el-form-item></el-col
        >
        <el-col :span="12" v-if="drawerProps.rowData!.type !== 3">
          <el-form-item label="是否全屏" prop="isFull">
            <el-radio-group v-model="drawerProps.rowData!.isFull">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item></el-col
        >
        <el-col :span="12" v-if="drawerProps.rowData!.type !== 3">
          <el-form-item label="固定标签" prop="isAffix">
            <el-radio-group v-model="drawerProps.rowData!.isAffix">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item></el-col
        >
        <el-col :span="12" v-if="drawerProps.rowData!.type !== 3">
          <el-form-item label="是否缓存" prop="isKeepAlive">
            <el-radio-group v-model="drawerProps.rowData!.isKeepAlive">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item></el-col
        >
        <el-col :span="12" v-if="drawerProps.rowData!.type === 3">
          <el-form-item label="权限标记" prop="auth">
            <el-input v-model="drawerProps.rowData!.auth" placeholder="请输入权限标记" clearable></el-input> </el-form-item
        ></el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" v-show="!drawerProps.isView" @click="handleSubmit">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="MenuDrawer">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import SelectIcon from "@/components/SelectIcon/index.vue";
import { Menu } from "@/api/interface/system";

const rules = reactive({
  title: [{ required: true, message: "请输入标题" }],
  name: [{ required: true, message: "请输入名称" }],
  sort: [{ required: true, message: "请输入排序" }],
  path: [{ required: true, message: "请输入路径" }]
});

interface DrawerProps {
  title: string;
  isView: boolean;
  rowData?: Partial<Menu.ResMenu>;
  api?: (params: any) => Promise<any>;
  getTableList?: () => Promise<any>;
  menuOptions?: Partial<Menu.ResMenuList[]>;
}

// drawer框状态
const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
  isView: false,
  title: "",
  rowData: {}
});

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps): void => {
  drawerProps.value = params;
  drawerVisible.value = true;
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;
    try {
      await drawerProps.value.api!(drawerProps.value.rowData);
      ElMessage.success({
        message: "提交数据成功"
      });
      drawerProps.value.getTableList!();
      drawerVisible.value = false;
    } catch (error) {
      console.log(error);
    }
  });
};

defineExpose({
  acceptParams
});
</script>
