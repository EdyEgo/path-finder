<script lang="ts" setup>
import {ref,onMounted,defineProps} from 'vue'
import BoardColumn from '../components/BoardColumn.vue'
import {useOptions} from '../stores/options'
import {useBoardData} from  '../stores/boardData'
const boardDataStore = useBoardData()


const props = defineProps<{
  
  indexRow:number
}>()

const stringedIndexRow = props.indexRow.toString()

onMounted(() => {
    boardDataStore.createInitRowObject(stringedIndexRow)
})
//:class="`row-${indexRow}`"  v-for="indexRow in rowsNumber"
// const rowsNumber = ref(boardDataStore.$state.rowsNumber)
const columnsNumber = ref(boardDataStore.$state.columnsNumber)
</script>


<template>
               <tr >
                  <!-- <td @click="()=> addObstacle(indexRow,indexColumn,{bomb:'',wall:'bg-black'})" class="border  border-[#C572FF] p-[1%] " :class="[`column-${indexColumn}`,paintColumn(indexRow, indexColumn)]" v-for="indexColumn in columnsNumber">
                   
                  </td> -->
                  <BoardColumn class="border  border-[#C572FF] p-[1%] "  v-for="indexColumn in columnsNumber" :key="indexColumn" :indexColumn="indexColumn" :indexRow="indexRow"/>
                </tr>

</template>