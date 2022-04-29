<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, watch, onMounted } from 'vue'
import { useProvidersStore } from '@/stores/providers'
import VueMultiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css'

const store = useProvidersStore()
const emit = defineEmits(['selectedLocation', 'runWorld'])

const router = useRoute()
const selectedContinent = ref([])
const domain = ref(router.params.domain)
const selectedCountry = ref([])
const selectedCity = ref([])
const selectedDataCenter = ref([])
const world = ref(true)

watch(world, async (newWorld) => {
  if (newWorld === true) {
    selectedContinent.value = []
    selectedCountry.value = []
    selectedCity.value = []
    selectedDataCenter.value = []
  }
})

watch(
  [
    world,
    selectedContinent,
    selectedCountry,
    selectedCity,
    selectedDataCenter,
    domain
  ],
  () => {
    emit('selectedLocation', {
      world,
      selectedContinent,
      selectedCountry,
      selectedCity,
      selectedDataCenter,
      domain
    })
  }
)

watch(
  [selectedContinent, selectedCountry, selectedCity, selectedDataCenter],
  async (
    [newContinent, newCountry, newCity, newDataCenter],
    [oldContinent, oldCountry, oldCity, oldDataCenter]
  ) => {
    await store.getAllLocations({
      continent: selectedContinent.value,
      country: selectedCountry.value,
      city: selectedCity.value,
      dataCenter: selectedDataCenter.value
    })
    if (newContinent.length > 0 && newContinent != oldContinent) {
      world.value = false
    }
    if (newCountry.length > 0 && newCountry != oldCountry) {
      // selectedContinent.value = store.locations.continent
      // selectedContinent.value = ['all']
      world.value = false
    }
    if (newCity.length > 0 && newCity != oldCity) {
      // selectedContinent.value = store.locations.continent
      // selectedCountry.value = store.locations.country
      world.value = false
    }
    if (newDataCenter.length > 0 && newDataCenter != oldDataCenter) {
      // selectedContinent.value = store.locations.continent
      // selectedCountry.value = store.locations.country
      // selectedCity.value = store.locations.city
      world.value = false
    }
  }
)

onMounted(async () => {
  await store.getAllLocations({})
  emit('selectedLocation', {
    world,
    selectedContinent,
    selectedCountry,
    selectedCity,
    selectedDataCenter,
    domain
  })
})
</script>

<template>
  <v-form>
    <div class="flex mt-4">
      <div class="flex flex-col flex-1 mr-5">
        <div class="">
          <p class="label ml-1">IPv4 / IPv6 / Hostname</p>
          <input
            v-model="domain"
            type="text"
            placeholder="Enter here..."
            class="input w-full mt-2"
          />
        </div>
        <div class="flex mt-3 space-x-3">
          <div class="flex-1">
            <p class="label ml-1">Continents</p>
            <VueMultiselect
              v-model="selectedContinent"
              :options="store.locations.continent"
              :multiple="true"
              :close-on-select="true"
              class="mt-2"
            ></VueMultiselect>
          </div>
          <div class="flex-1">
            <p class="label ml-1">Countries</p>
            <VueMultiselect
              v-model="selectedCountry"
              :options="store.locations.country"
              :multiple="true"
              :close-on-select="true"
              class="mt-2"
            ></VueMultiselect>
          </div>
          <div class="flex-1">
            <p class="label ml-1">Cities</p>
            <VueMultiselect
              v-model="selectedCity"
              :options="store.locations.city"
              :multiple="true"
              :close-on-select="true"
              class="mt-2"
            ></VueMultiselect>
          </div>
          <div class="flex-1">
            <p class="label ml-1">Data Center</p>
            <VueMultiselect
              v-model="selectedDataCenter"
              :options="store.locations.dataCenter"
              :multiple="true"
              :close-on-select="true"
              class="mt-2"
            ></VueMultiselect>
          </div>
        </div>
      </div>
      <!--          <div class="mr-2">-->
      <!--            <p class="label ">IP version</p>-->
      <!--            <select type="select" class="input mt-2 px-2 w-full">-->
      <!--              <option value="eu">WOW MERGE</option>-->
      <!--            </select>-->
      <!--          </div>-->
      <div class="mt-7">
        <button
          class="button primary outlined flex items-center"
          @click="emit('runWorld')"
        >
          <img class="mr-2" src="@/assets/worldButtonIcon.png" />
          Global
        </button>
      </div>
    </div>
  </v-form>
</template>

<style>
.multiselect * {
  background: transparent;
  border-color: #ffffff33;
}

/*.multiselect__select:before{*/
/*  background: yellow;*/
/*}*/
/*.multiselect__content-wrapper{*/
/*  background: pink;*/
/*}*/
/*.multiselect__input, .multiselect__single {*/
/*  background: purple;*/
/*}*/
.multiselect__option--highlight {
  background: #6b7280;
}

/*.multiselect__tags-wrap {*/
/*  background: chartreuse;*/
/*}*/
</style>
