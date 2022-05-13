<template>
  <AppBarAuth />
  <div class="h-screen flex items-center justify-center">
    <!-- <div
      class="flex-1 flex flex-row items-center justify-center container mx-auto"
    >
      <div class="text-black dark:text-white flex-1">
        <div class="w-96"> -->
    <slot :key="$route.fullPath" />
    <!-- </div>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import AppBarAuth from '../ui/AppBarAuth.vue'
</script>
