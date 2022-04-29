<script setup lang="ts">
import { ref } from 'vue'
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'

const emit = defineEmits({
  closeDialog() {
    return true
  }
})

const props = defineProps({
  show: Boolean,
  blackList: Object,
  handleSubmit: {
    type: Function,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    default: () => {}
  },
  handleDelete: {
    type: Function,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    default: () => {}
  }
})

const id = ref(props.blackList.id)
const domain = ref(props.blackList.domain)
const name = ref(props.blackList.name)
const valid = ref(false)

const toast = () => {
  createToast(
    {
      title: 'Success!',
      description: 'Changes were made with success'
    },
    {
      timeout: 2000,
      toastBackgroundColor: 'green',
      position: 'top-center'
    }
  )
}

function onSubmit() {
  const form = {
    id: id.value,
    domain: domain.value,
    name: name.value
  }
  props.handleSubmit(form)
  if (valid.value) toast()
  emit('closeDialog')
}

function deleteBlackList() {
  props.handleDelete(id.value)
}
</script>

<template>
  <div class="p-4 w-[50%] mx-auto">
    <v-form v-model="valid" v-on:submit="onSubmit">
      <div class="flex flex-col -space-y-5">
        <v-text-field
          v-model="domain"
          label="BlackList domain"
          placeholder="Enter the BlackList's domain"
          :rules="[(v) => !!v || 'Item is required']"
          required
        ></v-text-field>
        <v-text-field
          v-model="name"
          label="BlackList name"
          placeholder="Enter the BlackList's name"
          :rules="[(v) => !!v || 'Item is required']"
          required
        ></v-text-field>
        <div class="flex flex-row justify-between">
          <v-btn color="primary" v-bind="props" type="submit">
            Submit Changes
          </v-btn>
          <v-btn
            color="red"
            v-bind="props"
            type="button"
            @click="deleteBlackList"
          >
            Delete BlackList
          </v-btn>
        </div>
      </div>
    </v-form>
  </div>
</template>
