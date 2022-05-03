<script lang="ts" setup>
import {ref , defineProps,onMounted,watchEffect} from 'vue'
import {useBoardData} from '../stores/boardData'
import {useOptions} from '../stores/options'

const boardStore = useBoardData()
const optionsStore = useOptions()

const props = defineProps<{
   indexColumn:number,
  indexRow:number
}>()

const clickModeStatus = ref()

 watchEffect(() => {
   optionsStore.selectedMode
   clickModeStatus.value = optionsStore.selectedMode
 })

const stringedIndexColumn = props.indexColumn.toString()
const stringedIndexRow = props.indexRow.toString()
const columnIndex = ref('column-' + props.indexColumn.toString())
const columnAspect = ref<string>('')

onMounted(() => {

boardStore.createInitialRowWithColumnInfo(stringedIndexRow,stringedIndexColumn)

  watchEffect(() => {
 
   boardStore.$state.columnsInfo[stringedIndexRow][stringedIndexColumn].status// watch the status
    columnAspect.value  = boardStore.$state.columnsInfo[stringedIndexRow][stringedIndexColumn].status
 })

})




function changeColumnStatus(){
  // here we gonna look at the options too see what modude is selected(ex wall , blackHole/bomb)
  // and on click or on hover or on click keept pressed change the column object and add that style to  
  // the columnAspect 
 boardStore.changeColumnStatus(stringedIndexRow,stringedIndexColumn,clickModeStatus.value)

columnAspect.value = clickModeStatus.value
}




</script>

<template>
<!-- @mouseenter="changeColumnAspect" -->
  <td  :class="[columnAspect,columnIndex]" @click="changeColumnStatus">
                   
                  </td>
</template>

<style scoped>

.wall{
     background-color: black;
}

.void{
  background-color: blue;
}

</style>