import type {NodeObjectType} from '@/types/algorithms'

let previosTimeoutTime = 0
let waitTimeTillNextAnimation = 20

export const animationTimeHelper = (node:NodeObjectType,newStatus:string,noAnimation:boolean | undefined)=>{ // returns the time that the last node is gonna be animated
     // callback is used for example to make the action buttons active again
   
    if(noAnimation === undefined){
      setTimeout(()=>{
         node.status = newStatus
     
     },previosTimeoutTime + waitTimeTillNextAnimation)
     previosTimeoutTime +=  waitTimeTillNextAnimation

     return previosTimeoutTime
    } 
  

    node.status = newStatus
    return previosTimeoutTime
}

export const changeAnimationSpeed = (newSpeed:string)=>{
     const speeds:{[key:string]:()=>void} = {
         fast:()=>{
            waitTimeTillNextAnimation = 20
         },
         medium:()=>{
            waitTimeTillNextAnimation = 50
         },
         slow:()=>{
            waitTimeTillNextAnimation = 800
         },
         superSlow:()=>{
            waitTimeTillNextAnimation = 200
         }
     }
     speeds[newSpeed]()

}

export const resetAnimationPreviosTime = ()=>{
    previosTimeoutTime = 0
}