<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const props: any = defineProps({
  response: {}
})
const testRegex = /^(\s?)+([a-zA-Z\s])+(:)(\s)+([a-zA-Z0-9]|[:/\.-\s\+@,&])+$/gm
const nlRegex = /[\n\r]+/g
const spaceRegex = /[\s]+/g

const arrayInformations = ref<any>([])
const flattenDeep = (arr: any) =>
  arr.reduce(
    (flat: any, toFlatten: any) =>
      flat.concat(
        Array.isArray(toFlatten) ? flattenDeep(toFlatten) : toFlatten
      ),
    []
  )
const checkDomain = () => {
  arrayInformations.value = []
  let arrayKeys: string = ''
  if (props.response?.length <= 0) return ''

  const responseWhois = props.response
    .toString()
    .match(testRegex)
    .map((line: any) => line.replace(nlRegex, '|').split('|'))

  const jsonObject = flattenDeep(responseWhois)
    .filter((l: any) => l.length)
    .map((l: any) => l.replace(spaceRegex, ' ').trim())
    .map((line: any) => line.split(':'))
    .reduce((object: any, array: any) => {
      const key = array.shift().replace(spaceRegex, '')
      const value = array.join(':').trim()

      if (typeof object[key] !== 'undefined' && !Array.isArray(object[key]))
        object[key] = [object[key]]
      object[key] = Array.isArray(object[key])
        ? object[key]
            .map((v: any) => v.toLowerCase())
            .includes(value.toLowerCase())
          ? object[key].length === 1
            ? object[key][0]
            : object[key]
          : [...object[key], value]
        : value
      return object
    }, [])

  Object.entries(jsonObject).forEach(([key, value]) => {
    arrayInformations.value.push(`${key}: ${value}`)
  })
}
watchEffect(() => {
  checkDomain()
})
</script>

<template>
  <div class="bg-gray-200 p-4 rounded-md text-xl">
    <label for="" class="logo">Parsed informations</label>
    <table class="min-w-full divide-y divide-gray-300">
      <tbody class="bg-gray-50">
        <tr
          v-for="t in arrayInformations"
          :key="t"
          class="flex border rounded-sm"
        >
          <th
            scope="col"
            class="py-1.5 pl-4 pr-3 text-left text-md font-semibold text-gray-900 sm:pl-6"
          >
            <span class="">{{ t }}</span>
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>
