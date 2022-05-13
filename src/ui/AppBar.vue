<template>
  <div
    class="bg-whiteop max-w-full h-[52px] drop-shadow-[0_0px_16px_rgba(0, 0, 0, 0.5)]"
  >
    <div class="px-[30px] py-[5px] h-full">
      <div class="grid grid-cols-3 h-full">
        <!--Left Header-->
        <div class="flex justify-start">
          <div class="grid grid-cols-2">
            <div class="pr-[10px]">
              <div class="flex items-center h-full">
                <img src="../assets/companyIcon.svg" />
                <div>
                  <Listbox as="div" v-model="selected">
                    <div class="relative">
                      <ListboxButton
                        class="relative w-full bg-transparent border-0 rounded-md pl-3 pr-10 text-left cursor-pointer text-[#E1E2E2] hover:text-[#FB8122] sm:text-[16px]"
                      >
                        <span class="flex items-center">
                          <span class="ml-3 block truncate">{{
                            selected.name
                          }}</span>
                        </span>
                        <span
                          class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                        >
                          <svg
                            width="11"
                            height="7"
                            viewBox="0 0 11 7"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            class="stroke-[#FB8122]"
                          >
                            <path
                              d="M1 1L5.5 6L10 1"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </span>
                      </ListboxButton>

                      <transition
                        leave-active-class="transition ease-in duration-100"
                        leave-from-class="opacity-100"
                        leave-to-class="opacity-0"
                      >
                        <ListboxOptions
                          class="absolute z-50 mt-1 w-full bg-[#2D3134] rounded-[6px] shadow-lg max-h-56 py-1 text-base sm:text-[16px]"
                        >
                          <ListboxOption
                            as="template"
                            v-for="person in people"
                            :key="person.id"
                            :value="person"
                            v-slot="{ active, selected }"
                          >
                            <li
                              :class="[
                                active ? 'text-white ' : 'text-[#E1E2E2]',
                                'cursor-default select-none relative py-2 pl-3 pr-9'
                              ]"
                            >
                              <div class="flex items-center">
                                <span
                                  :class="[
                                    selected
                                      ? 'text-[#FB8122] '
                                      : ' font-normal',
                                    'ml-3 block truncate'
                                  ]"
                                >
                                  {{ person.name }}
                                </span>
                              </div>

                              <span
                                v-if="selected"
                                :class="[
                                  active ? 'text-white' : 'text-indigo-600',
                                  'absolute inset-y-0 right-0 flex items-center pr-4'
                                ]"
                              >
                              </span>
                            </li>
                          </ListboxOption>
                        </ListboxOptions>
                      </transition>
                    </div>
                  </Listbox>
                </div>
              </div>
            </div>
            <div class="flex">
              <div class="bg-[#E1E2E2] w-[1px] h-[42px]"></div>
              <div class="ml-[14px] flex items-center h-full">
                <img src="../assets/chatIcon.svg" />
                <img src="../assets/emailIcon.svg" class="ml-[14px]" />
              </div>
            </div>
          </div>
        </div>
        <!--Logo-->
        <div class="flex justify-center">
          <div class="flex items-center">
            <img src="../assets/logo.svg" />
          </div>
        </div>
        <!--Right Header-->
        <div class="flex justify-end">
          <div class="flex items-center">
            <img src="../assets/notificationsBell.svg" />
            <img src="../assets/fullscreen.svg" class="ml-[20px]" />
            <div>
              <Listbox as="div" v-model="selected">
                <div class="relative">
                  <ListboxButton
                    class="relative w-full bg-transparent border-0 rounded-md text-left cursor-pointer text-[#E1E2E2] hover:text-[#FB8122] sm:text-[16px]"
                  >
                    <div class="flex items-center">
                      <div
                        class="rounded-[6px] ml-[14px] border border-white overflow-hidden w-[42px] h-[42px]"
                      >
                        <img src="../assets/profilePhoto.png" />
                      </div>
                      <div class="ml-[14px]">
                        <p
                          class="font-normal text-[20px] leading-[80%] text-[#E1E2E2]"
                        >
                          Cristian O
                        </p>
                        <div class="flex mt-[3px]">
                          <p
                            class="text-[14px] leading-[80%] text-[#E1E2E2] opacity-50"
                          >
                            Credit ~
                          </p>
                          <p
                            class="text-[14px] leading-[80%] text-[#E1E2E2] opacity-50"
                          >
                            $28
                          </p>
                          <img src="../assets/info.svg" class="ml-[3px]" />
                        </div>
                      </div>
                    </div>
                  </ListboxButton>

                  <transition
                    leave-active-class="transition ease-in duration-100"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                  >
                    <ListboxOptions
                      class="absolute z-50 mt-1 w-full bg-[#2D3134] rounded-[6px] shadow-lg max-h-56 py-1 text-base sm:text-[16px]"
                    >
                      <ListboxOption as="template" v-slot="{ active }">
                        <li class="cursor-default select-none relative flex">
                          <div
                            :class="[
                              active ? 'block' : 'hidden',
                              'h-[29px] w-[2px] bg-[#FB8122] my-2 rounded-r-full'
                            ]"
                          ></div>
                          <div class="flex items-center py-2 pl-3 pr-9">
                            <span
                              class="ml-3 block truncate flex items-center text-[#E1E2E2] hover:text-[#FB8122]"
                            >
                              <svg
                                width="15"
                                height="17"
                                viewBox="0 0 15 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                class="mr-[14px]"
                              >
                                <path
                                  d="M7.11111 8.7963C8.0541 8.7963 8.95847 8.42169 9.62527 7.7549C10.2921 7.0881 10.6667 6.18373 10.6667 5.24074C10.6667 4.29775 10.2921 3.39338 9.62527 2.72658C8.95847 2.05979 8.0541 1.68519 7.11111 1.68519C6.16812 1.68519 5.26375 2.05979 4.59695 2.72658C3.93016 3.39338 3.55556 4.29775 3.55556 5.24074C3.55556 6.18373 3.93016 7.0881 4.59695 7.7549C5.26375 8.42169 6.16812 8.7963 7.11111 8.7963ZM7.11111 9.98148C5.85379 9.98148 4.64796 9.48201 3.7589 8.59295C2.86984 7.70389 2.37037 6.49806 2.37037 5.24074C2.37037 3.98342 2.86984 2.77759 3.7589 1.88853C4.64796 0.99947 5.85379 0.5 7.11111 0.5C8.36843 0.5 9.57426 0.99947 10.4633 1.88853C11.3524 2.77759 11.8519 3.98342 11.8519 5.24074C11.8519 6.49806 11.3524 7.70389 10.4633 8.59295C9.57426 9.48201 8.36843 9.98148 7.11111 9.98148ZM13.037 15.9074V14.1296C13.037 13.6581 12.8497 13.2059 12.5163 12.8726C12.1829 12.5392 11.7308 12.3519 11.2593 12.3519H2.96296C2.49147 12.3519 2.03928 12.5392 1.70588 12.8726C1.37249 13.2059 1.18519 13.6581 1.18519 14.1296V15.9074C1.18519 16.0646 1.12275 16.2153 1.01162 16.3264C0.900486 16.4376 0.749758 16.5 0.592593 16.5C0.435427 16.5 0.284699 16.4376 0.173566 16.3264C0.0624338 16.2153 0 16.0646 0 15.9074V14.1296C0 13.3438 0.312168 12.5902 0.867832 12.0345C1.4235 11.4788 2.17714 11.1667 2.96296 11.1667H11.2593C12.0451 11.1667 12.7987 11.4788 13.3544 12.0345C13.9101 12.5902 14.2222 13.3438 14.2222 14.1296V15.9074C14.2222 16.0646 14.1598 16.2153 14.0487 16.3264C13.9375 16.4376 13.7868 16.5 13.6296 16.5C13.4725 16.5 13.3217 16.4376 13.2106 16.3264C13.0995 16.2153 13.037 16.0646 13.037 15.9074Z"
                                  fill="currentColor"
                                />
                              </svg>
                              My profile
                            </span>
                          </div>
                        </li>
                      </ListboxOption>
                      <ListboxOption as="template" v-slot="{ active }">
                        <li
                          class="cursor-default select-none relative flex"
                          @click="signUserOut"
                        >
                          <div
                            :class="[
                              active ? 'block' : 'hidden',
                              'h-[29px] w-[2px] bg-[#FB8122] my-2 rounded-r-full'
                            ]"
                          ></div>
                          <div class="flex items-center py-2 pl-3 pr-9">
                            <span
                              class="ml-3 block truncate flex items-center text-[#E1E2E2] hover:text-[#FB8122]"
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                class="mr-[14px]"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M8.78976 0.00792508C9.1064 -0.0184443 9.42508 0.0211583 9.72563 0.12423C10.0262 0.227304 10.3021 0.391608 10.5359 0.606759C10.7698 0.821909 10.9564 1.08323 11.0841 1.37419C11.2118 1.66516 11.2777 1.97945 11.2777 2.2972V3.82265C11.2777 4.16868 10.9972 4.44919 10.6512 4.44919C10.3052 4.44919 10.0246 4.16868 10.0246 3.82265V2.29726C10.0246 2.15284 9.99467 2.00996 9.93664 1.87771C9.8786 1.74546 9.79376 1.62668 9.68747 1.52888C9.58119 1.43108 9.45577 1.3564 9.31915 1.30955C9.18253 1.2627 9.03767 1.2447 8.89374 1.25668L2.21064 1.81305C1.94962 1.8348 1.70628 1.95385 1.52892 2.14659C1.35155 2.33932 1.2531 2.59168 1.25308 2.8536M8.78976 0.00792508L2.10666 0.564293C1.53239 0.612122 0.997046 0.874029 0.606836 1.29807C0.216625 1.72211 2.85314e-05 2.27731 0 2.85357V13.1456C2.85314e-05 13.7218 0.216625 14.2771 0.606836 14.7011C0.997046 15.1251 1.53237 15.387 2.10664 15.4349L8.78968 15.9921C9.10643 16.0185 9.42526 15.9788 9.72591 15.8757C10.0266 15.7725 10.3025 15.6081 10.5364 15.3929C10.7702 15.1776 10.9568 14.9161 11.0844 14.625C11.212 14.334 11.2778 14.0197 11.2777 13.7019V12.1765C11.2777 11.8305 10.9972 11.55 10.6512 11.55C10.3052 11.55 10.0246 11.8305 10.0246 12.1765V13.7019C10.0247 13.8464 9.9948 13.9896 9.93679 14.1219C9.87879 14.2543 9.79396 14.3731 9.68766 14.4709C9.58137 14.5688 9.45593 14.6435 9.31927 14.6904C9.18262 14.7373 9.03772 14.7553 8.89374 14.7433L2.2107 14.1861C1.94967 14.1644 1.70628 14.0453 1.52892 13.8526C1.35155 13.6598 1.2531 13.4075 1.25308 13.1456V2.8536M12.1489 4.17669C12.4147 3.95519 12.8098 3.99112 13.0313 4.25696L15.8156 7.59851C16.0092 7.83085 16.0092 8.16832 15.8156 8.40066L13.0313 11.7422C12.8098 12.008 12.4147 12.044 12.1489 11.8225C11.883 11.601 11.8471 11.2059 12.0686 10.9401L13.9967 8.62613H7.8158C7.46977 8.62613 7.18926 8.34561 7.18926 7.99958C7.18926 7.65356 7.46977 7.37304 7.8158 7.37304H13.9967L12.0686 5.05911C11.8471 4.79328 11.883 4.3982 12.1489 4.17669Z"
                                  fill="currentColor"
                                />
                              </svg>
                              Sign out
                            </span>
                          </div>
                        </li>
                      </ListboxOption>
                    </ListboxOptions>
                  </transition>
                </div>
              </Listbox>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions
} from '@headlessui/vue'
import { useAuth } from '@/stores/auth'
import router from '@/router'

const authStore = useAuth()
async function signUserOut() {
  await authStore.signOut()
  router.push('/login')
}
const people = [
  {
    id: 1,
    name: 'Admin Tools LLC'
  },
  {
    id: 2,
    name: '	Expertonline SRL '
  },
  {
    id: 3,
    name: '	Miso SRL '
  },
  {
    id: 4,
    name: '	Chimtitan SRL '
  },
  {
    id: 5,
    name: 'Soral Design SRL'
  }
]
const selected = ref(people[0])
</script>
