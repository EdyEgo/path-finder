<script setup lang="ts">
import EditProviderForm from '@/components/EditProviderForm.vue'
import Dialog from '@/components/Dialog.vue'
import { useProvidersStore } from '@/stores/providers'
import { onUpdated, ref } from 'vue'

const store = useProvidersStore()
const providerLocations = ref([])
const emit = defineEmits(['closeDialog'])
const props = defineProps({
  show: Boolean,
  provider: Object
})

async function updateProvider(data: any) {
  await store.updateProvider(
    { site: data.site, name: data.name, login: data.login },
    props.provider.id
  )
}

async function deleteLocationProvider(
  locationId: number,
  locationIndex: number
) {
  store.resetErrorMsg()

  await store.deleteProviderLocation(props.provider.id, locationId)

  if (store.errorMsg) return
  providerLocations.value.splice(locationIndex, 1)
}

async function updateLocationProvider(locationData: {
  continent: string
  country: string
  city: string
  dataCenter: string
}) {
  store.resetErrorMsg()

  const newLocation = await store.addProviderLocation(props.provider.id, {
    ...locationData,
    provider: props.provider.id
  })

  providerLocations.value.push({
    title: `${newLocation.continent} ${newLocation.country} ${newLocation.city} ${newLocation.dataCenter}`,
    value: {
      title: `${newLocation.continent} ${newLocation.country} ${newLocation.city} ${newLocation.dataCenter}`,
      value: newLocation.id
    },
    fields: {
      continent: newLocation.continent,
      country: newLocation.country,
      city: newLocation.city,
      dataCenter: newLocation.dataCenter,
      workersCount: newLocation.workers_count
    }
  })
  // props.updateProviderEdit(newLocation)
}

function cb() {
  emit('closeDialog')
}

function deleteProvider(id: string) {
  let result = confirm('Are you sure you want to delete this provider?')
  if (result === true) {
    store.deleteProvider(id)
    emit('closeDialog', true)
  }
}

onUpdated(async () => {
  if (props.provider?.id) {
    const providerId = props.provider.id
    const data = await store.getProviderLocationsById(providerId)

    providerLocations.value = data.map((location) => {
      return {
        title: `${location.continent} ${location.country} ${location.city} ${location.dataCenter}`,
        value: {
          title: `${location.continent} ${location.country} ${location.city} ${location.dataCenter}`,

          value: location.id
        },
        fields: {
          continent: location.continent,
          country: location.country,
          city: location.city,
          dataCenter: location.dataCenter,
          workersCount: location.workers_count
        }
      }
    })
  }
})
</script>

<template>
  <Dialog title="Edit Provider" :show="show" @closeDialog="cb">
    <EditProviderForm
      :provider="provider"
      @closeDialog="cb"
      :handleSubmit="updateProvider"
      :handlesubmitLocation="updateLocationProvider"
      :handleDeleteLocation="deleteLocationProvider"
      :handleDelete="deleteProvider"
      :providerLocations="providerLocations"
    />
  </Dialog>
</template>
