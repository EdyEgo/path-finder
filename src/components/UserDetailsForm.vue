<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import moments from 'moment-timezone'
const timeZones = [...moments.tz.names()]

const emit = defineEmits(['closeDialog'])
const dialog = ref(false)

const props = defineProps({
  show: Boolean,
  user: Object,
  changeUser: {
    type: Function,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    default: () => {}
  }
})
const userRoles = ref(['admin', 'member', 'support'])

const firstName = ref(props.user.firstName)
const lastName = ref(props.user.lastName)
const email = ref(props.user.email)
const userId = ref(props.user.id)
const userRole = ref(props.user.role)
const timezone = ref(props.user.timezone)

function onEdit() {
  let result = confirm('Are you sure you want to edit this user?')
  if (result === true) {
    props.changeUser(
      {
        id: userId.value,
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        role: userRole.value,
        timezone: timezone.value
      },
      userId.value
    )
    emit('closeDialog')
  }
}
</script>

<template>
  <div class="p-4 w-[50%] mx-auto">
    <v-form>
      <div class="">
        <v-text-field
          v-model="firstName"
          label="User Name"
          placeholder="Enter the user name"
        ></v-text-field>
        <v-text-field
          v-model="lastName"
          label="User Name"
          placeholder="Enter the user name"
        ></v-text-field>
        <v-text-field
          v-model="email"
          label="User Email"
          placeholder="Enter the providers website"
        ></v-text-field>
        <v-select
          v-model="userRole"
          label="User Role"
          :items="userRoles"
        ></v-select>
        <v-select
          :items="timeZones"
          v-model="timezone"
          label="User TimeZone"
        ></v-select>
        <div class="flex flex-row justify-between">
          <v-btn color="green" v-bind="props" type="button" @click="onEdit">
            Save changes
          </v-btn>
        </div>
      </div>
    </v-form>
  </div>
</template>
