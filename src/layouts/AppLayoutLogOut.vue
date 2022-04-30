<script setup lang="ts">
import { ref } from 'vue'







 function Reset() {
 
}
</script>

<template>
  <v-app>
    <v-app-bar color="grey-lighten-2">
      <span class="flex-1 logo ml-4 text-2xl">Sythwave Path Finder</span>
      <v-btn color="" type="button" @click="Reset" class="mr-4">
        Reset
      </v-btn>
    </v-app-bar>
   
    <v-main class="min-h-screen overflow-scroll">
      <!-- <v-card class="p-4"> -->
        <slot :key="$route.fullPath" />
      <!-- </v-card> -->
    </v-main>
  </v-app>
</template>