import { defineStore } from 'pinia'


export const useOptions = defineStore({
  id: 'options',

  state: () => {
    return <
      {
       wallStatus:boolean
       trapStatus:boolean
       selectedMode:string
      }
    >{
      selectedMode:"wall"
    }
  },

  // persist: true,

  getters: {},

  actions: {
  
    changeSelectedMode(newMode:string){
      this.selectedMode = newMode
    }
    
  }
})
