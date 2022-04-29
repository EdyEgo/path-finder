<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue'
import AddProvider from '@/components/AddProvider.vue'
import EditProvider from '@/components/EditProvider.vue'
import Table from '@/components/Table.vue'
import { useProvidersStore } from '@/stores/providers'

const store = useProvidersStore()
const show = ref(false)
const searchInput = ref<string>('')
let timeout: any = null
const showEdit = ref(false)
const providerEdit = ref(null)

function getID(row: any) {
  providerEdit.value = row
  showEdit.value = true
}

const searchForProvider = () => {
  if (timeout) {
    clearTimeout(timeout)
  }
  timeout = setTimeout(async function () {
    await store.getProviders(searchInput.value)
  }, 300)
}

onMounted(async () => {
  await store.getProviders('')
  store.resetErrorMsg()
})

const tableData = [
  { title: 'Name', accessor: 'name' },
  { title: 'Site', accessor: 'site' },
  { title: 'Login', accessor: 'login' },
  { title: 'Workers', accessor: 'workerCount' },
  { title: 'Uptime', accessor: 'upTime' },
  { title: 'Paid', accessor: 'paid' },
  { title: 'Recurring', accessor: 'recurring' },
  { title: 'Action', accessor: 'action' },
  { title: 'Status', accessor: 'status' }
]

function updateProviderEdit(updateObject) {
  providerEdit.value = updateObject
}
</script>

<template>
  <AppLayout>
    <AddProvider :show="show" @close-dialog="show = false" />
    <EditProvider
      :provider="providerEdit"
      :show="showEdit"
      @closeDialog="showEdit = false"
    />
    <div class="flex flex-row justify-between">
      <h1 class="logo text-4xl">Providers</h1>
      <v-btn @click=";[(show = true)]" color="primary">Add Provider</v-btn>
    </div>
    <div class="pt-4 flex flex-row">
      <v-text-field
        label="Search for providers"
        variant="underlined"
        hide-details
        v-model="searchInput"
        @keydown="searchForProvider()"
      ></v-text-field>
      <button class="p-2 hover:bg-gray-200">Aa</button>
      <button class="p-2 underline hover:bg-gray-200">ab</button>
      <button class="p-2 hover:bg-gray-200">.*</button>
    </div>
    <Table
      :handle-item-click="getID"
      :head="tableData"
      :rows="store.providers"
      :repetField="'action'"
      :repetWithContent="'ion:paper-plane-sharp'"
      class="cursor-pointer"
    />
    <!-- <v-alert v-else type="error">{{ store.errorMsg }}</v-alert> -->
  </AppLayout>
</template>
