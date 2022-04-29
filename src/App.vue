<template>
  <v-app>
    <v-main style="background: radial-gradient(86.18% 86.18% at 22.41% -4.86%, #1D2228 0%, #1D2228 18.92%, #161A1F 52.03%, #000405 95.15%, #000000 99.76%);">
      
      <RouterView :key="$route.fullPath" />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppBarVue from './ui/AppBar.vue';
</script>
