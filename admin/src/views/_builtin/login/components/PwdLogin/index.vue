<template>
	<n-form
		ref="formRef"
		:model="model"
		:rules="rules"
		size="large"
		:show-label="false"
	>
		<n-form-item path="userName">
			<n-input v-model:value="model.userName" placeholder="请输入用户名" />
		</n-form-item>
		<n-form-item path="password">
			<n-input
				v-model:value="model.password"
				type="password"
				show-password-on="click"
				placeholder="请输入密码"
			/>
		</n-form-item>
		<n-form-item path="code">
			<n-input v-model:value="model.code" placeholder="验证码,点击图片刷新" />
			<div class="pl-8px">
				<n-image :src="codeUrl" @click="refreshCode" :preview-disabled="true" />
			</div>
		</n-form-item>
		<n-space :vertical="true" :size="24">
			<div class="flex-y-center justify-between">
				<n-checkbox v-model:checked="rememberMe">记住我</n-checkbox>
				<n-button :text="true" @click="toLoginModule('reset-pwd')"
					>忘记密码？</n-button
				>
			</div>
			<n-button
				type="primary"
				size="large"
				:block="true"
				:round="true"
				:loading="auth.loginLoading"
				@click="handleSubmit"
			>
				确定
			</n-button>
		</n-space>
	</n-form>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import type { FormInst, FormRules } from "naive-ui";
// import { fetchImageCode } from "@/service";
import { useAuthStore } from "@/store";
import { useRouterPush } from "@/composables";
import { formRules } from "@/utils";

const auth = useAuthStore();
const { login } = useAuthStore();
const { toLoginModule } = useRouterPush();

const formRef = ref<HTMLElement & FormInst>();
const codeUrl = ref<string>("/url-pattern/users/code");

const model = reactive({
	// userName: "Soybean",
	// password: "soybean123",
	userName: "admin",
	password: "admin123",
	code: "",
});

const rules: FormRules = {
	password: formRules.pwd,
};

onMounted(() => {
	// getImageCode();
});

// async function getImageCode() {
// 	codeUrl.value = await fetchImageCode();
// 	console.log(codeUrl.value);
// }

const refreshCode = () => {
	codeUrl.value = codeUrl.value + "?" + Math.random();
};

const rememberMe = ref(false);

async function handleSubmit() {
	await formRef.value?.validate();

	const { userName, password, code } = model;

	login(userName, password, code);
}
</script>

<style scoped></style>
