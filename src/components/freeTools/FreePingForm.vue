<script setup lang="ts">
import { ref, watch, onMounted, reactive } from 'vue'
import Table from '@/components/Table.vue'
import { io } from 'socket.io-client'
import { useAuth } from '@/stores/auth'
import { Terminal } from 'xterm'
import type { Ref } from 'vue'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'
import 'ol/ol.css'
import DisplayLocationsVue from '../DisplayLocations.vue'
import { createToast } from 'mosha-vue-toastify'
import MapLeaflet from '@/components/MapLeaflet.vue'

const term: Ref<Terminal | null> = ref(null)

const socket = ref(null)
const authStore = useAuth()
const pingData = reactive({})

const show = ref('map')

const arrayLocation = ref()
function responseDisplaylocation(data) {
  arrayLocation.value = data
}

function buildPointLabelText({ data, worker }) {
  return `${worker.ipInsight.country.names.en}, ${
    worker.ipInsight.city.names.en
  } \r\n${Number(data.time).toFixed(2)} ms`
}

function onSubmit() {
  if (term.value == null) {
    term.value = new Terminal()
    const fitAddon = new FitAddon()
    const terminalContainer = document.getElementById('terminal-container')
    const token: any = authStore.token

    term.value.loadAddon(fitAddon)
    term.value.open(terminalContainer)
    term.value.focus()
    fitAddon.fit()
  }
  let form = { hostname: arrayLocation.value.domain, location: {} }
  if (arrayLocation.value.world === true) {
    form.location = {
      world: true
    }
  }
  if (arrayLocation.value.selectedContinent !== '') {
    form.location = {
      continent: arrayLocation.value.selectedContinent
    }
  }
  if (arrayLocation.value.selectedCountry !== '') {
    form.location = {
      country: arrayLocation.value.selectedCountry
    }
  }
  if (arrayLocation.value.selectedCity !== '') {
    form.location = {
      city: arrayLocation.value.selectedCity
    }
  }
  if (arrayLocation.value.selectedDataCenter !== '') {
    form.location = {
      dataCenter: arrayLocation.value.selectedDataCenter
    }
  }

  socket.value = io(import.meta.env.VITE_APP_WS_ENDPOINT, {
    transports: ['websocket'],
    reconnectionAttempts: 3,
    auth: {
      token: authStore.token
    }
  })
  socket.value.emit('runFreePing', {
    count: 9,
    packetSize: 64,
    ...form
  })
  socket.value.on('runFreePingResponse', (response) => {
    const workerid = response.worker.id
    if (!(workerid in pingData)) {
      pingData[workerid] = {
        worker: response.worker,
        data: { loss: 0 + '%', time: 0, avg: 0, min: 0, max: 0 }
      }
    }

    pingData[workerid].data = {
      ...pingData[workerid].data,
      ...response.data
    }
    term.value.write(response.data.raw + '\r\n')
  })
}

const toast = () => {
  createToast(
    {
      title: 'Error!',
      description: 'Your Ping lookup is still working'
    },
    {
      timeout: 2000,
      toastBackgroundColor: 'green',
      position: 'top-center'
    }
  )
}

function stopPing() {
  socket.value.disconnect(true)
  socket.value = null
}
</script>

<template>
  <div class="">
    <DisplayLocationsVue @selected-location="responseDisplaylocation" />
  </div>

  <div class="text-right mb-4">
    <v-btn
      @click="stopPing"
      v-if="socket !== null"
      type="button"
      color="primary"
      class=""
    >
      Stop ping</v-btn
    >
    <v-btn
      v-if="socket === null"
      @click="onSubmit"
      prepend-icon="mdi-search-web"
      type="submit"
      color="primary"
      class=""
    >
      Ping lookup
    </v-btn>
  </div>

  <div>
    <v-btn-toggle v-model="show" group tile color="primary">
      <v-btn value="map"> Map </v-btn>
      <v-btn value="raw"> Raw </v-btn>
    </v-btn-toggle>
  </div>

  <div v-show="show === 'map'" class="mt-4 text-xl">
    <MapLeaflet :pingData="pingData" />
    <v-table>
      <thead>
        <tr>
          <th>GEO</th>
          <th>Loss</th>
          <th>Sent</th>
          <th>Last</th>
          <th>Avg</th>
          <th>Best</th>
          <th>Worst</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="[id, value] in Object.entries(pingData)" :key="value">
          <td>
            {{ value.worker.providerLocation.country }},
            {{ value.worker.providerLocation.city }}
          </td>
          <td>{{ value.data.loss }}</td>
          <td>{{ Number(value.data.seq) + 1 }}</td>
          <td>{{ Number(value.data.time).toFixed(2) }}</td>
          <td>{{ Number(value.data.avg).toFixed(2) }}</td>
          <td>{{ Number(value.data.min).toFixed(2) }}</td>
          <td>{{ Number(value.data.max).toFixed(2) }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>

  <div v-show="show === 'raw'">
    <div id="terminal-container" class="terminal mt-4"></div>
  </div>
</template>
