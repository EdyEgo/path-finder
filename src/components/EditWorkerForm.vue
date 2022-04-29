<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'
import { useProvidersStore } from '@/stores/providers'

const emit = defineEmits(['closeDialog'])

const props = defineProps({
  show: Boolean,
  worker: Object,
  providers: {
    type: Array,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    default: () => []
  },
  handleSubmit: {
    type: Function,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    default: () => {}
  },
  handleDelete: {
    type: Function,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    default: () => {}
  }
})

const providerId = ref(props.worker.providerLocation.provider.id)

const providersStore = useProvidersStore()
const id = ref(props.worker.id)
const ipAddress = ref(props.worker.ipAddress)
const port = ref(props.worker.port)
const password = ref('')
const price = ref(props.worker.price)
const currency = ref(props.worker.currency)
const paymentRecurrency = ref(props.worker.paymentRecurrency)
const currencyUsed = ['RON', 'EUR', 'USD', 'GBP', '100JPY', 'NOK', 'MDL', 'MXN']
const arrayForDatePayments = [
  'Monthly',
  'Every 3 months',
  'Every 6 months',
  'Yearly'
]

const providerLocations = ref([])

// const provider = ref({
//   title: props.worker.providerLocation.provider.name,
//   value: {
//     value: providerId.value,
//     title: props.worker.providerLocation.provider.name
//   }
// })

const provider = ref({
  value: providerId.value,
  title: props.worker.providerLocation.provider.name
})

const providerLocationSelected = ref({
  title: `${props.worker.providerLocation.continent} ${props.worker.providerLocation.country} ${props.worker.providerLocation.city}`,
  value: {
    value: props.worker.providerLocation.id,
    title: `${props.worker.providerLocation.continent} ${props.worker.providerLocation.country} ${props.worker.providerLocation.city}`
  }
})

const username = ref(props.worker.username)
const valid = ref(props.worker.valid)

const getProviderLocations = async () => {
  const selectedProviderId = provider.value.value

  const locations = await providersStore.getProviderLocationsById(
    selectedProviderId
  )

  providerLocations.value = locations.map((location) => {
    return {
      title: `${location.continent} ${location.country} ${location.city}`,
      value: {
        title: `${location.continent} ${location.country} ${location.city}`,
        value: location.id
      }
    }
  })
}

onMounted(async () => {
  await getProviderLocations()
})

watch(provider, async () => {
  providerLocationSelected.value = null
  if (provider.value === null) return

  await getProviderLocations()
})

const toast = () => {
  createToast(
    {
      title: 'Success!',
      description: 'Changes were made with success'
    },
    {
      timeout: 2000,
      toastBackgroundColor: 'green',
      position: 'top-center'
    }
  )
}

const providersSelect = computed(() =>
  props.providers.map((p) => ({
    value: { value: p.id, title: p.name },
    title: p.name
  }))
)

function onSubmit() {
  const form = {
    id: id.value,
    ipAddress: ipAddress.value,
    username: username.value,
    port: port.value,
    price: price.value,
    paymentRecurrency: paymentRecurrency.value,
    currency: currency.value
  }
  if (typeof providerLocationSelected.value?.value === 'number') {
    form['providerLocation'] = providerLocationSelected.value.value
  }

  if (password.value !== '') {
    form['password'] = password.value
  }
  props.handleSubmit(form)
  if (valid.value) toast()
  emit('closeDialog')
}

function deleteWorker() {
  props.handleDelete(id.value)
}
</script>

<template>
  <div class="p-4 w-[50%] mx-auto">
    <v-form v-model="valid" v-on:submit="onSubmit">
      <div class="flex flex-col">
        <div class="flex flex-row gap-4">
          <v-text-field
            v-model="ipAddress"
            :rules="[(v) => !!v || 'IP Address is required']"
            label="IP Address"
            required
          ></v-text-field>
          <v-text-field
            v-model="port"
            :rules="[(v) => !!v || 'Port is required']"
            label="Port"
            required
          ></v-text-field>
        </div>

        <div class="flex flex-row gap-4">
          <v-text-field
            v-model="username"
            :rules="[(v) => !!v || 'User name is required']"
            label="User name"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Change Root Password"
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

        <div class="flex gap-1 flex-col justify-center">
          <v-select
            v-model="provider"
            :items="providersSelect"
            :rules="[(v) => !!v || 'Provider is required']"
            label="Select provider"
            required
          ></v-select>
          <!-- change to provider selected dude -->
          <v-select
            v-if="provider"
            v-model="providerLocationSelected"
            :items="providerLocations"
            :rules="[(v) => !!v || 'Provider is required']"
            label="Select Location"
            required
          ></v-select>
        </div>

        <div class="flex flex-row justify-between">
          <v-btn color="primary" v-bind="props" type="submit">
            Submit Changes
          </v-btn>
          <v-btn color="red" v-bind="props" type="button" @click="deleteWorker">
            Delete worker
          </v-btn>
        </div>
      </div>
    </v-form>
  </div>
</template>
