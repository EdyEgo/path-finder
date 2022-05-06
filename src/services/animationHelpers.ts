import type {NodeObjectType} from '@/types/algorithms'

let previosTimeoutTime = 0
let waitTimeTillNextAnimation = 20

export const animationTimeHelper = (node:NodeObjectType,newStatus:string)=>{
     
   

    setTimeout(()=>{
        node.status = newStatus
        console.log('waiyt ')
    },previosTimeoutTime + waitTimeTillNextAnimation)

    previosTimeoutTime +=  waitTimeTillNextAnimation
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
            waitTimeTillNextAnimation = 100
         },
         superSlow:()=>{
            waitTimeTillNextAnimation = 200
         }
     }
     speeds[newSpeed]()

}