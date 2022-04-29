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

const name = ref(null)
const site = ref(null)
const login = ref(null)

const valid = ref(false)

const toast = () => {
  createToast(
    {
      title: 'Success!',
      description: 'Successfully added a new provider'
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
    createProvider: { name: name.value, site: site.value, login: login.value }
  }
  props.handleSubmit(form.createProvider)
  if (valid.value) toast()
}
</script>

<template>
  <div class="p-4 w-[50%] mx-auto">
    <v-form v-model="valid" v-on:submit="onSubmit">
      <div class="flex flex-col -space-y-5">
        <v-text-field
          v-model="name"
          label="Provider Name"
          placeholder="Enter the providers name"
          :rules="[(v) => !!v || 'Item is required']"
          required
        ></v-text-field>
        <v-text-field
          v-model="site"
          label="Provider Website"
          placeholder="Enter the providers website"
          :rules="[(v) => !!v || 'Item is required']"
          required
        ></v-text-field>
        <v-text-field
          v-model="login"
          label="Provider Login"
          placeholder="Enter the login website"
          :rules="[(v) => !!v || 'Item is required']"
          required
        ></v-text-field>

        <v-btn color="primary" v-bind="props" type="submit">
          Add Provider
        </v-btn>
      </div>
    </v-form>
  </div>
</template>
