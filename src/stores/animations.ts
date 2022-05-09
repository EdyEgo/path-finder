import { defineStore } from 'pinia'
import type {NodeObjectType} from '@/types/algorithms'
import {animationTimeHelper} from '@/services/animationHelpers'

export const useAnimationHelper = defineStore({
  id: 'animationHelper',

  state: () => {
    return <
      {
         waitTimeTillNextAnimation:number
        previosTimeoutTime:number
      }
    >{
       waitTimeTillNextAnimation : 20,
       previosTimeoutTime : 0
    }
  },

  persist: true,

  getters: {},

  actions: {
      animateNodeChange(node:NodeObjectType,newStatus:string){
       
        animationTimeHelper(node,newStatus,this.previosTimeoutTime,this.waitTimeTillNextAnimation)
        this.previosTimeoutTime +=  this.waitTimeTillNextAnimation // change the next wait time
      }
  }
})
