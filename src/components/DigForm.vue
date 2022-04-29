<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'
import * as constants from '../config/constants'
import { useAuth } from '@/stores/auth'

const recordType = ref('')
const hostName = ref('')
// let children = recordTypes.value.concat(recordTypeExpanded.value)
// children = children.filter((item, index) => {
//   return children.indexOf(item) == index
// })
const nameServer = ref('authorative')
// const specify = ref('')
// const specify_textArea = ref('')

const dnsValueReference = ref('')
const initialValues = {
  tcp: 'default',
  transport: 'default',
  mapped: 'default',
  nssearch: 'default',
  trace: 'default',
  recurse: 'default',
  edns: 'default',
  dnssec: 'default',
  subnet: 'default',
  cookie: 'default',
  all: 'default',
  cmd: 'default',
  question: 'default',
  answer: 'default',
  authority: 'default',
  additional: 'default',
  comments: 'default',
  stats: 'default',
  multiline: 'default',
  short: 'default'
}
const option = reactive({ ...initialValues })
const reset = () => {
  recordType.value = ''
  hostName.value = ''
  nameServer.value = ''
  dnsValueReference.value = ''
  Object.assign(option, initialValues)
}
const textOutput = ref('')
const responseDig = ref([])

const onSubmit = () => {
  textOutput.value = ''
  let valueChange = nameServer.value
  const authStore = useAuth()
  const token = authStore.token
  if (nameServer.value === 'public_DNS') {
    valueChange = dnsValueReference.value
  }
  const data = {
    nameserver: valueChange,
    option: option,
    domain: hostName.value
  }

  const socket: Socket = io(import.meta.env.VITE_APP_WS_ENDPOINT, {
    transports: ['websocket'],
    reconnectionAttempts: 3,
    auth: {
      token
    }
  })

  socket.emit('runDig', data)
  socket.on('runDigResponse', (dataSend) => {
    if (dataSend.response.responseError) {
      responseDig.value = dataSend.response.responseError
    } else {
      responseDig.value = dataSend.response.answer
    }

    // if (socket !== null) {
    socket.disconnect()
    // socket = null
    // }
  })
}

watch(dnsValueReference, () => {
  if (dnsValueReference.value !== '') {
    nameServer.value = 'public_DNS'
  }
})

watch(nameServer, () => {
  if (nameServer.value !== 'public_DNS') {
    dnsValueReference.value = ''
  }
})
</script>

