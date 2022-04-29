<script setup lang="ts">
import FreeToolsLayout from '../../layouts/FreeToolsLayout.vue'
import DnsPropagation from '@/components/DnsPropagationForm.vue'
import { onMounted, reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'
import { useAuth } from '@/stores/auth'

const router = useRouter()
const route = useRoute()

const selectedOptions = reactive<{ [key: string]: any }>({
  site: route.query.site || route.params.site || '',
  continent: route.query.continent || '',
  type: route.query.type || route.params.type || ''
})
const errorMessage = ref<null | string>(null)

const dnsPropagationList = reactive({
  propagationWorkers: [],
  percentage: ''
})

function startDnsPropagation(selectedOptions: {
  site: string
  continent: string
  type: string
}) {
  router.push({
    name: 'dns-propagation',
    query: {
      continent: selectedOptions.continent,
      type: selectedOptions.type,
      site: selectedOptions.site
    }
  })
}

onMounted(async () => {
  if (selectedOptions.site.trim() === '' || selectedOptions.site === null)
    return
  let valueChange = selectedOptions.type
  const authStore = useAuth()
  const token = authStore.token

  const data = {
    domain: selectedOptions.site,
    recordType: selectedOptions.type,
    continent: selectedOptions.continent
  }

  const socket: Socket = io(import.meta.env.VITE_APP_WS_ENDPOINT, {
    transports: ['websocket'],
    reconnectionAttempts: 3,
    auth: {
      token
    }
  })

  socket.emit('runFreeDnsPropagation', data)
  socket.on('runFreeDnsPropagationResponse', (dataSent) => {
    dnsPropagationList.propagationWorkers.push(dataSent)
  })
  socket.on('runFreeDnsPropagationResponsePushCompareIps', (dataSent) => {
    dnsPropagationList.propagationWorkers[
      dataSent.index
    ].digParalel.comparedIps.push(dataSent.comparedIps)
  })

  socket.on('dnsFreePropagationResponseError', (errorMsg: string) => {
    dnsPropagationList.percentage = ''
    errorMessage.value = errorMsg

    socket.disconnect()
  })

  socket.on('dnsFreePropagationResponseClose', (propagationPercentage) => {
    dnsPropagationList.percentage = propagationPercentage

    socket.disconnect()
  })
})
</script>

<template>
  <FreeToolsLayout>
    <h1 class="logo text-4xl p-4">DNS Propagations</h1>
    <DnsPropagation @startDnsPropagation="startDnsPropagation" />
    <div
      class="percentage-propagation text-center my-2"
      v-if="dnsPropagationList.percentage !== ''"
    >
      DNS Propagation {{ dnsPropagationList.percentage }}
    </div>
    <div class="error-message-container flex justify-center">
      <div
        class="error-msg p-1 bg-red-400 rounded-sm text-white"
        v-if="errorMessage !== null"
      >
        {{ errorMessage }}
      </div>
    </div>
    <div class="results-container">
      <div
        class="dns-table-container flex flex-col justify-start items-start ml-2"
        v-for="(
          propagation, propagationId
        ) in dnsPropagationList.propagationWorkers"
        :key="propagationId"
      >
        <div
          class="comparedIps flex gap-2 p-2 border-b-2"
          v-for="(ipObject, ipId) in propagation.digParalel.comparedIps"
          :key="ipId"
        >
          <div class="first-part-container flex gap-3">
            <span class="zone-info"
              >{{ propagation.worker.providerLocation.country }},</span
            >
            <span class="zone-info"
              >{{ propagation.worker.providerLocation.city }},</span
            >
            <span class="zone-info"
              >{{ propagation.worker.providerLocation.continent }},</span
            >
            <span class="zone-info">{{
              propagation.worker.providerLocation.dataCenter
            }}</span>
          </div>

          <div class="secound-part-container flex gap-2">
            <span class="ip-container text-blue-500">{{ ipObject.ip }}</span>
            <span
              class="propagated-info"
              :class="ipObject.propagated ? 'text-green-400' : 'text-red-400'"
              >{{ ipObject.propagated ? '&#10004;' : 'x' }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </FreeToolsLayout>
</template>
