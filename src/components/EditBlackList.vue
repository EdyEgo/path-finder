<script setup lang="ts">
import EditBlackListForm from '@/components/EditBlackListForm.vue'
import Dialog from '@/components/Dialog.vue'
import { useBlackListsStore } from '@/stores/blackLists'
import type { BlackList } from '@/types/blackLists'

const store = useBlackListsStore()
const emit = defineEmits({
  closeDialog() {
    return true
  }
})
const props = defineProps({
  show: Boolean,
  blackList: Object
})

function updateBlackList(data: BlackList) {
  store.updateBlackList(data, props.blackList.id)
  store.getBlackLists('')
}
function cb() {
  emit('closeDialog')
}

function deleteBlackList(id: string) {
  let result = confirm('Are you sure you want to delete this BlackList?')
  if (result === true) {
    store.deleteBlackList(id)
    emit('closeDialog')
  }
}
</script>

<template>
  <Dialog title="Edit BlackList" :show="show" @closeDialog="cb">
    <EditBlackListForm
      :blackList="blackList"
      @closeDialog="cb"
      :handleSubmit="updateBlackList"
      :handleDelete="deleteBlackList"
    />
  </Dialog>
</template>