<template>
  <v-form v-on:submit="onSubmit">
    <div class="grid grid-cols-2">
      <v-container class="p-4 mt-2 border-r">
        <label class="">
          Record Type
          <v-select
            hide-details
            v-model="recordType"
            label="All Records"
            v-on:transitionend="true"
            :items="constants.recordTypeExpanded"
            required
          ></v-select>
        </label>
        <label class="mt-4 block">
          Hostname or IP address
          <v-textarea
            hide-details
            auto-grow
            v-model="hostName"
            placeholder="Enter a valid hostname or ip adress"
            required
          ></v-textarea>
        </label>
        <div fluid>
          <label class="mt-4 block"> Name Server</label>
          <v-radio-group hide-details v-model="nameServer">
            <v-radio
              id="authorative"
              label="Authorative"
              value="authorative"
            ></v-radio>
            <!-- <v-radio
              v-model="tld"
              label="TLD (top-level domain)"
              value="tld"
            ></v-radio> -->
            <v-radio
              value="public_DNS"
              id="dnsValueReference"
              label="Public DNS"
            >
            </v-radio>
            <v-select
              :items="constants.dnsValue"
              hide-details
              v-model="dnsValueReference"
            ></v-select>
            <!-- <v-radio v-model="specify" label="Specify"></v-radio>
            <v-textarea v-model="specify_textArea" required></v-textarea> -->
          </v-radio-group>
          <!-- <label for="ednsInput">
            EDNS Client Subnet (optional)
            <v-text-field
              v-model="ednsInput"
              placeholder="1.2.3.4 or 1.2.3.0/24"
            ></v-text-field>
          </label> -->
        </div>
      </v-container>

      <div class="p-4">
        <div class="border-b">
          <label> Dig Option </label>
        </div>
        <div class="border-b p-2 grid grid-cols-6">
          <label for="option.tcp" class="mt-1">TCP</label>
          <v-radio-group
            v-model="option.tcp"
            class="col-span-5"
            inline
            density="comfortable"
            hide-details
          >
            <v-radio label="Default" value="default"></v-radio>
            <v-radio label="ON" value="on"></v-radio>
            <v-radio label="OFF" value="off"></v-radio>
          </v-radio-group>

          <label for="transportGroup" class="mt-1">Transport</label>
          <v-radio-group
            v-model="option.transport"
            class="col-span-5"
            inline
            density="compact"
            hide-details
          >
            <v-radio label="Default" value="default"></v-radio>
            <v-radio label="IPv4" value="ipv4"></v-radio>
            <v-radio label="IPv6" value="ipv6"></v-radio>
          </v-radio-group>

          <label for="option.mapped" class="mt-1">Mapped </label>
          <v-radio-group
            v-model="option.mapped"
            class="col-span-5"
            density="compact"
            inline
            hide-details
          >
            <v-radio label="Default" value="default"></v-radio>
            <v-radio label="ON" value="on"></v-radio>
            <v-radio label="OFF" value="off"></v-radio>
          </v-radio-group>

          <label for="option.nssearch" class="mt-1">Nssearch </label>
          <v-radio-group
            v-model="option.nssearch"
            class="col-span-5"
            density="compact"
            inline
            hide-details
          >
            <v-radio label="Default" value="default"></v-radio>
            <v-radio label="ON" value="on"></v-radio>
            <v-radio label="OFF" value="off"></v-radio>
          </v-radio-group>

          <label for="option.trace" class="mt-1">Trace</label>
          <v-radio-group
            v-model="option.trace"
            class="col-span-5"
            density="compact"
            inline
            hide-details
          >
            <v-radio label="Default" value="default"></v-radio>
            <v-radio label="ON" value="on"></v-radio>
            <v-radio label="OFF" value="off"></v-radio>
          </v-radio-group>

          <label for="option.recurse" class="mt-1">Recurse</label>
          <v-radio-group
            v-model="option.recurse"
            class="col-span-5"
            density="compact"
            inline
            hide-details
          >
            <v-radio label="Default" value="default"></v-radio>
            <v-radio label="ON" value="on"></v-radio>
            <v-radio label="OFF" value="off"></v-radio>
          </v-radio-group>

          <label for="option.edns" class="mt-1">Edns</label>
          <v-radio-group
            v-model="option.edns"
            class="col-span-5"
            density="compact"
            inline
            hide-details
          >
            <v-radio label="Default" value="default"></v-radio>
            <v-radio label="ON" value="on"></v-radio>
            <v-radio label="OFF" value="off"></v-radio>
          </v-radio-group>

          <label for="option.dnssec" class="mt-1">Dnssec</label>
          <v-radio-group
            v-model="option.dnssec"
            class="col-span-5"
            density="compact"
            inline
            hide-details
          >
            <v-radio label="Default" value="default"></v-radio>
            <v-radio label="ON" value="on"></v-radio>
            <v-radio label="OFF" value="off"></v-radio>
          </v-radio-group>

          <label for="option.subnet" class="mt-1">Subnet</label>
          <v-radio-group
            v-model="option.subnet"
            class="col-span-5"
            inline
            hide-details
          >
            <v-radio label="Default" value="default"></v-radio>
            <v-radio label="ON" value="on"></v-radio>
            <v-radio label="OFF" value="off"></v-radio>
          </v-radio-group>

          <label for="option.cookie" class="mt-1">Cookie</label>
          <v-radio-group
            v-model="option.cookie"
            class="col-span-5"
            density="compact"
            inline
            hide-details
          >
            <v-radio label="Default" value="default"></v-radio>
            <v-radio label="ON" value="on"></v-radio>
            <v-radio label="OFF" value="off"></v-radio>
          </v-radio-group>
        </div>

        <div class="p-2 grid grid-cols-6">
          <label for="option.all" class="mt-1">ALL</label>
          <v-radio-group
            v-model="option.all"
            class="col-span-5"
            density="compact"
            inline
            hide-details
          >
            <v-radio label="Default" value="default"></v-radio>
            <v-radio label="ON" value="on"></v-radio>
            <v-radio label="OFF" value="off"></v-radio>
          </v-radio-group>

          <label for="option.cmd" class="mt-1">Cmd</label>
          <v-radio-group
            v-model="option.cmd"
            class="col-span-5"
            density="compact"
            inline
            hide-details
          >
            <v-radio label="Default" value="default"></v-radio>
            <v-radio label="ON" value="on"></v-radio>
            <v-radio label="OFF" value="off"></v-radio>
          </v-radio-group>

          <label for="option.question" class="mt-1">Question </label>
          <v-radio-group
            v-model="option.question"
            class="col-span-5"
            density="compact"
            inline
            hide-details
          >
            <v-radio label="Default" value="default"></v-radio>
            <v-radio label="ON" value="on"></v-radio>
            <v-radio label="OFF" value="off"></v-radio>
          </v-radio-group>

          <label for="option.answer" class="mt-1">Answer</label>
          <v-radio-group
            v-model="option.answer"
            class="col-span-5"
            density="compact"
            inline
            hide-details
          >
            <v-radio label="Default" value="default"></v-radio>
            <v-radio label="ON" value="on"></v-radio>
            <v-radio label="OFF" value="off"></v-radio>
          </v-radio-group>

          <label for="option.authority" class="mt-1">Authority </label>
          <v-radio-group
            v-model="option.authority"
            class="col-span-5"
            density="compact"
            inline
            hide-details
          >
            <v-radio label="Default" value="default"></v-radio>
            <v-radio label="ON" value="on"></v-radio>
            <v-radio label="OFF" value="off"></v-radio>
          </v-radio-group>

          <label for="option.additional" class="mt-1">Additional</label>
          <v-radio-group
            v-model="option.additional"
            class="col-span-5"
            density="compact"
            inline
            hide-details
          >
            <v-radio label="Default" value="default"></v-radio>
            <v-radio label="ON" value="on"></v-radio>
            <v-radio label="OFF" value="off"></v-radio>
          </v-radio-group>

          <label for="authorityGroup" class="mt-1">Comments</label>
          <v-radio-group
            v-model="option.comments"
            class="col-span-5"
            density="compact"
            inline
            hide-details
          >
            <v-radio label="Default" value="default"></v-radio>
            <v-radio label="ON" value="on"></v-radio>
            <v-radio label="OFF" value="off"></v-radio>
          </v-radio-group>

          <label for="statsGroup" class="mt-1">Stats</label>
          <v-radio-group
            v-model="option.stats"
            class="col-span-5"
            density="compact"
            inline
            hide-details
          >
            <v-radio label="Default" value="default"></v-radio>
            <v-radio label="ON" value="on"></v-radio>
            <v-radio label="OFF" value="off"></v-radio>
          </v-radio-group>

          <label for="statsGroup" class="mt-1">Multiline</label>
          <v-radio-group
            v-model="option.multiline"
            class="col-span-5"
            density="compact"
            inline
            hide-details
          >
            <v-radio label="Default" value="default"></v-radio>
            <v-radio label="ON" value="on"></v-radio>
            <v-radio label="OFF" value="off"></v-radio>
          </v-radio-group>

          <label for="statsGroup" class="mt-1">Short </label>
          <v-radio-group
            v-model="option.short"
            class="col-span-5"
            density="compact"
            inline
            hide-details
          >
            <v-radio label="Default" value="default"></v-radio>
            <v-radio label="ON" value="on"></v-radio>
            <v-radio label="OFF" value="off"></v-radio>
          </v-radio-group>
        </div>
      </div>
    </div>

    <!-- <div class="">
      <label>Output</label>
      <div class="grid grid-cols-2">
        <v-checkbox
          label="Colorize the input"
          value="colorize_input"
          v-model="checkboxColorize"
        ></v-checkbox>
        <v-checkbox
          v-model="checkboxShort"
          label="Sort alphabetically"
          value="sort_alph"
        ></v-checkbox>
        <v-checkbox
          v-model="checkboxShowCommand"
          label="Show command"
          value="show_command"
        ></v-checkbox>
        <v-checkbox
          v-model="checkboxCompare"
          label="Compare result"
          value="compare_result"
        ></v-checkbox>
      </div>
    </div> -->
    <div class="text-center mb-4 mt-10">
      <v-btn color="primary" prepend-icon="mdi-search-web" type="submit">
        Dig lookup
      </v-btn>
      <v-btn @click="reset" type="submit" class="ml-10"> Reset </v-btn>
    </div>

    <div>
      <div v-for="txt in responseDig" :key="txt">
        <pre class="bg-black mb-4 w-full">{{ txt.trim() }}</pre>
      </div>
    </div>
  </v-form>
  <v-form>
    <div></div>
  </v-form>
</template>
