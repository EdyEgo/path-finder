
<script setup lang="ts">
import {ref,onMounted,reactive , watchEffect} from 'vue'
import BoardColumn from '../components/BoardColumn.vue'
import BoardRow from '../components/BoardRow.vue'
import {useOptions} from '../stores/options'
import {useBoardData} from  '../stores/boardData'


 


const optionsStore = useOptions()
const boardDataStore = useBoardData()


function testAlgoritm(){
        boardDataStore.testVisualizeDjkstra()
}


const algorithmSelected =reactive({
        disabled:true,
        buttonText:optionsStore.$state.selectedAlgorithm
})

watchEffect(()=>{
        optionsStore.$state.selectedAlgorithm
        if(optionsStore.$state.selectedAlgorithm === 'No algorithm selected'){
                algorithmSelected.buttonText = 'Select Algorithm to Visualize'
                algorithmSelected.disabled = true
                return
        }
        algorithmSelected.buttonText = 'Visualize ' + optionsStore.$state.selectedAlgorithm
        algorithmSelected.disabled = false

        // algorithmSelected.buttonText = optionsStore.$state.selectedAlgorithm === 'No algorithm selected' ? 'Select Algorithm to Visualize' :'Visualize ' + optionsStore.$state.selectedAlgorithm
})

const typeNodesSelectedClass = reactive<{[key:string]:string}>({
        start:'border-transparent',
        target:'border-transparent',
        trap:'border-transparent',
        weight:'border-transparent',
        wall:'border-transparent'

})


const rowsNumber = ref(boardDataStore.$state.rowsNumber)
const grid = ref([])


onMounted(()=>{
        // create initial grid
        boardDataStore.getInitialGrid()
        grid.value = boardDataStore.$state.grid
        console.log('my grid looks very much like soo',grid.value)
})


function visualizeAlgorithm(){
        if( algorithmSelected.disabled){
        algorithmSelected.buttonText = 'Pick an algorithm '
                return 
        }
}


function changeTest(){ 
 
// let initialTimeout = 200

//         for(let i = 1;i< 20;i++){
//                 initialTimeout += 100
//                 setTimeout(()=>{
//   boardDataStore.changeColumnStatus( "1",  `${i}`,  "wall")   
  
//                 },initialTimeout)
             
//         }

}


function changeClickBoardMode(newMode:string){
   // ex: click on the type of node you wanna add on the board(ex:start node) , now when you click on the 
   // board a rocket will be added on that node 

   // changeSelectedMode
   typeNodesSelectedClass.start = ''
   typeNodesSelectedClass.target = ''
   typeNodesSelectedClass.trap= ''
   typeNodesSelectedClass.wall = ''
   typeNodesSelectedClass.weight = ''

   typeNodesSelectedClass[newMode] = 'border-black'

   optionsStore.changeSelectedMode(newMode)

}
</script>

<template>
<div class="flex flex-col gap-2 pb-2 border-b-2 legend">

<div class="title-types-container">
Node types:
</div>

<div class="flex flex-col gap-4 content-nodes-container">
<div class="flex justify-between btn-nodes-container">
<div :class="typeNodesSelectedClass.start" class="flex items-center pb-2 mx-1 transition-all border-b cursor-pointer hover:border-black ease" @click="changeClickBoardMode('start')">Start Node <div class=" mx-2 my-1  border 
 border-[#C572FF]">&#128640</div></div>

<div :class="typeNodesSelectedClass.target" class="flex items-center pb-2 mx-1 transition-all border-b cursor-pointer hover:border-black ease" @click="changeClickBoardMode('target')">Target Node <div class=" mx-2 my-1  border border-[#C572FF]">&#127919</div></div>
<div :class="typeNodesSelectedClass.trap" class="flex items-center pb-2 mx-1 transition-all border-b cursor-pointer hover:border-black ease" @click="changeClickBoardMode('bomb')">Trap Node <div class="px-1 mx-2 my-1  border border-[#C572FF]">&#9762;</div></div>
<!-- &#9875; -->
<div :class="typeNodesSelectedClass.weight" class="flex items-center pb-2 mx-1 transition-all border-b cursor-pointer hover:border-black ease" @click="changeClickBoardMode('weight')">Weighted Node <div class=" mx-2 my-1  border border-[#C572FF]">&#9875;</div></div>
<div :class="typeNodesSelectedClass.wall" class="flex items-center pb-2 mx-1 transition-all border-b cursor-pointer hover:border-black ease" @click="changeClickBoardMode('wall')">Wall Node <div class="p-2 mx-2 my-1 bg-black border border-[#C572FF]"></div></div>

</div>

<div class="flex justify-between informal-nodes-container">
<div class="flex items-center mx-1">Unvisited Node <div class="p-2 mx-2 my-1  border border-[#C572FF]"></div></div>
<div class="flex items-center mx-1">Visited Nodes 
<div class="p-2 mx-2 my-1 bg-[#C572FF] border border-[#C572FF]"></div>
<div class="p-2 mx-2 my-1 bg-red-400 border border-[#C572FF]"></div>
</div>
<div class="flex items-center mx-1">Shortest-path Node <div class="p-2 mx-2 my-1 bg-blue-400 border border-[#C572FF]"></div></div>


</div>
</div>



</div>
<div class="pt-2 board-commands">
<div class="p-2 text-center title-container">General Commands</div>
<div class="flex justify-center gap-2 general-commands-container text-md">

<div class="p-2 transition-all border rounded-sm cursor-pointer hover:bg-gray-200 ease">
 Clear Board
</div>
<div class="p-2 transition-all border rounded-sm cursor-pointer 0 hover:bg-gray-200 ease">
 Clear Walls & Weights
</div>
<div class="p-2 transition-all border rounded-sm cursor-pointer hover:bg-gray-200 ease">
Clear Path
</div>
<div @click="visualizeAlgorithm" :class="algorithmSelected.disabled ? 'hover:bg-red-700': 'hover:bg-blue-700'" class="p-2 text-white transition-all bg-blue-600 border rounded-sm cursor-pointer ease">
{{algorithmSelected.buttonText}}
</div>
</div>


</div>

<!-- <div class="flex">
  Add Trap <div class="icon-container">&#9762;</div>
</div> -->
<button @click="testAlgoritm">Test Djkstra Algorithm</button>
<button @click="changeTest" class="border cursor-pointer border-dark-800 hover:bg-black hover:text-white">Test create one wall line</button>
        <table class="w-[97%]">
                <tbody v-if="grid.length > 0">
             
              
                <!-- <BoardRow  :class="`row-${indexRow}`"  v-for="indexRow in rowsNumber" :key="indexRow" :indexRow="indexRow"/> -->
   
     <!-- grid ex grid array [row[node{},node{}],row[node{},node{}]] -->
                        <BoardRow  :class="`row-${indexRow}`"  v-for="(currentRow,indexRow) in grid" :key="indexRow" :indexRow="indexRow" :rowColumnsList="currentRow"/>
                </tbody>
        </table>
</template>

<style>


</style>