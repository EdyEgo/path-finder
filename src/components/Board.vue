
<script setup lang="ts">
import {ref,onMounted,reactive , watchEffect} from 'vue'
import BoardColumn from '../components/BoardColumn.vue'
import BoardRow from '../components/BoardRow.vue'
import {useOptions} from '../stores/options'
import {useBoardData} from  '../stores/boardData'

const optionsStore = useOptions()
const boardDataStore = useBoardData()



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
const columnsNumber = ref(boardDataStore.$state.columnsNumber)

function visualizeAlgorithm(){
        if( algorithmSelected.disabled){
        algorithmSelected.buttonText = 'Pick an algorithm '
                return 
        }
}


function changeTest(){ 
 
let initialTimeout = 200

        for(let i = 1;i< 20;i++){
                initialTimeout += 100
                setTimeout(()=>{
  boardDataStore.changeColumnStatus( "1",  `${i}`,  "wall")   
  
                },initialTimeout)
             
        }

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
<div class="legend  border-b-2 pb-2 flex flex-col gap-2">

<div class="title-types-container">
Node types:
</div>

<div class="content-nodes-container flex flex-col gap-4">
<div class="btn-nodes-container flex justify-between">
<div :class="typeNodesSelectedClass.start" class="flex mx-1 items-center cursor-pointer  pb-2 border-b  hover:border-black transition-all ease" @click="changeClickBoardMode('start')">Start Node <div class=" mx-2 my-1  border 
 border-[#C572FF]">&#128640</div></div>

<div :class="typeNodesSelectedClass.target" class="flex mx-1 items-center cursor-pointer pb-2 border-b  hover:border-black transition-all ease" @click="changeClickBoardMode('target')">Target Node <div class=" mx-2 my-1  border border-[#C572FF]">&#127919</div></div>
<div :class="typeNodesSelectedClass.trap" class="flex mx-1 items-center cursor-pointer pb-2 border-b  hover:border-black transition-all ease" @click="changeClickBoardMode('bomb')">Trap Node <div class="px-1 mx-2 my-1  border border-[#C572FF]">&#9762;</div></div>
<!-- &#9875; -->
<div :class="typeNodesSelectedClass.weight" class="flex mx-1 items-center cursor-pointer pb-2 border-b hover:border-black transition-all ease" @click="changeClickBoardMode('weight')">Weighted Node <div class=" mx-2 my-1  border border-[#C572FF]">&#9875;</div></div>
<div :class="typeNodesSelectedClass.wall" class="flex mx-1 items-center cursor-pointer pb-2 border-b hover:border-black transition-all ease" @click="changeClickBoardMode('wall')">Wall Node <div class="p-2 mx-2 my-1 bg-black border border-[#C572FF]"></div></div>

</div>

<div class="informal-nodes-container flex  justify-between">
<div class="flex mx-1 items-center">Unvisited Node <div class="p-2 mx-2 my-1  border border-[#C572FF]"></div></div>
<div class="flex mx-1 items-center">Visited Nodes 
<div class="p-2 mx-2 my-1 bg-[#C572FF] border border-[#C572FF]"></div>
<div class="p-2 mx-2 my-1 bg-red-400 border border-[#C572FF]"></div>
</div>
<div class="flex mx-1 items-center">Shortest-path Node <div class="p-2 mx-2 my-1 bg-blue-400 border border-[#C572FF]"></div></div>


</div>
</div>



</div>
<div class="board-commands pt-2">
<div class="title-container text-center p-2">General Commands</div>
<div class="general-commands-container flex gap-2 justify-center text-md">

<div class="p-2 border rounded-sm cursor-pointer hover:bg-gray-200 ease transition-all">
 Clear Board
</div>
<div class="p-2 border rounded-sm 0 cursor-pointer hover:bg-gray-200 ease transition-all">
 Clear Walls & Weights
</div>
<div class="p-2 border rounded-sm  cursor-pointer hover:bg-gray-200 ease transition-all">
Clear Path
</div>
<div @click="visualizeAlgorithm" :class="algorithmSelected.disabled ? 'hover:bg-red-700': 'hover:bg-blue-700'" class="p-2 border rounded-sm bg-blue-600 text-white  cursor-pointer  ease transition-all">
{{algorithmSelected.buttonText}}
</div>
</div>


</div>

<!-- <div class="flex">
  Add Trap <div class="icon-container">&#9762;</div>
</div> -->

<button @click="changeTest" class="border-dark-800 border cursor-pointer hover:bg-black hover:text-white">Test create one wall line</button>
        <table class="w-[97%]">
                <tbody>
             

                <BoardRow  :class="`row-${indexRow}`"  v-for="indexRow in rowsNumber" :key="indexRow" :indexRow="indexRow"/>
                </tbody>
        </table>
</template>

<style>


</style>