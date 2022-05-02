<script lang="ts" setup>
import {ref , defineProps,onMounted} from 'vue'
import {useBoardData} from '../stores/boardData'

const boardStore = useBoardData()
//saveColumnsInfo(rowIndex:,columnIndex,columnInfo:) 
const props = defineProps<{
   indexColumn:number,
  indexRow:number
}>()

const stringedIndexColumn = props.indexColumn.toString()
const stringedIndexRow = props.indexRow.toString()
onMounted(() => {
//  boardStore
//  .saveColumnsInfo(props.indexRow.
//  toString(),props.indexColumn.toString(),{className:'clean',status:'clean'})
//  boardStore.createInitialRowWithColumnInfo(stringedIndexRow,stringedIndexColumn)
boardStore.createInitColumnObject(stringedIndexRow,stringedIndexColumn)
})

const columnIndex = ref('column-' + props.indexColumn.toString())

const columnAspect = ref('')//boardStore.$state.columnsInfo[stringedIndexRow][stringedIndexColumn].className)

// function changeColumnAspect(){
//      columnAspect.value  ='bg-black'
// }


function columnStatus(status:string,className:string){
 boardStore
 .saveColumnsInfo(props.indexRow.
 toString(),props.indexColumn.toString(),{className,status})
}

</script>

<template>
<!-- @mouseenter="changeColumnAspect" -->
  <td  :class="[columnAspect,columnIndex]" >
                   
                  </td>
</template>