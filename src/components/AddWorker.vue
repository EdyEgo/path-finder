<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'

import AddWorkerForm from '@/components/AddWorkerForm.vue'
import Dialog from '@/components/Dialog.vue'
import { useAuth } from '@/stores/auth'
import { useWorkersStore } from '@/stores/workers'

import type { Worker } from '@/types'
import { useProvidersStore } from '@/stores/providers'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { io, Socket } from 'socket.io-client'
import 'xterm/css/xterm.css'

const store = useWorkersStore()
const auth = useAuth()
const isloading = ref(false)
const providersStore = useProvidersStore()
const createdWorker = ref(null)

onMounted(async () => {
  await providersStore.getProviders('')
})

const socket: Ref<Socket | null> = ref(null)
const term: Ref<Terminal | null> = ref(null)
const WsEndpoint: any = import.meta.env.VITE_APP_WS_ENDPOINT

const emits = defineEmits(['closeDialog'])
defineProps({
  show: Boolean
})

const toast = () => {
  createToast(
    {
      title: 'Success!',
      description: 'Successfully added a new worker'
    },
    {
      timeout: 2000,
      toastBackgroundColor: 'green',
      position: 'top-center'
    }
  )
}

function initTerminal() {
  term.value = new Terminal()
  const fitAddon = new FitAddon()
  const terminalContainer = document.getElementById('terminal-container')

  term.value.loadAddon(fitAddon)
  term.value.open(terminalContainer)

  term.value.focus()
  fitAddon.fit()

  term.value.onData((data) => {
    socket.value.emit('data', data)
  })
  socket.value.on('connect', () => {
    socket.value.emit('geometry', term.value.cols, term.value.rows)
  })
  socket.value.on('data', (data) => {
    term.value.write(data)
  })

  function resizeScreen() {
    fitAddon.fit()
    socket.value.emit('resize', {
      cols: term.value.cols,
      rows: term.value.rows
    })
  }

  window.addEventListener('resize', resizeScreen, false)
}

async function addWorker(data: Worker) {
  isloading.value = true
  store.resetErrorMesssage()
  createdWorker.value = await store.addWorker(data)

  if (store.errorMsg) {
    isloading.value = false
    return
  }
  socket.value = io(WsEndpoint, {
    transports: ['websocket'],
    reconnectionAttempts: 3,
    auth: {
      token: auth.$state.token
    }
  })

  socket.value.on('connect_error', () => {
    alert('Failed to connect. Please try again')
    isloading.value = false
    socket.value.disconnect()
  })

  socket.value.emit('addWorker', data)

  socket.value.on('status', () => {
    isloading.value = false
    initTerminal()
  })
  socket.value.on('finishDeploy', async () => {
    await store.updateWorker(
      { status: 'finished_install' },
      createdWorker.value.id
    )
    toast()
    emits('closeDialog', true)
  })

  socket.value.on('badCredentials', () => {
    isloading.value = false
    alert('Invalid Credentials. Please verify IP and Password')
  })
  socket.value.on('connEndHost', () => {
    // alert('Connection ended by host')
  })
  socket.value.on('connEnd', () => {
    // alert('Connection ended')
  })
  socket.value.on('connError', () => {
    alert('There was an error while trying to connect to the server')
  })
}
</script>

<template>
  <Dialog
    title="Add Worker"
    :show="show"
    class="overflow-auto"
    @close-dialog="$emit('closeDialog')"
  >
    <v-progress-linear
      v-if="isloading"
      :indeterminate="true"
      color="primary"
    ></v-progress-linear>
    <div id="terminal-container" class="terminal"></div>
    <AddWorkerForm
      :addWorkerError="store.errorMsg"
      :providers="providersStore.providers"
      :handleSubmit="addWorker"
    />
  </Dialog>
</template>
