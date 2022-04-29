<script setup lang="ts">
import { ref } from 'vue'
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'
import { useProvidersStore } from '@/stores/providers'
import ProviderLocationForm from './ProviderLocationForm.vue'

const emit = defineEmits(['closeDialog'])

const props = defineProps({
  show: Boolean,
  provider: Object,
  handleSubmit: {
    type: Function,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    default: () => {}
  },
  handleDelete: {
    type: Function,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    default: () => {}
  },
  handlesubmitLocation: {
    type: Function,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    default: () => {}
  },
  handleDeleteLocation: {
    type: Function,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    default: () => {}
  },
  providerLocations: {
    type: Array,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    default: () => []
  }
})
const providersStore = useProvidersStore()

const id = ref(props.provider.id)
const name = ref(props.provider.name)
const site = ref(props.provider.site)
const login = ref(props.provider.login)

const valid = ref(false)

async function loadProviderLocationById(providerId: number) {
  const result = await providersStore.getProviderLocationsById(providerId)
  return result
}

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

function onSubmit() {
  const form = {
    id: id.value,
    name: name.value,
    site: site.value,
    login: login.value
  }
  props.handleSubmit(form)
  if (valid.value) toast()
  emit('closeDialog')
}

function deleteProvider() {
  props.handleDelete(id.value)
  emit('closeDialog', true)
}

function makeWordShorter(word: string) {
  if (word.length < 10) return word
  return `${word.slice(0, 10)}..`
}
</script>

<template>
  <div class="p-4 w-full">
    <v-form class="max-w-xl mx-auto" v-model="valid" v-on:submit="onSubmit">
      <v-text-field
        v-model="name"
        label="Provider Name"
        placeholder="Enter the providers name"
        :rules="[(v) => !!v || 'Provider name is required']"
        required
      ></v-text-field>
      <v-text-field
        v-model="site"
        label="Provider Website"
        placeholder="Enter the providers website"
        :rules="[(v) => !!v || 'Provider website is required']"
        required
      ></v-text-field>
      <v-text-field
        v-model="login"
        label="Provider Login"
        placeholder="Enter the providers login"
        :rules="[(v) => !!v || 'Provider login is required']"
        required
      ></v-text-field>
      <div class="text-right">
        <v-btn color="primary" v-bind="props" type="submit">
          Update Provider
        </v-btn>
      </div>

      <div class="mt-8">
        <h2 class="font-bold mb-2">Locations:</h2>
        <div v-if="props.providerLocations">
          <v-table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="text-sm font-semibold">Continent</th>
                <th scope="col" class="text-sm font-semibold">Country</th>
                <th scope="col" class="text-sm font-semibold">City</th>
                <th scope="col" class="text-sm font-semibold">Data Center</th>
                <th scope="col" class="text-sm font-semibold">Workers Count</th>
                <th scope="col" class="relative"></th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-200 bg-white">
              <tr
                v-for="(location, locationIndex) in props.providerLocations"
                :key="location.id"
              >
                <td
                  :title="location.fields.continent"
                  class="whitespace-nowrap"
                >
                  {{ makeWordShorter(location.fields.continent) }}
                </td>

                <td :title="location.fields.country" class="whitespace-nowrap">
                  {{ makeWordShorter(location.fields.country) }}
                </td>
                <td :title="location.fields.city" class="whitespace-nowrap">
                  {{ makeWordShorter(location.fields.city) }}
                </td>
                <td
                  :title="location.fields.dataCenter"
                  class="whitespace-nowrap"
                >
                  {{ makeWordShorter(location.fields.dataCenter) }}
                </td>
                <td
                  :title="location.fields.workersCount"
                  class="whitespace-nowrap"
                >
                  {{ location.fields.workersCount }}
                </td>
                <!-- workersCount -->
                <td
                  class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                >
                  <span class="container-remove-btn" fab dark color="indigo">
                    <span
                      dark
                      class="cursor-pointer hover:text-red-400"
                      @click.prevent="
                        () => {
                          //    deleteProviderLocation(locationIndex)
                          props.handleDeleteLocation(
                            location.value.value,
                            locationIndex
                          )
                        }
                      "
                    >
                      remove
                    </span>
                  </span>
                </td>
              </tr>
            </tbody>
          </v-table>
          <div
            class="error-msg-container-providers-list flex justify-center p-2"
          >
            <span
              class="err-msg bg-red-400 text-white p-1 rounded-sm w-[80%]"
              v-if="
                providersStore.errorMsg !== '' &&
                providersStore.errorMsg !== null
              "
            >
              {{ providersStore.errorMsg }}</span
            >
          </div>
        </div>

        <div class="container-new-provider-locations my-4">
          <h2 class="font-bold mt-4 mb-2">Add a new location:</h2>
          <ProviderLocationForm
            :provider="provider"
            :handleSubmit="handlesubmitLocation"
            :locationData="{
              continent: '',
              country: '',
              city: ''
            }"
          />
        </div>
      </div>

      <div class="flex flex-row justify-end">
        <!-- <v-btn color="red" v-bind="props" type="button" @click="deleteProvider">
          Delete provider
        </v-btn> -->
      </div>
    </v-form>
  </div>
</template>
