<script setup lang="ts">
import { ref, watch } from 'vue'
import { io } from 'socket.io-client'
import { useAuth } from '@/stores/auth'
import WhoIsParsedVue from '@/components/WhoIsParsed.vue'

const hostname = ref('')
const socket = ref(null)
const response = ref('')
const show = ref(false)
const showParsed = ref(false)
const authStore = useAuth()

const submit = () => {
  const token = authStore.token
  if (hostname.value == '') {
    showParsed.value = false
    show.value = false
  } else {
    const data = {
      hostname: hostname.value
    }
    socket.value = io(import.meta.env.VITE_APP_WS_ENDPOINT, {
      transports: ['websocket'],
      reconnectionAttempts: 3,
      auth: {
        token
      }
    })

    socket.value.emit('runWhoIs', data)
    socket.value.on('runWhoIsResponse', (dataSend) => {
      response.value = dataSend.response.responseWhoIs
      if (socket.value !== null) {
        socket.value.disconnect(true)
        socket.value = null
      }
    })
    show.value = true
    showParsed.value = false
  }
}

watch(response, () => {
  if (response.value !== 0) {
    show.value = true
  }
})

const rawToParsed = () => {
  show.value = false
  showParsed.value = true
}

const parseToRaw = () => {
  showParsed.value = false
  show.value = true
}
</script>

<template>
  <label class="mt-4 block">
    Hostname / adresa IP
    <v-text-field
      v-model="hostname"
      :rules="[(v) => !!v || 'Domain is required']"
      placeholder="Enter a valid hostname or ip adress"
    ></v-text-field>
  </label>

  <div class="text-right mb-4 mt-10">
    <v-btn
      @click="submit"
      color="primary"
      loading
      prepend-icon="mdi-search-web"
    >
      WhoIs lookup
    </v-btn>
  </div>

  <div v-show="show" class="mt-2 ml-10 text-xl space-y-4">
    <v-btn-group class="border">
      <v-btn
        id="raw"
        @click="submit"
        value="raw"
        class="border-r"
        color="primary"
      >
        Raw
      </v-btn>
      <v-btn @click="rawToParsed" id="parsed" value="parsed"> Parsed </v-btn>
    </v-btn-group>
    <div>
      <pre class="border rounded-md text-md bg-black p-2">{{ response }}</pre>
    </div>
  </div>

  <div v-show="showParsed" class="mt-2 ml-10 space-y-4 w-[80%]">
    <v-btn-group class="ml-4 border">
      <v-btn id="raw" @click="parseToRaw" value="raw" class=""> Raw </v-btn>
      <v-btn @click="rawToParsed" id="parsed" color="primary" value="parsed">
        Parsed
      </v-btn>
    </v-btn-group>
    <WhoIsParsedVue :response="response" />
  </div>
</template>
