<script setup lang="ts">
import {ref, onBeforeMount, computed, watch, onMounted} from 'vue'
import {LineChart} from 'vue-chart-3'
import {Chart, registerables} from 'chart.js'
import {Terminal} from 'xterm'
import type {Ref} from 'vue'
import {FitAddon} from 'xterm-addon-fit'
import 'xterm/css/xterm.css'

const term: Ref<Terminal | null> = ref(null)
const opened = ref({})
const dropDownValue = ref('')
const props = defineProps({
  header: Object,
  rows: Object,
  provider: String,
  pingTime: String,
  startPing: Boolean
})

function toggleRow(ip: any, button: any) {
  opened.value[ip] = button
}

Chart.register(...registerables)
const lineRef = ref('')
const options = ref({
  responsive: true,
  animation: {
    duration: 0
  },
  plugins: {
    legend: {
      display: false
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem: any) {
          return tooltipItem.yLabel
        }
      }
    }
  },
  // scales: {
  //   y: {
  //     title: {
  //       display: true,
  //       text: 'Response Time (ms)'
  //     }
  //   },
  //   x: {
  //     title: {
  //       display: true,
  //       text: 'Number of Pings'
  //     }
  //   }
  // }
})

const testData = (data: any) => ({
  labels: Array.from(Array(9).keys()),
  datasets: [
    {
      data: data.filter(d => d.time).map(d => Number(d.time)),
      pointRadius: 0,
      pointHoverRadius: 5,
      backgroundColor: 'rgba(251,129,34,.1)',
      fill: true,
      borderColor: 'rgb(251,129,34)',
      tension: 0.5
    }
  ]
})

function showTerminal(id) {
  const term = props.rows[id].terminal
  if (term.element) return
  const divTerminal = document.getElementById('terminal-worker-' + id)
  term.open(divTerminal)
  term.focus()
}

</script>

<template>
  <table class="w-full">
    <tr class="">
      <th class="table-head bg-gray-500" v-for="item in header" :key="item">{{ item }}</th>
    </tr>
    <template v-for="[id, value] in Object.entries(rows)" :key="value">
      <tr @change="('am incarcat')" class=" cursor-pointer hover:bg-gray-300">
        <td class="table-data">
          {{ value.worker.ipInsight.country.names.en }},
          {{ value.worker.ipInsight.city.names.en }}
        </td>
        <td class="table-data"></td>
        <td class="table-data"></td>
        <td class="table-data">{{ value.stats.ip }}</td>
        <td :ref="pingTime" :class="parseInt(value.stats.loss) < 0.5? 'text-green-500': 'text-red-500'"
            class="table-data ">{{ value.stats.loss }}
        </td>
        <td class="table-data">{{ Number(value.stats.seq) + 1 }}</td>
        <td class="table-data">{{ Number(value.stats.time).toFixed(2) }}</td> <!-- last -->
        <td class="table-data">{{ Number(value.stats.avg).toFixed(2) }}</td>
        <td class="table-data">{{ Number(value.stats.min).toFixed(2) }}</td>
        <td class="table-data">{{ Number(value.stats.max).toFixed(2) }}</td>
        <td class="table-data">{{ value.data.id }}</td>
        <td class="table-data space-x-3">
          <button @click="toggleRow(value.stats.ip, 'chart')" class="bg-green-800">Chart</button>
          <button @click="[toggleRow(value.stats.ip, 'terminal'), showTerminal(value.worker.id) ]"
                  class="bg-purple-600">Terminal
          </button>
        </td>
      </tr>
      <tr v-show="opened[value.stats.ip] == 'chart'">
        <td colspan="11">
          <LineChart
              ref="lineRef"
              :height="50"
              :chartData="testData(value.data)"
              :options="options"
          />
        </td>
      </tr>
      <tr v-show="opened[value.stats.ip] == 'terminal'">
        <td colspan="11">
          <div :id="'terminal-worker-' + value.worker.id"></div>
        </td>
      </tr>
    </template>
  </table>
</template>