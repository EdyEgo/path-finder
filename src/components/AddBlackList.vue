<script setup lang="ts">
import AddBlackListForm from '@/components/AddBlackListForm.vue'
import Dialog from '@/components/Dialog.vue'
import { useAuth } from '@/stores/auth'
import { useBlackListsStore } from '@/stores/blackLists'
import type { BlackList } from '@/types/blackLists'

const store = useBlackListsStore()

const auth = useAuth()

const emit = defineEmits(['closeDialog'])
defineProps({
  show: Boolean
})

function addBlackList(data: BlackList) {
  store.addBlackList(data)
  emit('closeDialog')
}
</script>

<template>
  <Dialog
    title="Add BlackList"
    :show="show"
    @close-dialog="$emit('closeDialog')"
  >
    <AddBlackListForm :handleSubmit="addBlackList" />
  </Dialog>
</template>
