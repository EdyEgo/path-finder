<script setup lang="ts">
import { ref, watch, onMounted, reactive } from 'vue'
import Table from '@/components/Table.vue'
import { io } from 'socket.io-client'
import { useAuth } from '@/stores/auth'
import { Terminal } from 'xterm'
import type { Ref } from 'vue'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'
import 'ol/ol.css'
import Feature from 'ol/Feature'
import Map from 'ol/Map'
import OSM from 'ol/source/OSM'
import Point from 'ol/geom/Point'
import View from 'ol/View'
import Fill from 'ol/style/Fill'
import Text from 'ol/style/Text'
import Stroke from 'ol/style/Stroke'
import { Style } from 'ol/style'
import VectorSource from 'ol/source/Vector'
import CircleStyle from 'ol/style/Circle'
import { fromLonLat } from 'ol/proj'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import { createToast } from 'mosha-vue-toastify'
import * as constants from '../config/constants'
import Overlay from 'ol/Overlay'

const term: Ref<Terminal | null> = ref(null)

const socket = ref(null)
const authStore = useAuth()
const pingData = reactive({})
const domain = ref('')
const world = ref(true)

const selectedContinent = ref('')
const selectedCountry = ref('')
const selectedCity = ref('')
const selectedDataCenter = ref('')
const show = ref(false)
const showParsed = ref(false)

watch(world, () => {
  if (world.value === true) {
    selectedContinent.value = ''
    selectedCountry.value = ''
    selectedCity.value = ''
    selectedDataCenter.value = ''
  }
})
watch(selectedContinent, () => {
  if (selectedContinent.value !== '') {
    world.value = false
    selectedCountry.value = ''
    selectedCity.value = ''
    selectedDataCenter.value = ''
  }
})
watch(selectedCountry, () => {
  if (selectedCountry.value !== '') {
    selectedContinent.value = ''
    world.value = false
    selectedCity.value = ''
    selectedDataCenter.value = ''
  }
})
watch(selectedCity, () => {
  if (selectedCity.value !== '') {
    selectedContinent.value = ''
    selectedCountry.value = ''
    world.value = false
    selectedDataCenter.value = ''
  }
})
watch(selectedDataCenter, () => {
  if (selectedDataCenter.value !== '') {
    selectedContinent.value = ''
    selectedCountry.value = ''
    selectedCity.value = ''
    world.value = false
  }
})

function buildPointLabelText({ data, worker }) {
  return `${worker.ipInsight.country.names.en}, ${
    worker.ipInsight.city.names.en
  } \r\n${Number(data.time).toFixed(2)} ms`
}

watch(
  pingData,
  () => {
    if (!map.value) return
    const source = vectorLayer.value.getSource()

    for (const [id, value] of Object.entries(pingData)) {
      const feature = source.getFeatureById(value.worker.id)

      const label = buildPointLabelText(value)
      const avgTime = value.data.time
      if (feature) {
        feature.set('name', label)
        feature.set('time', avgTime)
      } else {
        const featurePoint = new Feature({
          geometry: new Point(
            fromLonLat([value.worker.longitude, value.worker.latitude])
          ),
          name: label,
          time: avgTime
        })

        featurePoint.setId(value.worker.id)

        source.addFeature(featurePoint)
      }
    }

    map.value.updateSize()
  },
  { deep: true }
)

