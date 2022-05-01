<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import { useAuth } from '@/stores/auth'

const drawer = ref(true)
const rail = ref(false)
const authStore = useAuth()
const playerName = ref('UserUnkown')// make this be styled like lost signal writing
// replace picture with a AI robot
async function signUserOut() {

} 



// <template>
//   <v-app>
//     <v-app-bar color="grey-lighten-2">
//       <span class="flex-1 ml-4 text-2xl logo">Sythwave Path Finder</span>
//       <v-btn color="" type="button" @click="Reset" class="mr-4">
//         Reset
//       </v-btn>
//     </v-app-bar>
   
//     <v-main class="min-h-screen overflow-scroll">
//       <!-- <v-card class="p-4"> -->
//         <slot :key="$route.fullPath" />
//       <!-- </v-card> -->
//     </v-main>
//   </v-app>
// </template>
</script>

<template>
  <v-app>
    <v-app-bar color="grey-lighten-2">
      <span class="flex-1 ml-4 text-2xl logo">Sythwave Path Finder</span>
      <v-btn color="" type="button" @click="signUserOut" class="mr-4">
       RESET 
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
    >
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/men/15.jpg"
        :title="playerName"
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
       
      </v-list>
    </v-navigation-drawer>
    <v-main class="min-h-screen overflow-scroll">
      <v-card class="p-4">
        <slot :key="$route.fullPath" />
      </v-card>
    </v-main>
  </v-app>
</template>



