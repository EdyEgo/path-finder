<script setup lang="ts">
import AddProviderForm from '@/components/AddProviderForm.vue'
import Dialog from '@/components/Dialog.vue'
import { useAuth } from '@/stores/auth'
import { useProvidersStore } from '@/stores/providers'
import type { Provider } from '@/types'

const store = useProvidersStore()
const auth = useAuth()

const emit = defineEmits(['closeDialog'])
defineProps({
  show: Boolean
})

async function addProvider(data: Provider) {
  store.user = auth.user
  await store.addProvider(data)

  emit('closeDialog', true)
}
</script>

<template>
  <Dialog
    title="Add Provider"
    :show="show"
    @close-dialog="$emit('closeDialog')"
  >
    <AddProviderForm :handleSubmit="addProvider" />
  </Dialog>
</template>
