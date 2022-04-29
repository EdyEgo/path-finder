<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue'
import Table from '@/components/Table.vue'
import Card from '@/components/Card.vue'
import { useUsersStore } from '@/stores/users'
import UserDetails from '@/components/UserDetails.vue'
import router from '@/router'

const store = useUsersStore()
const searchInput = ref<string>('')
let timeout: any = null
const show = ref<boolean>(false)
const userProfile: any = ref('')
const showEdit = ref(false)
const searchType = ref('')

const emit = defineEmits(['closeDialog'])

const searchForUser = async () => {
  if (timeout) {
    clearTimeout(timeout)
  }
  timeout = setTimeout(async function () {
    await store.getUsers(searchInput.value)
  }, 300)
}

function getID(row: any) {
  showEdit.value = true
  userProfile.value = row
}

onMounted(async () => {
  store.getUsers('')
})

const tableData = [
  { title: 'ID', accessor: 'id' },
  { title: 'First Name', accessor: 'firstName' },
  { title: 'Last Name', accessor: 'lastName' },
  { title: 'Email', accessor: 'email' },

  { title: 'Action', accessor: 'action' },
  { title: 'Role', accessor: 'role' },
  { title: 'Timezone', accessor: 'timezone' }
]
</script>

<template>
  <AppLayout>
    <UserDetails
      :user="userProfile"
      :show="showEdit"
      @closeDialog="
        () => {
          showEdit = false
        }
      "
    />
    <div class="grid grid-cols-3 gap-4">
      <Card
        title="Registered Users"
        :subtitle="`Number of confirmed users: ${store.stats.registered}`"
      />
      <Card
        title="Pending Users"
        :subtitle="`Number of unconfirmed users: ${store.stats.pending}`"
      />
      <Card
        title="Paying Users"
        :subtitle="`Number of paying users: ${store.stats.paying}`"
      />
    </div>
    <div>
      <h1 class="logo text-3xl">Users list</h1>
    </div>
    <div class="pt-4 flex flex-row">
      <v-text-field
        label="Search for providers"
        variant="underlined"
        hide-details
        v-model="searchInput"
        @keydown="searchForUser()"
      ></v-text-field>
      <button class="p-2 hover:bg-gray-200">Aa</button>
      <button class="p-2 underline hover:bg-gray-200">ab</button>
      <button class="p-2 hover:bg-gray-200">.*</button>
    </div>
    <div>
      <Table
        :handle-item-click="getID"
        :head="tableData"
        :rows="store.users"
        :repetField="'action'"
        :repetWithContent="'ion:paper-plane-sharp'"
        class="cursor-pointer"
      />
    </div>
  </AppLayout>
</template>
