<template class="bg-black">
  <v-app>
    <!-- <v-main style="background: radial-gradient(86.18% 86.18% at 22.41% -4.86%, #1D2228 0%, #1D2228 18.92%, #161A1F 52.03%, #000405 95.15%, #000000 99.76%);"> -->
    
      <RouterView :key="$route.fullPath" />
    <!-- </v-main> -->
  </v-app>
  <!-- <div class="h-full bg-[#A346B6] h-[10000px]">hello</div> -->
</template>

<script setup lang="ts">

// starting point will be a ship and the destination will be a planet
// the traps will be black holes
// your mission program the ship to use the best alghotithm or use your own
// obstacoles are asteroids and black holes

// you can have a game with it , where you choose to not see the path that your
// ship has gone with and place throw bomb , you win if you don t destroy your ship
// kind of the same game as the one with the ships on the sea

import { RouterView } from 'vue-router'
import {ref} from 'vue'
import AppBarVue from './ui/AppBar.vue';

const adjacencyList = new Map()

const airPorts = ref(['Tulcea','Constanta','Topolog'
,'Sibioara','Cazaneasca' , 'Biciuiesti','Rahatizant','MierlestiCotesti'])
const routes = ref([
['Tulcea','Constanta'],
['Tulcea','Rahatizant'],
['Biciuiesti','Constanta'],
['MierlestiCotesti','Cazaneasca'],
['Sibioara','MierlestiCotesti'],
['Biciuiesti','Rahatizant']
,['Topolog','Biciuiesti'],
['MierlestiCotesti','Cazaneasca'],
['Cazaneasca','Topolog'],
['Rahatizant','Sibioara']])


function addNode(airport){
  adjacencyList.set(airport,[])
  // console.log('ce se intampla maica aici',adjacencyList,'si argumentul',airport)
}

function addEdge(origin,destination){
  console.log('what is :',origin,'your mom',destination)

  console.log('hello there1111',adjacencyList.get(origin),'oh well111',destination)
  adjacencyList.get(origin).push(destination)
   console.log('hello there22222',adjacencyList.get(destination),'oh well2222',origin)
  adjacencyList.get(destination).push(origin)
}

const findStaff = ()=>{
   airPorts.value.forEach(addNode)
  //  console.log('first step 1',adjacencyList)
   routes.value.forEach(route => addEdge(...route))
      console.log('first step 2',adjacencyList)

}
// findStaff()

// const testGetBy = new Map([['hello','world']])
// console.log('ma cum asa',testGetBy.get('world'))






const adjacencyListLeaning = new Map()

const airPortsLearning = ref(['Tulcea','Constanta','Topolog'
,'Sibioara','Cazaneasca' , 'Biciuiesti','Rahatizant','MierlestiCotesti','nothing,nowHere','Bucuresti'])
const routesLearning = ref([
['Tulcea','Constanta'],
['Tulcea','Rahatizant'],
['Bucuresti','Constanta'],
['MierlestiCotesti','Cazaneasca'],
['Sibioara','MierlestiCotesti'],
['Biciuiesti','Rahatizant']
,['Topolog','Biciuiesti'],
['MierlestiCotesti','nothing,nowHere'],
['Cazaneasca','Topolog'],
['Rahatizant','Sibioara']])


function addNodeLearning(node){
  console.log('what add node',node)
    adjacencyListLeaning.set(node,[])
} 

function addEdgeLearning(firstNode,secondNode){
  console.log('what add edge',firstNode,'hey',secondNode)
   adjacencyListLeaning.get(firstNode).push(secondNode)
   adjacencyListLeaning.get(secondNode).push(firstNode)
}


function addCreateAdjacencyList(){
   airPortsLearning.value.forEach(addNodeLearning)
   routesLearning.value.forEach(edge=> addEdgeLearning(...edge))

}
addCreateAdjacencyList() // list created 
console.log('adjacency list test',adjacencyListLeaning)


function breathFirstSearch(start){
   // yea greate but lets make a variable that stores the path
   // like  Tulcea --> Rahatizant --> Sibioara 
   // so find the sortest  path to Sibioara

   const visited = new Set()

   const queue = [start] 

   let  pathTraveled:string 

    while(queue.length > 0){
        const airport = queue.shift();// mutates the queue

        const destinations = adjacencyListLeaning.get(airport)
        pathTraveled = ''

        for(const destination of destinations){
          pathTraveled += pathTraveled === '' ? destination:' --> ' + destination
       
           if(destination === start){
             console.log('you found ',start,'path traveled',pathTraveled)
      
             
           }

           if(!visited.has(destination)){
             visited.add(destination)
              queue.push(destination)
              console.log('destination is ',destination)
           }

        }
    }

}

// breathFirstSearch('Cazaneasca')


// just a test man
// const anotherTest = [[{test:'hello',num:2},{test:'hello',num:1},{test:'hello',num:4},{test:'hello',num:3}]]

// const sortThisPuppy = anotherTest[0].sort((objectA,objectB)=> objectA.num -objectB.num)



// sortThisPuppy.forEach((objectTest)=>{
//  if(objectTest.num !== 1) objectTest.test = 'hey son'
// })
// just a test man
// now anotherTest will have the test property equal with hey son , because these objects are stored in the same memory space , remember?



// testing a while loop 

// const confusing = [1,2,7]

// let maximumIsNumberThree = 17
// let whileLoopExeTimes = 0

// while(confusing.length > 0){

//    console.log('in the while loop',confusing)
    
//     if(maximumIsNumberThree >= 0 ){
   
//       confusing.push(7)
//       maximumIsNumberThree -= 1
//          console.log("i've changed",confusing,'yeah :(',maximumIsNumberThree)
//     }
//      whileLoopExeTimes += 1
//     if(maximumIsNumberThree < 0) break
   

// }

// console.log('loop has exe this many times',whileLoopExeTimes)



</script>
