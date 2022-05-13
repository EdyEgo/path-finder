<script setup lang="ts">
import { ref,reactive,watchEffect } from 'vue'
import router from '@/router'
import { useAuth } from '@/stores/auth'
import {useOptions} from '../stores/options'

const drawer = ref(true)
const rail = ref(true)
const authStore = useAuth()
const optionsStore = useOptions()
const playerName = ref('UserUnkown')// make this be styled like lost signal writing
// replace picture with a AI robot
async function signUserOut() {

} 

const selectAlgorithm = reactive({
  label:'Select Algorithm',
  items:optionsStore.$state.algorithms,
  value:optionsStore.$state.selectedAlgorithm
})
const mazesAndPatterns = reactive({
  label:'Select Maze/Pattern',
  items:optionsStore.$state.patterns,
  value:optionsStore.$state.selectedPattern 
})

const viewSpeed =  reactive({
  label:'Select speed',
  items:optionsStore.$state.speeds,
  value:optionsStore.$state.selectedSpeed
})

watchEffect(()=>{
  // write to option store
  selectAlgorithm.value
  mazesAndPatterns.value
  viewSpeed.value

  optionsStore
  .changeSelectables( selectAlgorithm.value,mazesAndPatterns.value, viewSpeed.value)
})

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
      <span class="flex-1 ml-4 text-2xl logo">Path Finder</span>
      <div class="primary-actions-btn">
       <!-- <v-btn color="" type="button" class="mr-4">
        Play
      </v-btn>
       <v-btn color="" type="button" @click="signUserOut" class="mr-4">
       RESET 
      </v-btn> -->
      </div>
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
      <!--  prepend-icon="mdi-home-city" -->
      
         <v-list-item v-show="!rail"
         
          title="Select menu"
       
        ></v-list-item>
        <!-- rail --> 

          <v-list-item v-show="rail"
         
          title="Algorithm"
       
        ></v-list-item>

         <v-list-item v-show="rail"
         
          title="Pattern"
       
        ></v-list-item>
         <v-list-item v-show="rail"
         
          title="Speed"
       
        ></v-list-item>
         <!-- Algorithms -->
         
        <v-select class="overflow-hidden"  v-show="!rail"
       
          :items="selectAlgorithm.items"
          filled
          v-model="selectAlgorithm.value"
          :label="selectAlgorithm.label"
        >
         
        </v-select>

 <!-- Mazes & Patterns -->
         <!-- <v-select class="overflow-hidden" v-show="!rail"
       
          :items="mazesAndPatterns.items"
          filled
          v-model="mazesAndPatterns.value"
          :label="mazesAndPatterns.label"
        >
         
        </v-select> -->
      
    
         <!-- viewSpeed -->
           <!-- <v-select class="overflow-hidden" v-show="!rail"
       
          :items="viewSpeed.items"
          filled
          v-model="viewSpeed.value"
          :label="viewSpeed.label"
        >
         
        </v-select> -->
  


      </v-list>
    </v-navigation-drawer>
    <v-main class="min-h-screen overflow-scroll">
      <v-card class="p-4">
        <slot :key="$route.fullPath" />
      </v-card>
    </v-main>
  </v-app>
</template>



