<script setup lang="ts">
import { ref } from 'vue'
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'

const props = defineProps({
  handleSubmit: {
    type: Function,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    default: () => {}
  }
})

const domain = ref(null)
const name = ref(null)
const valid = ref(false)

const toast = () => {
  createToast(
    {
      title: 'Success!',
      description: 'Successfully added a new BlackList'
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
    domain: domain.value,
    name: name.value
  }
  props.handleSubmit(form)
  if (valid.value) toast()
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
        <v-btn color="primary" v-bind="props" type="submit">
          Add BlackList
        </v-btn>
      </div>
    </v-form>
  </div>
</template>
