<script setup lang="ts">
import { ref, computed } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue'
import { LineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import Ping from 'ping.js'


let p = new Ping()

const hostname = ref('')
const avg = ref(0)

Chart.register(...registerables)
let time = new Date().toLocaleTimeString()
const pingTime = ref<any>([])
const labels = ref<any>([])
const lineRef = ref()
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
  scales: {
    y: {
      title: {
        display: true,
        text: 'Response Time (ms)'
      }
    },
    x: {
      title: {
        display: true,
        text: 'Number of Pings'
      }
    }
  }
})

const testData = computed(() => ({
  labels: Array.from(Array(100).keys()),

  datasets: [
    {
      data: pingTime.value,
      pointStyle: 'circle',
      pointRadius: 3.5,
      pointHoverRadius: 5,
      backgroundColor: ['rgb(0,255,0)'],
      fill: false,
      borderColor: 'rgb(138,43,226)',
      tension: 0.2
    }
  ]
}))

async function runPing(hostname: string) {
  pingTime.value = []
  avg.value = 0
  let sum = 0
  for (let i = 0; i < 100; i++) {
    try {
      await p.ping(`http://${hostname}`, function (err: any, data: any) {
        pingTime.value = [...pingTime.value, data]
        sum += data
        avg.value = Math.round(sum / i)
      })
    } catch (e) {
      alert('Error loading resource')
      pingTime.value = []
      avg.value = 0
      return
    }
  }
}
</script>

<template>
  <AppLayout>
    <h1 class="logo text-4xl">Local Ping</h1>
    <div class="flex space-x-4">
      <v-text-field
        class="mt-4"
        hide-details
        v-model="hostname"
        label="Hostname"
        placeholder="Enter hostname"
        :rules="[(v: any) => !!v || 'Item is required']"
        required
      ></v-text-field>
      <v-btn @click="runPing(hostname)" color="primary" class="mt-6"
        >Run ping</v-btn
      >
    </div>
    <p class="mt-2">
      The average response time is:
      <span class="text-2xl font-extrabold">{{ avg }}ms</span>
    </p>
    <div class="mt-2">
      <LineChart
        ref="lineRef"
        :height="300"
        :chartData="testData"
        :options="options"
      />
    </div>
  </AppLayout>
</template>
