<script setup lang="ts">
import EditWorkerForm from '@/components/EditWorkerForm.vue'
import Dialog from '@/components/Dialog.vue'
import { useWorkersStore } from '@/stores/workers'
import type { Worker } from '@/types'
import { useProvidersStore } from '@/stores/providers'
import { onMounted, ref } from 'vue'

const providersStore = useProvidersStore()
const store = useWorkersStore()

onMounted(async () => {
  await providersStore.getProviders('')
})

const emit = defineEmits(['closeDialog'])
const props = defineProps({
  show: Boolean,
  worker: Object
})

async function updateWorker(data: Worker) {
  await store.updateWorker(data, props.worker.id)
}

function cb() {
  emit('closeDialog')
}

async function deleteWorker(id: string) {
  let result = confirm('Are you sure you want to delete this worker?')
  if (result === true) {
    await store.deleteWorker(id)
    emit('closeDialog')
  }
}
</script>

<template>
  <Dialog title="Edit Worker" :show="show" @closeDialog="cb">
    <EditWorkerForm
      :worker="worker"
      @closeDialog="cb"
      :providers="providersStore.providers"
      :handleSubmit="updateWorker"
      :handleDelete="deleteWorker"
    />
  </Dialog>
</template>
