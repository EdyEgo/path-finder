<script setup lang="ts">
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import * as constants from '../config/constants'
const route = useRoute()

const emits = defineEmits(['startDnsPropagation'])

const selectedOptions = reactive({
  site: route.query.site || route.params.site || '',
  continent: route.query.continent || '',
  type: route.query.type || route.params.type || 'A'
})

const availableOptions = reactive({
  types: ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'PTR', 'SOA', 'SRV', 'TXT'],
  continents: ['WorldWide', 'America', 'Asia', 'Africa', 'Oceania', 'Europe']
})

function submitSelectedOptions() {
  if (selectedOptions.site === '') return null
  emits('startDnsPropagation', selectedOptions)
}
</script>

<template>
  <div class="dnsPropagation-container">
    <v-form class="mx-2">
      <div class="content-container flex mb-2 gap-1">
        <v-text-field
          v-model="selectedOptions.site"
          :rules="[(v) => !!v || 'Domain is required']"
          label="Domain"
          hide-details
          required
        ></v-text-field>

        <v-select
          v-model="selectedOptions.type"
          :items="constants.recordTypeExpanded"
          label="Type"
          hide-details
          required
        ></v-select>

        <!-- <v-select
          v-model="selectedOptions.continent"
          :items="availableOptions.continents"
          label="Continent"
          hide-details
          required
        ></v-select> -->
      </div>
      <v-btn
        @click="submitSelectedOptions"
        prepend-icon="mdi-search-web"
        type="submit"
        color="primary"
        class="my-2"
      >
        Start DNS Propagation
      </v-btn>
    </v-form>
  </div>
</template>
