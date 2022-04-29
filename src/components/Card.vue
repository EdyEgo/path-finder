<script setup lang="ts">
defineProps({
  title: String,
  subtitle: String,
  content: String
})
</script>

<template v-slot:default>
  <div class="p-4">
    <v-card>
      <!-- <v-card-img>
    <v-img src="..." />
  </v-card-img> -->

      <!-- <v-card-media>
    <v-img src="..." />
  </v-card-media> -->

      <v-card-header>
        <!-- <v-card-avatar>
      <v-avatar image="...">
    </v-card-avatar> -->

        <v-card-header-text>
          <v-card-title>{{ title }}</v-card-title>

          <v-card-subtitle class="text-base font-medium">{{
            subtitle
          }}</v-card-subtitle>
        </v-card-header-text>

        <!-- <v-card-avatar>
      <v-avatar icon="...">
    </v-card-avatar> -->
      </v-card-header>

      <v-card-text>{{ content }}</v-card-text>

      <!-- <v-card-actions>
    <v-btn>Action 1</v-btn>

    <v-btn>Action 2</v-btn>
  </v-card-actions> -->
    </v-card>
  </div>
</template>
