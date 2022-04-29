<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'
import { useWorkersStore } from '@/stores/workers'
import { useProvidersStore } from '@/stores/providers'
import { addProviderLocation } from '@/services/providers'
import ProviderLocationForm from './ProviderLocationForm.vue'

const ipAddress = ref(null)
const port = ref(null)
const password = ref(null)
const provider = ref(null)
const price = ref(null)
const paymentRecurrency = ref(null)
const currencyUsed = ['RON', 'EUR', 'USD', 'GBP', '100JPY', 'NOK', 'MDL', 'MXN']
const arrayForDatePayments = [
  'Monthly',
  'Every 3 months',
  'Every 6 months',
  'Yearly'
]
const currency = ref(null)
const providerLocations = ref([])
const providerLocationSelected = ref(null)
const username = ref(null)
const formValid = ref(false)
const providersStore = useProvidersStore()
const showProviderLocationForm = ref(false)
const store = useWorkersStore()
const responseLocation = ref({})

async function getIpDataAndShowForm() {
  if (showProviderLocationForm.value) {
    showProviderLocationForm.value = false
    return
  }
  if (ipAddress.value === null) {
    createToast(
      {
        title: 'Error!',
        description: 'Please provide a valid ip adress'
      },
      {
        timeout: 2000,
        type: 'danger',
        position: 'top-center'
      }
    )
    return
  }
  responseLocation.value = await store.getMaxMindData(ipAddress.value)
  showProviderLocationForm.value = true
}

async function addLocation(data) {
  try {
    const location = await addProviderLocation(provider.value.value, data)
    getProviderLocations()
    showProviderLocationForm.value = false
    providerLocationSelected.value = {
      title: `[${location.continent}] ${location.country} - ${location.city}, ${location.dataCenter}`,
      value: location.id
    }
  } catch (error: any) {
    createToast(
      {
        title: 'Error!',
        description: error
      },
      {
        timeout: 2000,
        type: 'danger',
        position: 'top-center'
      }
    )
    return
  }
}

const ipRules = ref([
  (v) => !!v || 'Ip is required',
  (v) =>
    /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/.test(v) ||
    'Ip must be valid'
])
const portRules = ref([
  (v) => !!v || 'Port is required',
  // (v) => typeof v !== 'number' || 'Port must be a number',
  (v) => (v >= 0 && v <= 65535) || 'Port must be valid'
])
const passwordRules = ref([
  (v) => !!v || 'Root Password is required',
  (v) => v.length >= 8 || 'Min 8 characters'
])

const props = defineProps({
  handleSubmit: {
    type: Function,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    default: () => {}
  },
  providers: {
    type: Array,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    default: () => []
  },
  addWorkerError: {
    type: String,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    default: () => ''
  }
})

const providersSelect = computed(() => {
  return props.providers.map((p) => ({
    title: p.name,
    value: { title: p.name, value: p.id }
  }))
})

async function getProviderLocations() {
  providerLocationSelected.value = null
  if (provider.value === null) return
  const selectedProviderId = provider.value.value

  const locations = await providersStore.getProviderLocationsById(
    selectedProviderId
  )

  providerLocations.value = locations.map((location) => {
    return {
      title: `[${location.continent}] ${location.country} - ${location.city}, ${location.dataCenter}`,
      value: {
        title: `[${location.continent}] ${location.country} - ${location.city}, ${location.dataCenter}`,
        value: location.id
      }
    }
  })
}

watch(provider, getProviderLocations)

function onSubmit() {
  const form = {
    ipAddress: ipAddress.value,
    password: password.value,
    username: username.value,
    port: port.value,
    price: price.value,
    paymentRecurrency: paymentRecurrency.value,
    currency: currency.value,
    providerLocation: providerLocationSelected.value.value
  }
  props.handleSubmit(form)
}
</script>

<template>
  <div class="p-4">
    <v-form
      v-model="formValid"
      class="lg:w-[50%] lg:mx-auto"
      v-on:submit="onSubmit"
    >
      <div class="flex justify-evenly gap-4">
        <v-text-field
          v-model="ipAddress"
          :rules="ipRules"
          label="IP Address"
          required
        ></v-text-field>
        <v-text-field
          v-model="port"
          :rules="portRules"
          label="Port"
          required
        ></v-text-field>
      </div>

      <div class="flex flex-row gap-4 justify-center">
        <v-text-field
          v-model="username"
          :rules="[(v) => !!v || 'User name is required']"
          label="User name"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Root Password"
          required
        ></v-text-field>
      </div>

      <div class="flex flex-row gap-4 justify-center">
        <v-text-field v-model="price" label="Price" required></v-text-field>

        <v-autocomplete
          v-model="currency"
          label="Currency"
          :items="currencyUsed"
          required
        ></v-autocomplete>

        <v-autocomplete
          v-model="paymentRecurrency"
          label="Payment Recurrency"
          :items="arrayForDatePayments"
          required
        ></v-autocomplete>
      </div>

      <div class="flex flex-col justify-center">
        <v-select
          v-model="provider"
          :items="providersSelect"
          :rules="[(v) => !!v || 'Provider is required']"
          label="Select provider"
          required
        ></v-select>
        <div v-if="provider" class="flex">
          <v-select
            v-model="providerLocationSelected"
            :items="providerLocations"
            :rules="[(v) => !!v || 'Provider is required']"
            label="Select Location"
            required
          ></v-select>
          <div class="mt-2 ml-4">
            <v-btn @click="getIpDataAndShowForm" color="secondary">
              Add new location
            </v-btn>
          </div>
        </div>
        <div v-if="showProviderLocationForm">
          <div class="font-bold mb-2">Add location</div>
          <ProviderLocationForm
            :provider="provider"
            :handleSubmit="addLocation"
            :locationData="{
              continent: responseLocation.continent.names.en,
              country: responseLocation.country.names.en,
              city: responseLocation.city.names.en
            }"
          />
        </div>
      </div>

      <div class="text-left">
        <v-btn color="primary" type="submit"> Add Worker </v-btn>
      </div>
      <div class="erro-msg-container flex justify-center">
        <div
          class="error-msg bg-red-400 rounded-sm p-2"
          v-show="props.addWorkerError !== null && props.addWorkerError !== ''"
        >
          {{ props.addWorkerError }}
        </div>
      </div>
    </v-form>
  </div>
</template>
