<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
</script>

<template>
  <v-app>
    <v-app-bar color="grey-lighten-2">
      <div class="flex justify-between w-full">
        <div class="flex">
          <span class="logo ml-4 text-2xl">AdminTools.io</span>
          <div class="ml-6">
            <v-btn @click="router.push({ name: 'dig' })">Dig</v-btn>
            <v-btn @click="router.push({ name: 'ping' })">Ping</v-btn>
            <v-btn @click="router.push({ name: 'mtr' })">Mtr</v-btn>
            <v-btn @click="router.push({ name: 'dns-propagation' })"
              >DNS Propagation</v-btn
            >
            <v-btn @click="router.push({ name: 'traceroute' })"
              >Traceroute</v-btn
            >
            <v-btn @click="router.push({ name: 'whois' })">Whois</v-btn>
          </div>
        </div>
        <v-btn
          variant="outlined"
          color="primary"
          @click="router.push({ name: 'login' })"
          >LOGIN</v-btn
        >
      </div>
    </v-app-bar>
    <v-main class="min-h-screen overflow-scroll">
      <v-card class="p-4">
        <slot />
      </v-card>
    </v-main>
  </v-app>
</template>
