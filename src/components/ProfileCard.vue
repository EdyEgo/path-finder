<script setup lang="ts">
const props = defineProps({
  name: String,
  phone: String,
  email: String,
  address: String
})
</script>

<template>
  <div class="p-4">
    <v-row justify="center">
      <v-col cols="12" sm="8">
        <v-card>
          <v-card-title class="cyan darken-1">
            <span class="px-6 text-h5 white--text">{{ name }}</span>

            <v-spacer></v-spacer>

            <v-btn dark icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>

            <v-btn dark icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-card-title>

          <v-list>
            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-action>
                <v-icon class="">mdi-phone</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title class="px-6">{{ phone }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-email</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title class="px-6">{{ email }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-map-marker</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title class="px-6">{{
                  address
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
