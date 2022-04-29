<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue'
import PingForm from '@/components/Ping.vue'
</script>

<template>
  <div
    class="bg-gray-700 text-white p-4 min-h-screen"
    style="
      background: radial-gradient(
        86.18% 86.18% at 22.41% -4.86%,
        #1d2228 0%,
        #1d2228 18.92%,
        #12161a 52.03%,
        #000000 99.76%
      );
    "
  >
    <div class="flex justify-space-between border-b-sm border-gray-400">
      <div>
        <h1 class="text-4xl ml-1">Cloud Ping</h1>
        <p class="mt-2 ml-1">
          Test the latency of your server from all over the world with this
          benchmark tool.
        </p>
      </div>
      <img
        class="w-[63px] h-[45px] self-center"
        src="../assets/cloudPingIcon.png"
      />
    </div>
    <PingForm></PingForm>
  </div>
</template>

<style></style>