function onSubmit() {
  if (term.value == null) {
    show.value = true
    term.value = new Terminal()
    const fitAddon = new FitAddon()
    const terminalContainer = document.getElementById('terminal-container')
    const token: any = authStore.token

    term.value.loadAddon(fitAddon)
    term.value.open(terminalContainer)
    term.value.focus()
    fitAddon.fit()
  }
  let form = { hostname: domain.value, location: {} }
  if (world.value === true) {
    form.location = {
      world: true
    }
  }
  if (selectedContinent.value !== '') {
    form.location = {
      continent: selectedContinent.value
    }
  }
  if (selectedCountry.value !== '') {
    form.location = {
      country: selectedCountry.value
    }
  }
  if (selectedCity.value !== '') {
    form.location = {
      city: selectedCity.value
    }
  }
  if (selectedDataCenter.value !== '') {
    form.location = {
      dataCenter: selectedDataCenter.value
    }
  }

  socket.value = io(import.meta.env.VITE_APP_WS_ENDPOINT, {
    transports: ['websocket'],
    reconnectionAttempts: 3,
    auth: {
      token: authStore.token
    }
  })
  socket.value.emit('runPing', {
    count: 9,
    packetSize: 64,
    ...form
  })
  socket.value.on('runPingResponse', (response) => {
    const workerid = response.worker.id
    if (!(workerid in pingData)) {
      pingData[workerid] = {
        worker: response.worker,
        data: { loss: 0, sent: 0, time: 0, avg: 0, min: 0, max: 0 }
      }
    }

    pingData[workerid].data = {
      ...pingData[workerid].data,
      ...response.data
    }
    term.value.write(response.data.raw + '\r\n')
  })
}

const map = ref()
const overlay = ref()
const vectorLayer = ref()
function initializeMap() {
  overlay.value = new Overlay({
    element: document.getElementById('popup'),
    autoPan: {
      animation: {
        duration: 250
      }
    }
  })
  const map = new Map({
    layers: [
      new TileLayer({
        source: new OSM()
      })
    ],
    overlays: [overlay.value],
    target: document.getElementById('map'),
    view: new View({
      center: fromLonLat([20, 40]),
      zoom: 1
    })
  })

  const labelStyle = new Style({
    text: new Text({
      font: '12px Calibri,sans-serif',
      overflow: true,
      fill: new Fill({
        color: '#000'
      }),
      stroke: new Stroke({
        color: '#fff',
        width: 2
      }),
      textBaseline: 'bottom',
      offsetY: -8
    })
  })
  const labelStyleRed = new Style({
    text: new Text({
      font: '14px Calibri,sans-serif',
      overflow: true,
      fill: new Fill({
        color: 'red'
      }),
      stroke: new Stroke({
        color: '#fff',
        width: 2
      }),
      textBaseline: 'bottom',
      offsetY: -8
    })
  })
  const labelStyleOrange = new Style({
    text: new Text({
      font: '14px Calibri,sans-serif',
      overflow: true,
      fill: new Fill({
        color: 'orange'
      }),
      stroke: new Stroke({
        color: '#fff',
        width: 2
      }),
      textBaseline: 'bottom',
      offsetY: -8
    })
  })

  const vectorSource = new VectorSource()
  const iconStyle = new Style({
    image: new CircleStyle({
      radius: 6,
      stroke: new Stroke({
        color: '#fff'
      }),
      fill: new Fill({
        color: 'black'
      })
    })
  })
  vectorLayer.value = new VectorLayer({
    source: vectorSource,
    style: function (feature) {
      let name = feature.get('name')
      let timeColor = Number(feature.get('time'))

      if (timeColor < 10.0) {
        labelStyle.getText().setText(name)
        return [iconStyle, labelStyle]
      } else if (10 <= timeColor && timeColor < 50.0) {
        labelStyleOrange.getText().setText(name)
        return [iconStyle, labelStyleOrange]
      } else {
        labelStyleRed.getText().setText(name)
        return [iconStyle, labelStyleRed]
      }
    }
  })

  map.on('pointermove', function (e) {
    if (e.dragging) return
    const popupContent = document.getElementById('popupContent')
    document.getElementById('popup').style.display = 'none'

    map.forEachFeatureAtPixel(e.pixel, function (f) {
      document.getElementById('popup').style.display = 'flex'
      const pointCoordinates = f.getGeometry().getCoordinates()
      const containerData = f.get('name')
      popupContent.innerHTML = containerData
      overlay.value.setPosition(pointCoordinates)
      return true
    })
  })

  map.addLayer(vectorLayer.value)
  return map
}

onMounted(async () => {
  map.value = initializeMap()
})

