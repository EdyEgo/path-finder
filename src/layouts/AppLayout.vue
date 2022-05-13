<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import { useAuth } from '@/stores/auth'

const drawer = ref(true)
const rail = ref(false)

const authStore = useAuth()
const user = authStore.$state.user
const userIdentification = user.firstName + ' ' + user.lastName
const isAdmin = user && user.role === 'admin'

async function signUserOut() {
  await authStore.signOut()
  router.push('/ping')
}
</script>

<template>
  <v-app>
    <v-app-bar color="grey-lighten-2">
      <span class="flex-1 logo ml-4 text-2xl">AdminTools.io</span>
      <v-btn color="" type="button" @click="signUserOut" class="mr-4">
        Sign Out
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
    >
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
        :title="userIdentification"
      >
        <template v-slot:append>
          <v-btn
            variant="text"
            icon="mdi-chevron-left"
            @click.stop="rail = true"
          ></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-home-city"
          title="Dashboard"
          value="dashboard"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-earth"
          title="Providers"
          value="providers"
          v-if="isAdmin"
          @click="router.push({ name: 'admin_providers' })"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-server"
          title="Workers"
          value="workers"
          v-if="isAdmin"
          @click="router.push({ name: 'admin_workers' })"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-server-security"
          title="Black Lists"
          value="blackLists"
          v-if="isAdmin"
          @click="router.push({ name: 'admin_black-lists' })"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account-group-outline"
          title="Clients"
          value="clients"
          v-if="isAdmin"
          @click="router.push({ name: 'admin_users' })"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-cloud-search"
          title="Dig"
          value="dig"
          @click="router.push({ name: 'app_dig' })"
        >
        </v-list-item>
        <v-list-item
          prepend-icon="mdi-file-table-box-multiple"
          title="DNS Propagation"
          value="dnsPropagation"
          @click="router.push({ name: 'app_dns-propagation' })"
        >
        </v-list-item>
        <v-list-item
          prepend-icon="mdi-home-export-outline"
          title="Local Ping"
          value="local-ping"
          @click="router.push({ name: 'app_local-ping' })"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-antenna"
          title="Ping"
          value="ping"
          @click="router.push({ name: 'app_ping' })"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-magnify"
          title="WhoIs"
          value="whoIs"
          @click="router.push({ name: 'app_whois' })"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-router-wireless"
          title="Traceroute "
          value="traceRoute"
          @click="router.push({ name: 'app_traceroute' })"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-file-table-box-multiple"
          title="MTR"
          value="mtrTool"
          @click="router.push({ name: 'app_mtr' })"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="min-h-screen overflow-scroll">
      <v-card class="p-4">
        <slot :key="$route.fullPath" />
      </v-card>
    </v-main>
  </v-app>
</template>
