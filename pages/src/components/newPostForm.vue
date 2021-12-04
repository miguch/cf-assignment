<template>
  <n-modal
    title="New Post"
    preset="card"
    :segmented="{ content: 'hard' }"
    :show="showForm"
    :style="{ width: '600px' }"
    @update:show="$emit('update:showForm', $event)"
  >
    <n-form :model="formValue" ref="formRef">
      <n-form-item
        :rule="{ required: true, trigger: 'input' }"
        path="username"
        label="Username"
      >
        <n-input
          placeholder="Please enter the username"
          v-model:value="formValue.username"
          clearable
        />
      </n-form-item>
      <n-form-item
        :rule="{ required: true, trigger: 'input' }"
        path="title"
        label="Title"
      >
        <n-input
          placeholder="Please enter the title"
          v-model:value="formValue.title"
          clearable
        />
      </n-form-item>
      <n-form-item path="content" label="Content">
        <n-input
          type="textarea"
          placeholder="Please enter the post content"
          :autosize="{
            minRows: 3,
          }"
          v-model:value="formValue.content"
          clearable
        />
      </n-form-item>
      <n-form-item path="image" label="Image">
        <n-upload
          accept=".png,.gif,.jpg,.jpeg"
          action="/upload"
          :default-upload="false"
          :max="1"
          @update:file-list="onChooseFile"
          v-if="!formValue.image"
        >
          <n-button>Choose image</n-button>
        </n-upload>
        <template v-else>
          <img
            style="width: 200px; height: 200px; object-fit: contain"
            :src="formValue.image"
          />
          <n-button @click="formValue.image = ''" style="margin-left: 12px"
            >Clear</n-button
          >
        </template>
      </n-form-item>
      <n-form-item>
        <n-button
          :loading="submitting"
          @click="onSubmit"
          type="primary"
          attr-type="submit"
          >Post</n-button
        >
      </n-form-item>
    </n-form>
  </n-modal>
</template>

<script setup>
import { NModal, NForm, NInput, NFormItem, NButton, NUpload, c } from "naive-ui"
import { ref } from "vue"
import { useMessage } from "naive-ui"
import useNetwork from "../utils/network"
const { showForm } = defineProps({
  showForm: Boolean,
})
const getDefaultForm = () => ({
  username: "",
  title: "",
  content: "",
  image: "",
})
const formRef = ref(null)
const formValue = ref(getDefaultForm())
const emit = defineEmits(["update:showForm", "success"])
const message = useMessage()
const service = useNetwork()
const submitting = ref(false)
const onChooseFile = (fileList) => {
  const file = fileList[0].file
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    formValue.value.image = reader.result
  }
  reader.onerror = (error) => console.log(error)
}
const onSubmit = () => {
  formRef.value.validate(async (errors) => {
    if (!errors) {
      submitting.value = true
      try {
        const res = await service({
          method: "post",
          url: "/posts",
          data: {
            ...formValue.value,
          },
        })
        if (res.success) {
          emit("update:showForm", false)
          formValue.value = getDefaultForm()
          emit("success")
        } else {
          message.error(res.msg)
        }
      } catch (err) {
        console.log(err)
        if (err?.response?.data?.msg) {
          message.error(err.response.data.msg)
        } else {
          message.error("Request failed")
        }
      } finally {
        submitting.value = false
      }
    } else {
      console.log(errors)
      message.error("Please enter the missing information")
    }
  })
}
</script>
