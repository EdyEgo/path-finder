<script lang="ts" setup>
import {ref,onMounted,defineProps,onBeforeMount} from 'vue'
import BoardColumn from '../components/BoardColumn.vue'
import {useOptions} from '../stores/options'
import {useBoardData} from  '../stores/boardData'
const boardDataStore = useBoardData()


const props = defineProps<{
  rowColumnsList:any[]
  indexRow:number
}>()



</script>


<template>

               <tr >
               
                  <BoardColumn class="border  border-[#C572FF] column-element"  v-for="(nodeColumnObject,indexColumn) in rowColumnsList" :key="indexColumn" :indexColumn="indexColumn" :indexRow="props.indexRow" :nodeColumnObject="nodeColumnObject"/>
                  
                </tr>

</template>