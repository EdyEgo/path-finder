<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import TraceRoute from '@/components/TraceRoute.vue'
</script>

<template>
  <AppLayout class="overflow-auto">
    <div class="logo text-4xl mb-4">Traceroute</div>

    <TraceRoute />
  </AppLayout>
</template>
