<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import { io } from 'socket.io-client'
import { useAuth } from '../stores/auth'
import * as constants from '../config/constants'
import DisplayLocationsVue from './DisplayLocations.vue'

const socket = ref(null)
const response = ref([])

const authStore = useAuth()

const arrayLocation = ref()
function responseDisplaylocation(data) {
  arrayLocation.value = data
}

const submit = () => {
  response.value = []
  let data = {
    port: 0,
    protocol: '',
    nrOfQueries: 0,
    hostname: arrayLocation.value.domain,
    location: {}
  }
  const token: any = authStore.getAuthToken
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

  socket.value = io(import.meta.env.VITE_APP_WS_ENDPOINT, {
    transports: ['websocket'],
    reconnectionAttempts: 3,
    auth: {
      token
    }
  })
  socket.value.emit('runTraceRoute', data)
  socket.value.on('runTraceRouteResponse', (dataSend: any) => {
    response.value.push(dataSend[0].response)
    if (socket.value !== null) {
      socket.value.disconnect(true)
      socket.value = null
    }
  })
}
</script>

<template>
  <div>
    <DisplayLocationsVue @selected-location="responseDisplaylocation" />
  </div>

  <div class="text-right mb-4 mt-10">
    <v-btn
      color="primary"
      prepend-icon="mdi-search-web"
      @click="submit"
      type="submit"
    >
      Traceroute lookup
    </v-btn>
  </div>

  <v-form ref="displayValue" v-for="t in response" :key="t" class="">
    <pre class="border rounded-md bg-black p-2 overflow-auto text-md">{{
      t.responseTR.trim()
    }}</pre>
  </v-form>
</template>
