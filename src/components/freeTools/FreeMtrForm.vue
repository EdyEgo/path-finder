<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import { io } from 'socket.io-client'
import { useAuth } from '@/stores/auth'
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css'
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'
import DisplayLocationsVue from '../DisplayLocations.vue'
const WsEndpoint: any = import.meta.env.VITE_APP_WS_ENDPOINT

const mtrData = reactive({})

const socket = ref(null)
const authStore = useAuth()

const arrayLocation = ref()
function responseDisplaylocation(data) {
  arrayLocation.value = data
}

const toast = () => {
  createToast(
    {
      title: 'Error!',
      description: 'Your Mtr lookup is still working'
    },
    {
      timeout: 2000,
      toastBackgroundColor: 'green',
      position: 'top-center'
    }
  )
}
const token: any = authStore.token

const submit = () => {
  resetData()
  let data = {
    hostname: arrayLocation.value.domain,
    location: {}
  }
  if (arrayLocation.value.world === true) {
    data.location = {
      world: true
    }
  }
  if (arrayLocation.value.selectedContinent != '') {
    data.location = {
      continent: arrayLocation.value.selectedContinent
    }
  }
  if (arrayLocation.value.selectedCountry != '') {
    data.location = {
      country: arrayLocation.value.selectedCountry
    }
  }
  if (arrayLocation.value.selectedCity != '') {
    data.location = {
      city: arrayLocation.value.selectedCity
    }
  }
  if (arrayLocation.value.selectedDataCenter != '') {
    data.location = {
      dataCenter: arrayLocation.value.selectedDataCenter
    }
  }
  socket.value = io(WsEndpoint, {
    transports: ['websocket'],
    auth: {
      token
    }
  })

  socket.value.emit('runFreeMtr', data)
  socket.value.on('runFreeMtrResponse', (dataSend) => {
    const workerid = dataSend.worker.id
    if (!(workerid in mtrData)) {
      const term = new Terminal()

      mtrData[workerid] = {
        worker: dataSend.worker,
        data: dataSend.data,
        terminal: term
      }
    }
    mtrData[workerid].data = {
      ...mtrData[workerid].data,
      ...dataSend.data
    }
    mtrData[workerid].terminal.write(dataSend.data.responseRT)
  })
}

function showMtr(id) {
  document.getElementById('terminal-worker-' + id).classList.remove('hidden')
  document.getElementById('hiddenMtr' + id).style.display = 'flex'
  document.getElementById('showMtr' + id).style.display = 'none'
  const term = mtrData[id].terminal
  if (term.element) return
  const divTerminal = document.getElementById('terminal-worker-' + id)
  term.open(divTerminal)
  term.focus()
}

function hideMtr(id) {
  document.getElementById('terminal-worker-' + id).classList.add('hidden')
  document.getElementById('showMtr' + id).style.display = 'flex'
  document.getElementById('hiddenMtr' + id).style.display = 'none'
}

function stopMtr() {
  socket.value.disconnect(true)
  socket.value = null
}

function resetData() {
  Object.keys(mtrData).forEach((key) => delete mtrData[key])
}
</script>

<template>
  <div class="">
    <DisplayLocationsVue @selected-location="responseDisplaylocation" />
  </div>

  <div class="text-right mb-4">
    <v-btn
      @click="submit"
      v-if="socket === null"
      color="primary"
      prepend-icon="mdi-search-web"
      type="submit"
    >
      Mtr lookup
    </v-btn>
    <v-btn
      @click="stopMtr"
      v-if="socket !== null"
      type="button"
      color="primary"
      class="ml-4"
    >
      Stop mtr</v-btn
    >
  </div>

  <div v-if="Object.keys(mtrData).length != 0" class="divide-y">
    <label for="" class="ml-2 text-xl">Workers </label>
    <div
      v-for="[id, value] in Object.entries(mtrData)"
      :key="value"
      class="p-2"
    >
      <div class="grid grid-cols-2">
        <div class="ml-4 mt-2">
          {{ value.worker.providerLocation.country }},
          {{ value.worker.providerLocation.city }}
        </div>
        <div class="">
          <v-btn :id="'showMtr' + id" @click="showMtr(id)">Show MTR</v-btn>
          <v-btn :id="'hiddenMtr' + id" @click="hideMtr(id)" hidden
            >Hide MTR</v-btn
          >
        </div>
      </div>
      <div class="mt-2">
        <div :id="'terminal-worker-' + id"></div>
      </div>
    </div>
  </div>
</template>