function reset() {
  if (socket.value !== null) {
    toast()
    return
  } else {
    show.value = false
    showParsed.value = false
    world.value = true
    selectedContinent.value = ''
    selectedCountry.value = ''
    selectedCity.value = ''
    selectedDataCenter.value = ''
    domain.value = ''
    world.value = true
    if (term.value !== null) {
      term.value.reset()
    }
  }
}

const toast = () => {
  createToast(
    {
      title: 'Error!',
      description: 'Your Ping lookup is still working'
    },
    {
      timeout: 2000,
      toastBackgroundColor: 'green',
      position: 'top-center'
    }
  )
}

const toTerminal = () => {
  show.value = false
  showParsed.value = true
}

const toMapTrigger = () => {
  showParsed.value = false
  show.value = true
}

function stopPing() {
  socket.value.disconnect(true)
  socket.value = null
}
</script>

<template>
  <div class="p-4">
    <v-form>
      <div class="flex space-x-4">
        <v-text-field
          v-model="domain"
          :rules="[(v) => !!v || 'Domain is required']"
          label="Domain"
          required
        ></v-text-field>
        <div class="mt-2 pr-2">
          <v-switch v-model="world" color="primary" label="World"></v-switch>
        </div>
        <v-select
          v-model="selectedContinent"
          :items="constants.continents"
          label="Continents"
          required
        ></v-select>
        <v-select
          v-model="selectedCountry"
          :items="constants.countries"
          label="Countries"
          required
        ></v-select>
        <v-select
          v-model="selectedCity"
          :items="constants.cities"
          label="Cities"
          required
        ></v-select>
        <v-select
          v-model="selectedDataCenter"
          :items="constants.dataCenters"
          label="Data Center"
          required
        ></v-select>
      </div>
    </v-form>
  </div>
  <div class="text-center mb-4">
    <v-btn
      @click="stopPing"
      v-if="socket !== null"
      type="button"
      color="primary"
      class=""
    >
      Stop ping</v-btn
    >
    <v-btn
      v-if="socket === null"
      @click="onSubmit"
      prepend-icon="mdi-search-web"
      type="submit"
      color="primary"
      class=""
    >
      Ping lookup
    </v-btn>
    <v-btn @click="reset" class="ml-4"> Reset </v-btn>
  </div>

  <div v-show="show" class="mt-2 text-xl space-y-4">
    <v-btn-group class="ml-4 border">
      <v-btn id="raw" value="raw" class="border-r" color="primary"> Map </v-btn>
      <v-btn @click="toTerminal" id="parsed" value="parsed"> Terminal </v-btn>
    </v-btn-group>

    <!-- <div id="map" class="w-[100%] h-[400px] mt-4"></div>
    <div id="popup" class="border rounded-md text-sm bg-white">
      <div id="popupContent" class="border shadow-md flex p-2 inset-1"></div>
    </div> -->

    <v-table>
      <thead>
        <tr>
          <th>GEO</th>
          <th>Loss</th>
          <th>Sent</th>
          <th>Last</th>
          <th>Avg</th>
          <th>Best</th>
          <th>Worst</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="[id, value] in Object.entries(pingData)" :key="value">
          <td>
            {{ value.worker.providerLocation.country }},
            {{ value.worker.providerLocation.city }}
          </td>
          <td>{{ value.data.loss }}</td>
          <td>{{ value.data.sent }}</td>
          <td>{{ Number(value.data.time).toFixed(2) }}</td>
          <td>{{ Number(value.data.avg).toFixed(2) }}</td>
          <td>{{ Number(value.data.min).toFixed(2) }}</td>
          <td>{{ Number(value.data.max).toFixed(2) }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>

  <div v-show="showParsed" class="mt-2 ml-10 space-y-4 w-[80%]">
    <v-btn-group class="border">
      <v-btn id="raw" @click="toMapTrigger" value="raw" class=""> Map </v-btn>
      <v-btn @click="toTerminal" id="parsed" color="primary" value="parsed">
        Terminal
      </v-btn>
    </v-btn-group>
    <div id="terminal-container" class="terminal mt-4"></div>
  </div>
</template>
