
<script setup lang="ts">
import {ref,onMounted,reactive} from 'vue'
import BoardColumn from '../components/BoardColumn.vue'
import {useOptions} from '../stores/options'
 

const optionsStore = useOptions()

const wallsStatus = ref(optionsStore.$state.wallStatus)

const rowsNumber = ref(21)
const columnsNumber = ref(32)


// {[key:number]:{[key:number]:{wall:string,bomb:string}}}
const columnsWithObstacles = reactive
<any>({
  
  // ex rowNumber:columnNumber: 
  //co1:{1:{wall:'if there is a wall then add here a style',bomb:false,}
    "10":{"5":{wall:'bg-black',bomb:''}}
})


function removeObstacle(indexRow:number,indexColumn:number){ 

        const indexRowString = indexRow.toString()
    const indexColumnString = indexColumn.toString()

    //  if(columnsWithObstacles[indexRowString] !== undefined && columnsWithObstacles[indexRowString][indexColumnString] !== undefined){
    //     // remove obstacle
      
    //     return 
    // }
}

function addObstacle(indexRow:number,indexColumn:number,obstacleObject:{wall:string,bomb:string}){
    const indexRowString = indexRow.toString()
    const indexColumnString = indexColumn.toString()
 console.log('obs')
 if(typeof columnsWithObstacles[indexRowString] === 'object'){
 columnsWithObstacles[indexRowString][indexColumnString] = obstacleObject
 console.log('adding obstacle1',columnsWithObstacles)
 return 
 }
   
columnsWithObstacles[indexRowString] = {}
columnsWithObstacles[indexRowString][indexColumnString] = obstacleObject
    console.log('adding obstacle2',columnsWithObstacles)
}


// function addClickEventFunctionColumn(){
//    if(wallsStatus.value) return wallsStatus
// }

onMounted(()=>{
 
   
 if(screen.width > 790){
      rowsNumber.value = 28
      columnsNumber.value = 75
 }
})


function paintColumn(indexRow:number,indexColumn:number){
  
    const indexRowString = indexRow.toString()
    const indexColumnString = indexColumn.toString()

      console.log('ce plm','type',columnsWithObstacles[indexRowString],'aa',)
  if(columnsWithObstacles[indexRowString] !== undefined && columnsWithObstacles[indexRowString][indexColumnString] !== undefined){
      return columnsWithObstacles[indexRowString][indexColumnString].wall
  }
  return ''

return columnsWithObstacles[1][1].wall

}

//columnsWithObstacles[indexRow][indexColumn] || ''

</script>

<template>
        <table class="w-[97%]">
                <tbody>
                <tr :class="`row-${indexRow}`"  v-for="indexRow in rowsNumber">
                  <!-- <td @click="()=> addObstacle(indexRow,indexColumn,{bomb:'',wall:'bg-black'})" class="border  border-[#C572FF] p-[1%] " :class="[`column-${indexColumn}`,paintColumn(indexRow, indexColumn)]" v-for="indexColumn in columnsNumber">
                   
                  </td> -->
                  <BoardColumn class="border  border-[#C572FF] p-[1%] "  v-for="indexColumn in columnsNumber"/>
                </tr>
                </tbody>
        </table>
</template>

<style>


</style>