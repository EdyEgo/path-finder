<script lang="ts" setup>
import {ref , defineProps} from 'vue'
import {useBoardData} from '../stores/boardData'

const boardStore = useBoardData()

const props = defineProps<{
   indexColumn:number,
  indexRow:number
}>()

const columnIndex = ref('column-' + props.indexColumn.toString())
console.log(columnIndex.value,'wtrh')
const columnAspect = ref('')

function changeColumnAspect(){
     columnAspect.value  ='bg-black'
}
</script>

<template>
<!-- @mouseenter="changeColumnAspect" -->
  <td  @click="changeColumnAspect" :class="[columnAspect,columnIndex]" >
                   
                  </td>
</template>