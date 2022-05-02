<script lang="ts" setup>
import {ref} from 'vue'
const columnAspect = ref('')
function changeColumnAspect(){
     columnAspect.value  ='bg-black'
}
</script>

<template>
<!-- @mouseenter="changeColumnAspect" -->
  <td  @click="changeColumnAspect" :class="columnAspect">
                   
                  </td>
</template>