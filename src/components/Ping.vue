<script setup lang="ts">
import { ref, watch, onMounted, reactive } from 'vue'
import router from '@/router'
import { io } from 'socket.io-client'
import { useAuth } from '@/stores/auth'
import { Terminal } from 'xterm'
import type { Ref } from 'vue'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'
import 'ol/ol.css'
import { createToast } from 'mosha-vue-toastify'
import MapLeaflet from '@/components/MapLeaflet.vue'
import DisplayLocationsVue from './DisplayLocations.vue'
import TableItem from '@/components/PingTable.vue'

const tableHead = [
  'Location',
  'Provider',
  'ASN',
  'Resovled IP',
  'Loss',
  'Sent',
  'Last',
  'Avg',
  'Best',
  'Worst',
  'STDdev',
  'Actions'
]
const socket = ref(null)
const authStore = useAuth()
const pingData = ref({})
const show = ref('map')
const resetChart = ref(false)
const arrayLocation = ref({})
const startPing = ref(false)

function buildPointLabelText({ data, worker }) {
  return `${worker.ipInsight.country.names.en}, ${
    worker.ipInsight.city.names.en
  } \r\n${Number(data.time).toFixed(2)} ms`
}

function responseDisplaylocation(data) {
  arrayLocation.value = data
}

function onSubmit() {
  pingData.value = {}
  let form = { hostname: arrayLocation.value.domain, location: {} }
  if (arrayLocation.value.domain === undefined) {
    createToast(
      {
        title: 'Please add a domain!',
        description: ''
      },
      {
        timeout: 2000,
        type: 'danger',
        position: 'top-center'
      }
    )
    return
  }

  if (arrayLocation.value.world === true) {
    form.location = {
      world: true
    }
  }
  if (arrayLocation.value.selectedContinent.length > 0) {
    form.location.continent = arrayLocation.value.selectedContinent
  }
  if (arrayLocation.value.selectedCountry.length > 0) {
    form.location.country = arrayLocation.value.selectedCountry
  }
  if (arrayLocation.value.selectedCity.length > 0) {
    form.location.city = arrayLocation.value.selectedCity
  }
  if (arrayLocation.value.selectedDataCenter.length > 0) {
    form.location.dataCenter = arrayLocation.value.selectedDataCenter
  }

  socket.value = io(import.meta.env.VITE_APP_WS_ENDPOINT, {
    transports: ['websocket'],
    reconnectionAttempts: 3,
    auth: {
      token: authStore.token
    }
  })
  socket.value.emit('runPing', {
    count: 9,
    packetSize: 64,
    ...form
  })
  socket.value.on('runPingResponse', (response) => {
    const workerid = response.worker.id
    if (!(workerid in pingData.value)) {
      pingData.value[workerid] = {
        worker: response.worker,
        stats: { loss: 0 + '%', avg: 0, min: 0, max: 0 },
        data: [],
        terminal: new Terminal()
      }
    }
    pingData.value[workerid].data.push(response.data)

    pingData.value[workerid].stats = {
      ...pingData.value[workerid].stats,
      ...response.data
    }
    pingData.value[workerid].terminal.write(response.data.raw + '\r\n')
    startPing.value = true
    // term.value.write(response.data.raw + '\r\n')
    if (response.data.raw.includes('round-trip')) {
      socket.value = null
      startPing.value = false
    }
  })
  socket.value.on('runPingError', (response) => {
    createToast(
      {
        title: 'Error!',
        description: response.data.responseError
      },
      {
        timeout: 2000,
        type: 'danger',
        position: 'top-center'
      }
    )
  })
}

function stopPing() {
  socket.value.disconnect(true)
  socket.value = null
}
</script>

<template>
  <div class="">
    <DisplayLocationsVue
      @run-world="onSubmit"
      @selected-location="responseDisplaylocation"
    />
  </div>
  <div class="text-right pb-3 border-b-sm border-gray-400">
    <div class="flex mt-4">
      <p class="flex-1 label text-left mx-1">
        All tests run in real-time from 200 available locations around the
        world. You can use this tool to compare CDN providers and their
        performance in different regions. As well as debug your own routing
        logic and geo load-balancing. Results are stored for 30 days.
      </p>
      <div class="flex">
        <button class="button primary outlined flex items-center px-1 mr-2">
          <img class="mr-1" src="../assets/adobeIcon.png" />
          Export PDF
        </button>
        <button class="button simple outlined flex items-center mr-2">
          <img class="mr-2" src="@/assets/resetFilterIcon.png" />
          Reset Filter
        </button>
        <button
          @click="stopPing"
          v-if="socket !== null"
          class="button warning full flex items-center"
        >
          Stop
        </button>
        <button
          v-if="socket === null"
          class="button success full flex items-center"
          @click="onSubmit"
        >
          <img class="mr-2" src="@/assets/testNowIcon.png" />
          Run ping
        </button>
      </div>
    </div>
  </div>
  <div class="flex justify-end mt-4">
    <!--    <div>-->
    <!--      <button :class="show=='map' ? 'button primary full py-2' : 'button primary outlined py-[7px]'"-->
    <!--              @click="show = 'map'" class="px-10 py-2">MAP-->
    <!--      </button>-->
    <!--      <button :class="show=='map' ? 'button primary outlined  py-[7px]' : 'button primary full py-[7px]'"-->
    <!--              @click="show = 'raw'" class="button primary outlined px-10  -translate-x-3">RAW-->
    <!--      </button>-->
    <!--    </div>-->
  </div>
  <div v-show="show === 'map'" class="mt-4 mb-10 text-xl">
    <MapLeaflet :pingData="pingData" />
  </div>
  <div class="w-full my-30">
    <TableItem
      :start-ping="startPing"
      :reset-chart="resetChart"
      :header="tableHead"
      :rows="pingData"
    />
  </div>
</template>
