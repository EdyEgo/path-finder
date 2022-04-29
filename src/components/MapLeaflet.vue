<script setup lang="ts">
import {
  LMap,
  LIcon,
  LTileLayer,
  LMarker,
  LControlLayers,
  LTooltip,
  LPopup,
  LPolyline,
  LPolygon,
  LRectangle
} from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import { ref, watch } from 'vue'

const props: any = defineProps({
  pingData: {}
})
const zoom = ref(2)

const option = ref({
  permanent: true,
  sticky: true,
  direction: 'top',
  offset: [0, -30]
})

watch(zoom, () => {
  if (zoom.value > 2) {
    option.value = {
      permanent: true,
      sticky: true,
      direction: 'top',
      offset: [-2, -32]
    }
  }
})
</script>

<template>
  <div class="w-[100%] h-[400px] mt-4">
    <l-map v-model="zoom" v-model:zoom="zoom" :center="[50, 10]">
      <l-tile-layer

          url="https://api.maptiler.com/maps/ch-swisstopo-lbm-dark/{z}/{x}/{y}@2x.png?key=lgdLOVyrtmzpTJ48yP14"
      ></l-tile-layer>
      <l-marker
        v-for="[id, value] in Object.entries(props.pingData)"
        :key="value"
        :lat-lng="[value.worker.latitude, value.worker.longitude]"
      >
        <l-tooltip v-model="option" v-model:options="option">
          <span v-if="value.stats.time < 10" class="text-green"
            >{{ Number(value.stats.time).toFixed(2) }} ms</span
          >
          <span
            v-if="10 <= value.stats.time && value.stats.time < 50"
            class="text-orange"
            >{{ Number(value.stats.time).toFixed(2) }} ms</span
          >
          <span v-if="value.stats.time >= 50" class="text-red"
            >{{ Number(value.stats.time).toFixed(2) }} ms</span
          >
        </l-tooltip>
        <l-popup class="">
          <span>
            {{ value.worker.providerLocation.country }},
            {{ value.worker.providerLocation.city }}
          </span>
          <p class="text-center">{{ Number(value.stats.time).toFixed(2) }}ms</p>
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>
