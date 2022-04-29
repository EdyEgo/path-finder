<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue'
import AddBlackList from '@/components/AddBlackList.vue'
import EditBlackList from '@/components/EditBlackList.vue'
import Table from '@/components/Table.vue'
import { useBlackListsStore } from '@/stores/blackLists'

const store = useBlackListsStore()
const show = ref(false)
const searchInput = ref<string>('')
let timeout: any = null
const showEdit = ref(false)
const blackListEdit = ref(null)

function getID(row: any) {
  showEdit.value = true
  blackListEdit.value = row
}

const searchForBlackList = () => {
  if (timeout) {
    clearTimeout(timeout)
  }
  timeout = setTimeout(async function () {
    await store.getBlackLists(searchInput.value)
  }, 300)
}

onMounted(async () => {
  await store.getBlackLists('')
})
const tableData = [
  { title: 'Domain', accessor: 'domain' },
  { title: 'Name', accessor: 'name' }
]
</script>

<template>
  <AppLayout>
    <AddBlackList :show="show" @close-dialog="show = false" />
    <EditBlackList
      :blackList="blackListEdit"
      :show="showEdit"
      @closeDialog="
        () => {
          showEdit = false
        }
      "
    />
    <div class="flex flex-row justify-between">
      <h1 class="logo text-4xl">BlackLists</h1>
      <v-btn @click=";[(show = true)]" color="primary">Add BlackList</v-btn>
    </div>
    <div class="pt-4 flex flex-row">
      <v-text-field
        label="Search for BlackLists"
        variant="underlined"
        hide-details
        v-model="searchInput"
        @keydown="searchForBlackList()"
      ></v-text-field>
    </div>
    <Table
      :handle-item-click="getID"
      :head="tableData"
      :rows="store.blackLists"
      class="cursor-pointer"
    />
    <!-- <v-alert v-else type="error">{{ store.errorMsg }}</v-alert> -->
  </AppLayout>
</template>
