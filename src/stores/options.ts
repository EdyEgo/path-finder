import { defineStore } from 'pinia'


export const useOptions = defineStore({
  id: 'blackLists',

  state: () => {
    return <
      {
       wallStatus:boolean
       trapStatus:boolean
      }
    >{
      wallStatus:true,
      trapStatus:false
    }
  },

  persist: true,

  getters: {},

  actions: {
  
    
    commandStateWall(wallState:boolean){
      this.wallStatus = wallState
    },
    commandTrapStatus(bombState:boolean){
      this.trapStatus = bombState
    }
  }
})
