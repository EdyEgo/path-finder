<script setup lang="ts">
import UserDetailsForm from './UserDetailsForm.vue'
import Dialog from './Dialog.vue'
import { useUsersStore } from '@/stores/users'

const userStore = useUsersStore()

const props = defineProps({
  show: Boolean,
  user: Object
})

const emit = defineEmits({
  closeDialog() {
    return true
  }
})

async function editUser(data: any, id: string) {
  userStore.updateUser(data, id)
}

function closeModal() {
  emit('closeDialog')
}
</script>

<template>
  <Dialog title="User Details" :show="show" @closeDialog="closeModal">
    <UserDetailsForm
      :user="props.user"
      :changeUser="editUser"
      @closeDialog="closeModal"
    />
  </Dialog>
</template>
