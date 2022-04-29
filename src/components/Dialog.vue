<script setup lang="ts">
defineProps({
  show: Boolean,
  title: String
})
</script>
<template>
  <v-dialog
    v-model="show"
    fullscreen
    scrollable
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <div>
          <v-btn dark icon @click="$emit('closeDialog')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <slot></slot>
    </v-card>
  </v-dialog>
</template>

<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.2s ease-in-out;
}
</style>
