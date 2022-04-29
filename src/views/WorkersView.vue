<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue'
import AddWorker from '@/components/AddWorker.vue'
import EditWorker from '@/components/EditWorker.vue'
import Table from '@/components/Table.vue'
import { useWorkersStore } from '@/stores/workers'
import { useProvidersStore } from '@/stores/providers'
import moment from 'moment'

const store = useWorkersStore()
const providersStore = useProvidersStore()
const show = ref(false)
const searchInput = ref<string>('')
let timeout: any = null
const showEdit = ref(false)
const workerEdit = ref(null)

function getID(row: any) {
  showEdit.value = true
  workerEdit.value = row
}

const searchForWorker = () => {
  if (timeout) {
    clearTimeout(timeout)
  }
  timeout = setTimeout(async function () {
    await store.getWorkers(searchInput.value)
  }, 300)
}

onMounted(async () => {
  store.resetErrorMesssage()
  await store.getWorkers('')
  await providersStore.getProviders('')
})

const tableData = [
  { title: 'Provider', accessor: 'provider.name' },
  { title: 'Type', accessor: 'ipInsight.traits.userType' },
  { title: 'Port', accessor: 'port' },
  { title: 'Auth', accessor: 'port' },
  { title: 'ISP', accessor: 'bigCloud.network.carriers[0].organisation' },
  { title: 'ORG', accessor: 'bigCloud.network.carriers[0].organisation' },
  { title: 'Continent', accessor: 'bigCloud.location.continent' },
  { title: 'Country', accessor: 'bigCloud.country.name' },
  { title: 'State', accessor: 'bigCloud.location.isoPrincipalSubdivision' },
  { title: 'City', accessor: 'bigCloud.location.city' },
  {
    title: 'Price',
    accessor: 'price'
  },
  {
    title: 'Currency',
    accessor: 'currency'
  },
  {
    title: 'Payment Recurrence',
    accessor: 'paymentRecurrency'
  },
  { title: 'Time Zone', accessor: 'bigCloud.location.timeZone.displayName' },
  { title: 'Data Center', accessor: 'bigCloud.network.carriers[0].name' },
  { title: 'IP', accessor: 'ipAddress' },
  { title: 'ASN', accessor: 'bigCloud.network.carriers[0].asn' },
  { title: 'BGP Prefix', accessor: 'bigCloud.network.bgpPrefix' },
  { title: 'Registry', accessor: 'bigCloud.network.registry' },
  { title: 'Action', accessor: 'action' },
  { title: 'Last Seen', accessor: 'lastSeenAt' },
  { title: 'Status', accessor: 'status' }
]

function showHumanizeDate(date: Date) {
  const now = moment(new Date())
  const pastDate = new Date(date)
  const past = moment(pastDate)

  const duration = moment.duration(now.diff(past))
  let durationInMinutes = Math.round(duration.asMinutes())
  //1440 minutes equals 24 hours

  if (durationInMinutes < 59) {
    return moment.duration(durationInMinutes, 'minutes').humanize()
  }
  if (durationInMinutes > 59 && durationInMinutes < 1440) {
    const durationInHours = Math.round(duration.asHours())
    return moment.duration(durationInHours, 'hours').humanize()
  }

  return pastDate.toLocaleString()
}
</script>

<template>
  <AppLayout>
    <AddWorker :show="show" @close-dialog="show = false" />
    <EditWorker
      :worker="workerEdit"
      :show="showEdit"
      @closeDialog="
        () => {
          showEdit = false
        }
      "
    />
    <div class="flex flex-row justify-between">
      <h1 class="logo text-4xl">Workers</h1>
      <v-btn @click=";[(show = true)]" color="primary">Add Worker</v-btn>
    </div>
    <div class="pt-4 flex flex-row">
      <v-text-field
        label="Search for workers"
        variant="underlined"
        hide-details
        v-model="searchInput"
        @keydown="searchForWorker()"
      ></v-text-field>
    </div>
    <Table
      :handle-item-click="getID"
      :head="tableData"
      :rows="store.workers"
      class="cursor-pointer"
      :useFunctionOnFieldName="'lastSeenAt'"
      :useFunctionOnField="showHumanizeDate"
      :repetField="'action'"
      :repetWithContent="'ion:paper-plane-sharp'"
    />

    <!-- <v-alert v-else type="error">{{ store.errorMsg }}</v-alert> -->
  </AppLayout>
</template>
