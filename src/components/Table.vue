<script setup lang="ts">
import * as _ from 'lodash'
const props = defineProps({
  head: Object,
  rows: Object,
  repetField: String,
  repetWithContent: String,
  useFunctionOnFieldName: String || undefined,
  useFunctionOnField: Function || undefined,
  handleItemClick: {
    type: Function,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    default: () => {}
  }
})
</script>

<template>
  <v-table class="">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-base" v-for="item in head" :key="item">
            {{ item.title }}
          </th>
        </tr>
      </thead>
      <tbody class="hover:bg-none cursor-auto">
        <span class="bg-red-400"> {{ props.row }}</span>

        <tr v-for="item in rows" :key="item">
          <td v-for="col in head" :key="col">
            {{
              col.accessor === props.useFunctionOnFieldName
                ? useFunctionOnField(_.get(item, col.accessor))
                : _.get(item, col.accessor)
            }}

            {{
              item?.providerLocation
                ? _.get(item.providerLocation, col.accessor)
                : ''
            }}

            {{
              item?.providerLocation?.provider
                ? _.get(item.providerLocation.provider, col.accessor)
                : ''
            }}

            <svg
              v-show="repetField === col.accessor"
              width="1.4em"
              height="1.4em"
              viewBox="0 0 512 512"
              class="cursor-pointer"
              @click="props.handleItemClick(item)"
            >
              <path
                fill="currentColor"
                d="M496 16L15.88 208L195 289L448 64L223 317l81 179L496 16z"
              ></path>
            </svg>
          </td>
        </tr>
      </tbody>
    </template>
  </v-table>
</template>
