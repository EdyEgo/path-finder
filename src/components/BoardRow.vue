<script lang="ts" setup>
import {ref,onMounted,defineProps,onBeforeMount} from 'vue'
import BoardColumn from '../components/BoardColumn.vue'
import {useOptions} from '../stores/options'
import {useBoardData} from  '../stores/boardData'
const boardDataStore = useBoardData()


const props = defineProps<{
  
  indexRow:number
}>()


const columnsNumber = ref(boardDataStore.$state.columnsNumber)
</script>


<template>
               <tr >
                 
                  <BoardColumn class="border  border-[#C572FF] p-[1%] "  v-for="indexColumn in columnsNumber" :key="indexColumn" :indexColumn="indexColumn" :indexRow="props.indexRow"/>
                </tr>

</template>