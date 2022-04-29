<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'

const props = defineProps({
  locationData: {
    type: Object,
    default: () => ({
      continent: '',
      city: '',
      country: ''
    })
  },
  handleSubmit: {
    type: Function,

    default: () => {}
  }
})

const form = ref(null)
const validNewLocation = ref(true)
const newContinent = ref('')
const newCountry = ref('')
const newCity = ref('')
const newDataCenter = ref('')

onBeforeMount(() => {
  newContinent.value = props.locationData.continent
  newCountry.value = props.locationData.country
  newCity.value = props.locationData.city
  reset()
})

function reset() {
  if (form.value) {
    form.value.reset()
  }
}

function resetValidation() {
  if (form.value) {
    form.value.resetValidation()
  }
}

function validate() {
  if (form.value) {
    form.value.validate()
  }

  validNewLocation.value = true
}

const submitNewLocation = async () => {
  validate()
  props.handleSubmit({
    continent: newContinent.value,
    country: newCountry.value,
    city: newCity.value,
    dataCenter: newDataCenter.value
  })
  newContinent.value = ''
  newCountry.value = ''
  newCity.value = ''
  newDataCenter.value = ''
  setTimeout(() => {
    reset()
  }, 10)
  reset()
}
</script>

<template>
  <v-form ref="form">
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="newContinent"
          @keyup="resetValidation"
          :rules="[(v) => !!v || 'Continent  is required']"
          label="Continent"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          v-model="newCountry"
          @keyup="resetValidation"
          :rules="[(v) => !!v || 'Country  is required']"
          label="Country"
          required
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="newCity"
          @keyup="resetValidation"
          :rules="[(v) => !!v || 'City  is required']"
          label="City"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          v-model="newDataCenter"
          @keyup="resetValidation"
          :rules="[(v) => !!v || 'Data center  is required']"
          label="Data Center"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <div class="text-right">
      <v-btn fab dark color="secondary" @click="submitNewLocation" size="small">
        Save Location
      </v-btn>
    </div>
  </v-form>
</template>