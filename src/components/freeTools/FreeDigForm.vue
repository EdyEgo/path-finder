<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import { io } from 'socket.io-client'
import { useAuth } from '@/stores/auth'

const recordType = ref('')
const hostName = ref('')
const recordTypeExpanded = ref([
  'A',
  'AAAA',
  'AFSDB',
  'ANY',
  'APL',
  'ATMA',
  'AVC',
  'CAA',
  'CDNSKEY',
  'CDS',
  'CERT',
  'CNAME',
  'CSYNC',
  'DHCID',
  'DLV',
  'DNAME',
  'DNSKEY',
  'DS',
  'EID',
  'EUI48',
  'EUI64',
  'GID',
  'GPOS',
  'HINFO',
  'HIP',
  'IPSECKEY',
  'ISDN',
  'KEY',
  'KK',
  'L32',
  'L64',
  'LOC',
  'LP',
  'MB',
  'MD',
  'MF',
  'MG',
  'MINFO',
  'MR',
  'MR',
  'MX',
  'NAPTR',
  'NID',
  'NIMLOC',
  'NINFO',
  'NS',
  'NSAP',
  'NSAP-PTR',
  'NSEC',
  'NSEC3',
  'NSEC3PARAM',
  'NULL',
  'NXT',
  'OPENPGPKEY',
  'PTR',
  'PX',
  'RKEY',
  'RP',
  'RRSIG',
  'RT',
  'SIG',
  'SINK',
  'SMIMEA',
  'SOA',
  'SPF',
  'SRV',
  'SSHFP',
  'TA',
  'TALINK',
  'TLSA',
  'TXT',
  'UID',
  'UINFO',
  'UNSPEC',
  'URI',
  'WKS'
])
// let children = recordTypes.value.concat(recordTypeExpanded.value)
// children = children.filter((item, index) => {
//   return children.indexOf(item) == index
// })
const nameServer = ref('')
const dnsValue = [
  { title: '8.8.8.8 -Google Public DNS', value: '8.8.8.8' },
  { title: '8.8.4.4 - Google Public DNS', value: '8.8.4.4' },
  {
    title: '2001:4860:4860::8888 - Google Public DNS',
    value: '2001:4860:4860::8888'
  },
  {
    title: '2001:4860:4860::8844 - Google Public DNS',
    value: '2001:4860:4860::8844'
  },
  { title: '1.1.1.1 - Cloudflare', value: '1.1.1.1' },
  { title: '1.0.0.1 - CloudFlare', value: '1.0.0.1' },
  { title: '2606:4700:4700::1111 - Cloudflare', value: '2606:4700:4700::1111' },
  { title: '2606:4700:4700::1001 - Cloudflare', value: '2606:4700:4700::1001' },
  { title: '9.9.9.9 - Quad9', value: '9.9.9.9' },
  { title: '149.112.112.112 - Quad9', value: '149.112.112.112' },
  { title: '2620:fe::fe - Quad9', value: '2620:fe::fe' },
  { title: '208.67.222.222 - OpenDNS', value: '208.67.222.222' },
  { title: '208.67.220.220 - OpenDNS', value: '208.67.220.220' },
  { title: '2620:0:ccc::2 - OpenDNS', value: '2620:0:ccc::2' },
  { title: '2620:0:ccd::2 - OpenDNS', value: '2620:0:ccd::2' },
  { title: '209.244.0.3 - Level3', value: '209.244.0.3' },
  { title: '209.244.0.4 - Level3', value: '209.244.0.4' },
  { title: '4.2.2.1 - Level3', value: '4.2.2.1' },
  { title: '4.2.2.2 - Level3', value: '4.2.2.2' },
  { title: '4.2.2.3 - Level3', value: '4.2.2.3' },
  { title: '4.2.2.4 - Level3', value: '4.2.2.4' },
  { title: '4.2.2.5 - Level3', value: '4.2.2.5' },
  { title: '4.2.2.6 - Level3', value: '4.2.2.6' },
  { title: '64.6.64.6 - Verisign', value: '64.6.64.6' },
  { title: '64.6.65.6 - Verisign', value: '64.6.65.6' },
  { title: '2620:74:1b::1:1 - Verisign', value: '2620:74:1b::1:1' },
  { title: '2620:74:1c::2:2 - Verisign', value: '2620:74:1c::2:2' },
  { title: '74.82.42.42 - Hurricane Electric', value: '74.82.42.42' },
  { title: '2001:470:20::2 - Hurricane Electric', value: '2001:470:20::2' },
  { title: '8.26.56.26  - Comodo Secure DNS', value: '8.26.56.26 ' },
  { title: '8.20.247.20 - Comodo Secure DNS', value: '8.20.247.20' },
  { title: '199.85.126.10 - Norton ConnectSafe', value: '199.85.126.10' },
  { title: '199.85.127.10 - Norton ConnectSafe', value: '199.85.127.10' },
  { title: '195.46.39.39 - SafeDNS', value: '195.46.39.39' },
  { title: '195.46.39.40 - SafeDNS', value: '195.46.39.40' },
  { title: '84.200.69.80 - DNS.WATCH', value: '84.200.69.80' },
  { title: '84.200.70.40 - DNS.WATCH', value: '84.200.70.40' },
  {
    title: '2001:1608:10:25::1c04:b12f - DNS.WATCH',
    value: '2001:1608:10:25::1c04:b12f'
  },
  {
    title: '2001:1608:10:25::9249:d69b - DNS.WATCH',
    value: '2001:1608:10:25::9249:d69b'
  },
  { title: '185.121.177.177 - OpenNIC', value: '185.121.177.177' },
  { title: '169.239.202.202 - OpenNIC', value: '169.239.202.202' },
  { title: '2a05:dfc7:5::53 - OpenNIC', value: '2a05:dfc7:5::53' },
  { title: '2a05:dfc7:5::5353 - OpenNIC', value: '2a05:dfc7:5::5353' },
  { title: '37.235.1.174 - FreeDNS', value: '37.235.1.174' },
  { title: '37.235.1.177 - FreeDNS', value: '37.235.1.177' },
  { title: '80.80.80.80 - Freenom World', value: '80.80.80.80' },
  { title: '80.80.81.81 - Freenom World', value: '80.80.81.81' },
  { title: '216.131.65.63 - StrongDNS', value: '216.131.65.63' },
  { title: '216.131.65.60 - StrongDNS', value: '216.131.65.60' },
  { title: '176.103.130.130 - AdGuard', value: '176.103.130.130' },
  { title: '176.103.130.131 - AdGuard', value: '176.103.130.131' },
  { title: '2a00:5a60::ad1:0ff - AdGuard', value: '2a00:5a60::ad1:0ff' },
  { title: '2a00:5a60::ad2:0ff - AdGuard', value: '2a00:5a60::ad2:0ff' },
  { title: '91.239.100.100 - UncensoredDNS', value: '91.239.100.100' },
  { title: '2001:67c:28a4:: - UncensoredDNS', value: '2001:67c:28a4::' },
  { title: '89.233.43.71 - UncensoredDNS', value: '89.233.43.71' },
  { title: '2a01:3a0:53:53:: - UncensoredDNS', value: '2a01:3a0:53:53::' },
  { title: '77.88.8.8 - Yandex.DNS', value: '77.88.8.8' },
  { title: '77.88.8.1 - Yandex.DNS', value: '77.88.8.1' },
  { title: '2a02:6b8::feed:0ff - Yandex.DNS', value: '2a02:6b8::feed:0ff' },
  {
    title: '2a02:6b8:0:1::feed:0ff - Yandex.DNS',
    value: '2a02:6b8:0:1::feed:0ff'
  },
  { title: '216.146.35.35 - Dyn', value: '216.146.35.35' },
  { title: '216.146.36.36 - Dyn', value: '216.146.36.36' },
  { title: '129.250.35.250 - NTT', value: '129.250.35.250' },
  { title: '129.250.35.251 - NTT', value: '129.250.35.251' },
  { title: '2001:418:3ff::53 - NTT', value: '2001:418:3ff::53' },
  { title: '2001:418:3ff::1:53 - NTT', value: '2001:418:3ff::1:53' },
  { title: '1.2.4.8 - SDNS', value: '1.2.4.8' },
  { title: '210.2.4.8 - SDNS', value: '210.2.4.8' },
  { title: '240c::6666 - IPv6 Public DNS', value: '240c::6666' },
  { title: '240c::6644 - IPv6 Public DNS', value: '240c::6644' },
  { title: '223.5.5.5 - AliDNS', value: '223.5.5.5' },
  { title: '223.6.6.6 - AliDNS', value: '223.6.6.6' },
  { title: '119.29.29.29 - Public DNS+', value: '119.29.29.29' },
  { title: '119.28.28.28 - Public DNS+', value: '119.28.28.28' },
  { title: '182.254.116.116 - Public DNS+', value: '182.254.116.116' },
  { title: '182.254.118.118 - Public DNS+', value: '182.254.118.118' },
  { title: '180.76.76.76 - BaiduDNS', value: '180.76.76.76' },
  { title: '2400:da00::6666 - BaiduDNS', value: '2400:da00::6666' },
  { title: '114.114.114.114 - 114DNS', value: '114.114.114.114' },
  { title: '114.114.115.115 - 114DNS', value: '114.114.115.115' },
  { title: '168.95.1.1 - HiNet', value: '168.95.1.1' },
  { title: '168.95.192.1 - HiNet', value: '168.95.192.1' },
  { title: '2001:b000:168::1 - HiNet', value: '2001:b000:168::1' },
  { title: '2001:b000:168::2 - HiNet', value: '2001:b000:168::2' },
  { title: '101.101.101.101 - Quad 101', value: '101.101.101.101' },
  { title: '101.102.103.104 - Quad 101', value: '101.102.103.104' },
  { title: '2001:de4::101 - Quad 101', value: '2001:de4::101' },
  { title: '2001:de4::102 - Quad 10', value: '2001:de4::102' }
]
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
  short: 'on'
}
const option = reactive({ ...initialValues })
const reset = () => {
  recordType.value = ''
  hostName.value = ''
  nameServer.value = ''
  dnsValueReference.value = ''
  Object.assign(option, initialValues)
}
const socket = ref(null)
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
    domain: hostName.value,
    workerId: 'localhost'
  }
  socket.value = io(import.meta.env.VITE_APP_WS_ENDPOINT, {
    auth: {
      token
    }
  })

  socket.value.emit('runFreeDig', data)

  socket.value.on('runFreeDigResponse', (dataSend) => {
    responseDig.value = dataSend.response
    if (socket.value !== null) {
      socket.value.disconnect(true)
      socket.value = null
    }
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
            :items="recordTypeExpanded"
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
              :items="dnsValue"
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

    <div v-if="responseDig.responseError == ''">
      <div v-for="txt in responseDig" :key="txt">
        <div v-for="t in txt" :key="t">
          <pre class="bg-black mb-4 w-full">{{ t.trim() }}</pre>
        </div>
      </div>
    </div>
  </v-form>
  <v-form>
    <div></div>
  </v-form>
</template>
