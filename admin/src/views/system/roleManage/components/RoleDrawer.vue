<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}角色`">
    <el-form
      ref="ruleFormRef"
      label-width="100px"
      label-suffix=" :"
      :rules="rules"
      :disabled="drawerProps.isView"
      :model="drawerProps.row"
      :hide-required-asterisk="drawerProps.isView"
    >
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="drawerProps.row!.name" placeholder="请填写角色名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="权重" prop="level">
        <el-input-number
          v-model="drawerProps.row!.level"
          size="medium"
          :min="0"
          clearable
          placeholder="请填写角色权重"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="菜单权限" prop="menuIds">
        <el-checkbox label="展开/折叠" @change="expandAll"></el-checkbox>
        <el-checkbox label="全选/全不选" v-model="checkAll" @change="treeAll"></el-checkbox>
        <el-checkbox label="父子联动" v-model="checkStrictly"></el-checkbox>
        <el-tree
          ref="treeRef"
          :data="drawerProps.menuList"
          show-checkbox
          node-key="id"
          :default-checked-keys="drawerProps.row!.menuIds"
          :props="{ label: 'title', children: 'children' }"
          :check-strictly="!checkStrictly"
          style="width: 100%; box-shadow: 0 0 0 1px #dcdfe6; padding: 10px 0; border-radius: 4px"
        />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number v-model="drawerProps.row!.sort" size="medium" :min="0" label="排序" clearable></el-input-number>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch
          v-model="drawerProps.row!.status"
          :active-text='drawerProps.row!.status ? "启用" : "禁用"'
          :active-value="1"
          :inactive-value="0"
        />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="drawerProps.row!.remark" placeholder="请填写备注" clearable></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" v-show="!drawerProps.isView" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="RoleDrawer">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { Menu, Role } from "@/api/interface/system";

const rules = reactive({
  name: [{ required: true, message: "请填写角色名称" }],
  level: [{ required: true, message: "请选择性别" }],
  email: [{ required: true, message: "请填写邮箱" }]
});

interface DrawerProps {
  title: string;
  isView: boolean;
  row: Partial<Role.ResRoleList>;
  api?: (params: any) => Promise<any>;
  getTableList?: () => void;
  menuList?: Menu.ResMenuList[];
}

const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
  isView: false,
  title: "",
  row: {},
  menuList: []
});

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps) => {
  drawerProps.value = params;
  drawerVisible.value = true;
};
const treeRef = ref();

const checkStrictly = ref(false);
const checkAll = ref(false);
const expandAll = (val: boolean) => {
  let nodes = treeRef.value?.store._getAllNodes() || [];
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].expanded = val;
  }
};
const treeAll = (val: boolean) => {
  if (val) {
    treeRef.value!.setCheckedNodes(drawerProps.value.menuList, false);
  } else {
    treeRef.value!.setCheckedNodes([], false);
  }
};
// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;
    try {
      drawerProps.value.row.menuIds = treeRef.value!.getCheckedKeys(false) as number[];
      await drawerProps.value.api!(drawerProps.value.row);
      ElMessage.success({ message: `${drawerProps.value.title}角色成功！` });
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
