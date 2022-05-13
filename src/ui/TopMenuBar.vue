<template>
  <div
    class="bg-whiteop max-w-[99%] flex h-[40px] mx-[12px] my-[12px] rounded-[6px]"
  >
    <div class="grid grid-cols-7 w-full px-[30px]">
      <!--Dashboard-->
      <Menu as="div" class="flex justify-center items-center cursor-pointer">
        <div>
          <MenuButton
            class="text-[#E1E2E2] flex justify-center items-center hover:text-[#FB8122]"
          >
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.2592 9.62967V14.0741H1.48148V2.2223H6.66664V0.74082H1.48148C1.08856 0.74082 0.711745 0.896903 0.433914 1.17473C0.156084 1.45256 0 1.82938 0 2.2223V14.0741C0 14.467 0.156084 14.8438 0.433914 15.1217C0.711745 15.3995 1.08856 15.5556 1.48148 15.5556H7.40738V18.5185H4.44443V20H16.2962V18.5185H13.3333V15.5556H19.2592C19.6521 15.5556 20.0289 15.3995 20.3067 15.1217C20.5846 14.8438 20.7407 14.467 20.7407 14.0741V9.62967H19.2592ZM11.8518 18.5185H8.88885V15.5556H11.8518V18.5185Z"
                fill="currentColor"
              />
              <path
                d="M11.8518 11.1111H11.8444C11.6848 11.1095 11.53 11.0563 11.4031 10.9595C11.2761 10.8628 11.1838 10.7276 11.14 10.5741L9.81181 5.92598H6.66664V4.44451H10.3703C10.5313 4.44442 10.688 4.49679 10.8166 4.59369C10.9451 4.69059 11.0386 4.82675 11.0829 4.98154L11.8785 7.76672L14.1074 0.522302C14.1554 0.371968 14.2497 0.240604 14.3767 0.146862C14.5036 0.0531187 14.6569 0.00176169 14.8148 8.21151e-05C14.9708 -0.00226493 15.1235 0.0457565 15.2501 0.137024C15.3768 0.228291 15.4706 0.357942 15.5177 0.506747L16.8296 4.44451H20.7407V5.92598H16.2962C16.1407 5.92602 15.9891 5.8771 15.8629 5.78616C15.7368 5.69522 15.6424 5.56688 15.5933 5.41932L14.8429 3.16748L12.5599 10.5882C12.5134 10.7396 12.4194 10.8721 12.292 10.9663C12.1645 11.0604 12.0103 11.1112 11.8518 11.1111Z"
                fill="currentColor"
              />
            </svg>
            <p class="mx-[8px] text-[16px] leading-[20px]">Dashboard</p>
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
          </MenuButton>
        </div>
        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <MenuItems
            class="absolute top-[10%] left-[4.5%] w-[230px] rounded-[6px] shadow-lg bg-[#2D3134] ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div class="py-1">
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? ' text-[#FB8122]' : 'text-[#E1E2E2]',
                    'block text-center pt-[10px] text-[16px]'
                  ]"
                  >Website Monitoring</a
                >
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? ' text-[#FB8122]' : 'text-[#E1E2E2]',
                    'block text-center pt-[21px] text-[16px]'
                  ]"
                  >Service Monitoring</a
                >
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? ' text-[#FB8122]' : 'text-[#E1E2E2]',
                    'block text-center py-[21px] text-[16px]'
                  ]"
                  >Doker Monitoring</a
                >
              </MenuItem>
              <form method="POST" action="#">
                <MenuItem v-slot="{ active }">
                  <button
                    type="submit"
                    :class="[
                      active ? ' text-[#FB8122]' : 'text-[#E1E2E2]',
                      'block w-full text-center pb-[10px] text-[16px]'
                    ]"
                  >
                    Kubernetes Monitoring
                  </button>
                </MenuItem>
              </form>
            </div>
          </MenuItems>
        </transition>
      </Menu>
      <!--Services-->
      <Menu as="div" class="flex justify-center items-center cursor-pointer">
        <div>
          <MenuButton
            class="text-[#E1E2E2] flex justify-center items-center hover:text-[#FB8122]"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.4086 17.7432L20.4106 14.2715C20.4725 14.1685 20.4943 14.0463 20.4718 13.9283C20.4492 13.8103 20.384 13.7048 20.2885 13.6318L18.1792 11.9766C18.2217 11.6527 18.2445 11.3266 18.2475 11C18.2445 10.6734 18.2217 10.3473 18.1792 10.0234L20.2739 8.36817C20.3694 8.29524 20.4346 8.18968 20.4571 8.07167C20.4796 7.95366 20.4579 7.83148 20.3959 7.72852L18.394 4.25685C18.336 4.15272 18.2419 4.07339 18.1295 4.03382C18.0171 3.99424 17.8941 3.99716 17.7836 4.04201L15.2885 5.04787C14.7693 4.65162 14.2016 4.32343 13.5991 4.07131L13.2231 1.41994C13.202 1.30469 13.142 1.20016 13.0531 1.12375C12.9643 1.04735 12.852 1.00368 12.7348 1.00002H8.73094C8.61245 0.998858 8.49759 1.04081 8.40775 1.11807C8.31792 1.19533 8.25924 1.30262 8.24266 1.41994L7.86668 4.07131C7.26341 4.32186 6.69545 4.65016 6.17723 5.04787L3.68212 4.04201C3.57169 3.99716 3.44868 3.99424 3.33625 4.03382C3.22382 4.07339 3.12975 4.15272 3.07177 4.25685L1.06982 7.72852C1.00791 7.83148 0.986136 7.95366 1.00866 8.07167C1.03118 8.18968 1.09642 8.29524 1.19189 8.36817L3.30126 10.0234C3.25889 10.3473 3.23606 10.6734 3.2329 11C3.2359 11.3266 3.25873 11.6527 3.30126 11.9766L1.19189 13.6318C1.09642 13.7048 1.03118 13.8103 1.00866 13.9283C0.986136 14.0463 1.00791 14.1685 1.06982 14.2715L3.07177 17.7432C3.12975 17.8473 3.22382 17.9266 3.33625 17.9662C3.44868 18.0058 3.57169 18.0028 3.68212 17.958L6.19188 16.9521C6.71107 17.3484 7.27883 17.6766 7.88133 17.9287L8.25731 20.5801C8.27389 20.6974 8.33257 20.8047 8.4224 20.8819C8.51224 20.9592 8.6271 21.0011 8.74559 21H12.7495C12.868 21.0011 12.9828 20.9592 13.0727 20.8819C13.1625 20.8047 13.2212 20.6974 13.2378 20.5801L13.6137 17.9287C14.217 17.6781 14.785 17.3498 15.3032 16.9521L17.7983 17.958C17.9087 18.0028 18.0317 18.0058 18.1442 17.9662C18.2566 17.9266 18.3507 17.8473 18.4086 17.7432Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <circle
                cx="10.8401"
                cy="10.9343"
                r="4.08799"
                transform="rotate(-180 10.8401 10.9343)"
                stroke="currentColor"
                stroke-width="0.8"
              />
              <path
                d="M5.9952 12.2684C5.95849 12.0506 5.75213 11.9037 5.53429 11.9404C5.31645 11.9772 5.16962 12.1835 5.20633 12.4014L5.9952 12.2684ZM7.55814 15.7445C7.74026 15.8695 7.98926 15.8232 8.11429 15.6411C8.23932 15.459 8.19303 15.21 8.01091 15.085L7.55814 15.7445ZM8.84038 15.5313C8.63443 15.4514 8.40269 15.5535 8.32277 15.7595C8.24285 15.9654 8.34501 16.1972 8.55096 16.2771L8.84038 15.5313ZM9.05549 16.4729C9.26144 16.5528 9.49318 16.4506 9.5731 16.2447C9.65302 16.0387 9.55086 15.807 9.34491 15.7271L9.05549 16.4729ZM5.20633 12.4014C5.33682 13.1756 6.07328 14.7252 7.55814 15.7445L8.01091 15.085C6.70959 14.1916 6.09062 12.8346 5.9952 12.2684L5.20633 12.4014ZM8.55096 16.2771L9.05549 16.4729L9.34491 15.7271L8.84038 15.5313L8.55096 16.2771Z"
                fill="currentColor"
              />
              <path
                d="M11.1962 5.97237C10.9754 5.98074 10.7897 5.80856 10.7813 5.58781C10.773 5.36705 10.9451 5.18131 11.1659 5.17295L11.1962 5.97237ZM14.9175 6.79552C15.077 6.9484 15.0823 7.20161 14.9294 7.36108C14.7766 7.52054 14.5233 7.52587 14.3639 7.37298L14.9175 6.79552ZM14.9696 8.09433C14.8495 7.90894 14.9024 7.66126 15.0877 7.54111C15.2731 7.42097 15.5208 7.47386 15.641 7.65924L14.9696 8.09433ZM15.9353 8.11339C16.0554 8.29878 16.0025 8.54646 15.8172 8.66661C15.6318 8.78675 15.3841 8.73386 15.2639 8.54847L15.9353 8.11339ZM11.1659 5.17295C11.9505 5.14321 13.6175 5.54906 14.9175 6.79552L14.3639 7.37298C13.2245 6.2806 11.7699 5.95063 11.1962 5.97237L11.1659 5.17295ZM15.641 7.65924L15.9353 8.11339L15.2639 8.54847L14.9696 8.09433L15.641 7.65924Z"
                fill="currentColor"
              />
            </svg>
            <p class="mx-[8px] text-[16px] leading-[20px]">Services</p>
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
          </MenuButton>
        </div>
        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <MenuItems
            class="absolute top-[10%] left-[18%] w-[230px] rounded-[6px] shadow-lg bg-[#2D3134] ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div class="py-1">
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? ' text-[#FB8122]' : 'text-[#E1E2E2]',
                    'block text-center pt-[10px] text-[16px]'
                  ]"
                  >Services1</a
                >
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? ' text-[#FB8122]' : 'text-[#E1E2E2]',
                    'block text-center pt-[21px] text-[16px]'
                  ]"
                  >Services2</a
                >
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? ' text-[#FB8122]' : 'text-[#E1E2E2]',
                    'block text-center py-[21px] text-[16px]'
                  ]"
                  >Services3</a
                >
              </MenuItem>
              <form method="POST" action="#">
                <MenuItem v-slot="{ active }">
                  <button
                    type="submit"
                    :class="[
                      active ? ' text-[#FB8122]' : 'text-[#E1E2E2]',
                      'block w-full text-center pb-[10px] text-[16px]'
                    ]"
                  >
                    Services4
                  </button>
                </MenuItem>
              </form>
            </div>
          </MenuItems>
        </transition>
      </Menu>
      <!--Billing-->
      <Menu as="div" class="flex justify-center items-center cursor-pointer">
        <div>
          <MenuButton
            class="text-[#E1E2E2] flex justify-center items-center hover:text-[#FB8122]"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.7778 21C17 21 16.5556 19.6667 16.5556 19V12.1111M18.7778 21C20.5556 21 21 19.6667 21 19V12.1111H16.5556M18.7778 21H3C1.4 21 1 19.6667 1 19V1.22222L4.77778 3.22222L8.77778 1L12.5556 3.22222L16.5556 1.22222V12.1111M11.2223 8.11108H8.77789M8.77789 8.11108H8.11122C7.5927 8.11108 6.5 8.33331 6.5 9.66664C6.5 11.0889 7.44455 11.4444 7.889 11.4444H9.66677C10.1112 11.4444 11.5 11.5333 11.5 13.2666C11.5 15 10.1112 15 9.66677 15H8.77789M8.77789 8.11108V6.11108M8.77789 15H6.55566M8.77789 15V17"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p class="mx-[8px] text-[16px] leading-[20px]">Billing</p>
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
          </MenuButton>
        </div>
        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <MenuItems
            class="absolute top-[10%] left-[32%] w-[230px] rounded-[6px] shadow-lg bg-[#2D3134] ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div class="py-1">
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? ' text-[#FB8122]' : 'text-[#E1E2E2]',
                    'block text-center pt-[10px] text-[16px]'
                  ]"
                  >Billing1</a
                >
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? ' text-[#FB8122]' : 'text-[#E1E2E2]',
                    'block text-center pt-[21px] text-[16px]'
                  ]"
                  >Billing2</a
                >
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? ' text-[#FB8122]' : 'text-[#E1E2E2]',
                    'block text-center py-[21px] text-[16px]'
                  ]"
                  >Billing3</a
                >
              </MenuItem>
              <form method="POST" action="#">
                <MenuItem v-slot="{ active }">
                  <button
                    type="submit"
                    :class="[
                      active ? ' text-[#FB8122]' : 'text-[#E1E2E2]',
                      'block w-full text-center pb-[10px] text-[16px]'
                    ]"
                  >
                    Billing4
                  </button>
                </MenuItem>
              </form>
            </div>
          </MenuItems>
        </transition>
      </Menu>
      <!--Tools-->
      <Menu as="div" class="flex justify-center items-center cursor-pointer">
        <div>
          <MenuButton
            class="text-[#E1E2E2] flex justify-center items-center hover:text-[#FB8122]"
          >
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M19.7243 3.54799L18.6091 3.28491L15.595 6.28181L13.8878 4.54315L16.8275 1.45903L16.5702 0.326614C15.949 0.11879 15.2992 0.00881041 14.6442 0.000615302C13.9297 -0.0103725 13.2205 0.125908 12.561 0.400965C11.9241 0.68923 11.3485 1.09694 10.8652 1.60201C10.3272 2.11162 9.90116 2.72758 9.6141 3.41073C9.06141 4.77032 9.06141 6.29198 9.6141 7.65157C6.63327 10.5841 3.69093 13.5555 0.78783 16.5651C0.487568 16.9583 0.344586 17.4487 0.381762 17.942C0.411061 18.4725 0.649662 18.9698 1.0452 19.3246C1.22249 19.5176 1.43411 19.6778 1.67003 19.7936C1.9131 19.9008 2.17475 19.9623 2.43927 19.9752C2.89109 19.9666 3.32433 19.795 3.66034 19.4933C5.87369 17.4101 10.1145 13.1306 12.5238 10.6227C13.1772 10.9001 13.8792 11.0431 14.5884 11.0417C15.3023 11.0411 16.0088 10.8975 16.6663 10.6192C17.3237 10.341 17.9187 9.93378 18.4161 9.42169C19.4377 8.37972 20.0084 6.97757 20.0046 5.51828C20.0211 4.85052 19.9264 4.18467 19.7243 3.54799ZM2.7953 18.4796C2.74026 18.5285 2.67392 18.5629 2.60227 18.5797C2.53178 18.5919 2.45972 18.5919 2.38923 18.5797C2.31532 18.5684 2.24492 18.5405 2.18333 18.4982C2.11724 18.4595 2.06135 18.4056 2.02033 18.3409C1.82016 18.1364 1.63285 17.7475 1.82016 17.5288C3.77901 15.4455 7.81253 11.3734 10.3347 8.88408C10.4777 9.07281 10.635 9.25297 10.8037 9.42169C10.9724 9.59756 11.154 9.76056 11.347 9.90926C8.90777 12.4114 4.93001 16.4349 2.79672 18.4796H2.7953ZM18.692 5.51828C18.6949 6.61209 18.2688 7.66301 17.5024 8.44655C16.7376 9.19677 15.7091 9.61703 14.6378 9.61703C13.5665 9.61703 12.5379 9.19677 11.7731 8.44655C11.2126 7.86161 10.8297 7.12953 10.669 6.33549C10.5083 5.54145 10.5763 4.7181 10.8652 3.96121C11.0575 3.4461 11.3558 2.97708 11.7407 2.58448C12.1257 2.19189 12.5888 1.88446 13.1 1.68208C13.5854 1.47892 14.1065 1.37488 14.6328 1.3761H14.9959L12.398 4.05415V5.0493L15.1075 7.74594H16.0511L18.692 5.14939V5.51828ZM3.23425 8.1277H5.4233L6.43132 9.15288L7.40074 8.18918L6.44991 7.21977V7.15829L6.53141 4.80052L6.21685 4.17568L2.12757 1.48477L1.28255 1.57913L0.0943681 2.79305L0 3.64951L2.62801 7.82172L3.23425 8.12913V8.1277ZM1.88307 2.9346L5.19167 5.11365L5.13591 6.71933H3.59742L1.46413 3.3421L1.88307 2.9346ZM12.0419 12.8861L13.0056 11.9239L17.4466 16.4778C17.8207 16.871 18.0293 17.3929 18.0293 17.9355C18.0293 18.4782 17.8207 19.0001 17.4466 19.3932C17.1654 19.682 16.8037 19.8794 16.4087 19.9597C16.0136 20.0401 15.6036 19.9996 15.2319 19.8436C14.9946 19.7384 14.7819 19.585 14.607 19.3932L10.1145 14.8135L11.0854 13.8441L15.5636 18.411C15.6238 18.4774 15.6987 18.5288 15.7823 18.5611C15.9469 18.6279 16.1311 18.6279 16.2956 18.5611C16.3792 18.5287 16.4542 18.4773 16.5144 18.411C16.577 18.349 16.6257 18.2744 16.6574 18.1922C16.6902 18.1083 16.7076 18.0192 16.7089 17.9291C16.7074 17.8392 16.6905 17.7502 16.6588 17.666C16.6271 17.5838 16.5784 17.5093 16.5158 17.4473L12.0419 12.8861Z"
                fill="currentColor"
              />
            </svg>
            <p class="mx-[8px] text-[16px] leading-[20px]">Tools</p>
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
          </MenuButton>
        </div>
        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <MenuItems
            class="absolute top-[10%] left-[45.8%] w-[230px] rounded-[6px] shadow-lg bg-[#2D3134] ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div class="py-1">
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? ' text-[#FB8122]' : 'text-[#E1E2E2]',
                    'block text-center pt-[10px] text-[16px]'
                  ]"
                  >Tools1</a
                >
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? ' text-[#FB8122]' : 'text-[#E1E2E2]',
                    'block text-center pt-[21px] text-[16px]'
                  ]"
                  >Tools2</a
                >
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? ' text-[#FB8122]' : 'text-[#E1E2E2]',
                    'block text-center py-[21px] text-[16px]'
                  ]"
                  >Tools3</a
                >
              </MenuItem>
              <form method="POST" action="#">
                <MenuItem v-slot="{ active }">
                  <button
                    type="submit"
                    :class="[
                      active ? ' text-[#FB8122]' : 'text-[#E1E2E2]',
                      'block w-full text-center pb-[10px] text-[16px]'
                    ]"
                  >
                    Tools4
                  </button>
                </MenuItem>
              </form>
            </div>
          </MenuItems>
        </transition>
      </Menu>
      <!--API-->
      <Menu as="div" class="flex justify-center items-center cursor-pointer">
        <div>
          <MenuButton
            class="text-[#E1E2E2] flex justify-center items-center hover:text-[#FB8122]"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.1429 14.2857C16.6384 14.2882 16.1443 14.429 15.7143 14.6929L13.5071 12.4786C14.0207 11.7541 14.2966 10.888 14.2966 10C14.2966 9.11198 14.0207 8.24588 13.5071 7.52143L15.7143 5.30714C16.1443 5.571 16.6384 5.71182 17.1429 5.71429C17.7079 5.71429 18.2603 5.54672 18.7302 5.23277C19.2001 4.91882 19.5663 4.4726 19.7825 3.95052C19.9988 3.42845 20.0553 2.85397 19.9451 2.29974C19.8349 1.74551 19.5627 1.23642 19.1632 0.836839C18.7636 0.43726 18.2545 0.165144 17.7003 0.0549005C17.146 -0.055343 16.5716 0.00123795 16.0495 0.217488C15.5274 0.433739 15.0812 0.799946 14.7672 1.2698C14.4533 1.73966 14.2857 2.29205 14.2857 2.85714C14.2882 3.36161 14.429 3.85574 14.6929 4.28572L12.4786 6.49286C11.7541 5.97928 10.888 5.70343 10 5.70343C9.11198 5.70343 8.24588 5.97928 7.52143 6.49286L5.30714 4.28572C5.571 3.85574 5.71182 3.36161 5.71429 2.85714C5.71429 2.29205 5.54672 1.73966 5.23277 1.2698C4.91882 0.799946 4.4726 0.433739 3.95052 0.217488C3.42845 0.00123795 2.85397 -0.055343 2.29974 0.0549005C1.74551 0.165144 1.23642 0.43726 0.836839 0.836839C0.43726 1.23642 0.165144 1.74551 0.0549005 2.29974C-0.055343 2.85397 0.00123795 3.42845 0.217488 3.95052C0.433739 4.4726 0.799946 4.91882 1.2698 5.23277C1.73966 5.54672 2.29205 5.71429 2.85714 5.71429C3.36161 5.71182 3.85574 5.571 4.28572 5.30714L6.49286 7.52143C5.97928 8.24588 5.70343 9.11198 5.70343 10C5.70343 10.888 5.97928 11.7541 6.49286 12.4786L4.28572 14.6929C3.85574 14.429 3.36161 14.2882 2.85714 14.2857C2.29205 14.2857 1.73966 14.4533 1.2698 14.7672C0.799946 15.0812 0.433739 15.5274 0.217488 16.0495C0.00123795 16.5716 -0.055343 17.146 0.0549005 17.7003C0.165144 18.2545 0.43726 18.7636 0.836839 19.1632C1.23642 19.5627 1.74551 19.8349 2.29974 19.9451C2.85397 20.0553 3.42845 19.9988 3.95052 19.7825C4.4726 19.5663 4.91882 19.2001 5.23277 18.7302C5.54672 18.2603 5.71429 17.7079 5.71429 17.1429C5.71182 16.6384 5.571 16.1443 5.30714 15.7143L7.52143 13.5071C8.24588 14.0207 9.11198 14.2966 10 14.2966C10.888 14.2966 11.7541 14.0207 12.4786 13.5071L14.6929 15.7143C14.429 16.1443 14.2882 16.6384 14.2857 17.1429C14.2857 17.7079 14.4533 18.2603 14.7672 18.7302C15.0812 19.2001 15.5274 19.5663 16.0495 19.7825C16.5716 19.9988 17.146 20.0553 17.7003 19.9451C18.2545 19.8349 18.7636 19.5627 19.1632 19.1632C19.5627 18.7636 19.8349 18.2545 19.9451 17.7003C20.0553 17.146 19.9988 16.5716 19.7825 16.0495C19.5663 15.5274 19.2001 15.0812 18.7302 14.7672C18.2603 14.4533 17.7079 14.2857 17.1429 14.2857ZM17.1429 1.42857C17.4254 1.42857 17.7016 1.51236 17.9365 1.66933C18.1715 1.8263 18.3546 2.04942 18.4627 2.31045C18.5708 2.57149 18.5991 2.85873 18.544 3.13584C18.4889 3.41296 18.3528 3.66751 18.153 3.8673C17.9532 4.06709 17.6987 4.20314 17.4216 4.25827C17.1444 4.31339 16.8572 4.2851 16.5962 4.17697C16.3351 4.06885 16.112 3.88574 15.955 3.65082C15.7981 3.41589 15.7143 3.13969 15.7143 2.85714C15.7143 2.47826 15.8648 2.1149 16.1327 1.84699C16.4006 1.57908 16.764 1.42857 17.1429 1.42857ZM1.42857 2.85714C1.42857 2.5746 1.51236 2.2984 1.66933 2.06347C1.8263 1.82854 2.04942 1.64544 2.31045 1.53732C2.57149 1.42919 2.85873 1.4009 3.13584 1.45602C3.41296 1.51114 3.66751 1.6472 3.8673 1.84699C4.06709 2.04678 4.20314 2.30133 4.25827 2.57844C4.31339 2.85556 4.2851 3.1428 4.17697 3.40383C4.06885 3.66487 3.88574 3.88798 3.65082 4.04496C3.41589 4.20193 3.13969 4.28572 2.85714 4.28572C2.47826 4.28572 2.1149 4.13521 1.84699 3.8673C1.57908 3.59939 1.42857 3.23602 1.42857 2.85714ZM2.85714 18.5714C2.5746 18.5714 2.2984 18.4876 2.06347 18.3307C1.82854 18.1737 1.64544 17.9506 1.53732 17.6895C1.42919 17.4285 1.4009 17.1413 1.45602 16.8642C1.51114 16.587 1.6472 16.3325 1.84699 16.1327C2.04678 15.9329 2.30133 15.7969 2.57844 15.7417C2.85556 15.6866 3.1428 15.7149 3.40383 15.823C3.66487 15.9312 3.88798 16.1143 4.04496 16.3492C4.20193 16.5841 4.28572 16.8603 4.28572 17.1429C4.28572 17.5217 4.13521 17.8851 3.8673 18.153C3.59939 18.4209 3.23602 18.5714 2.85714 18.5714ZM10 12.8571C9.43491 12.8571 8.88251 12.6896 8.41266 12.3756C7.9428 12.0617 7.57659 11.6155 7.36034 11.0934C7.14409 10.5713 7.08751 9.99683 7.19776 9.4426C7.308 8.88837 7.58012 8.37927 7.97969 7.97969C8.37927 7.58012 8.88837 7.308 9.4426 7.19776C9.99683 7.08751 10.5713 7.14409 11.0934 7.36034C11.6155 7.57659 12.0617 7.9428 12.3756 8.41266C12.6896 8.88251 12.8571 9.43491 12.8571 10C12.8571 10.7578 12.5561 11.4845 12.0203 12.0203C11.4845 12.5561 10.7578 12.8571 10 12.8571ZM17.1429 18.5714C16.8603 18.5714 16.5841 18.4876 16.3492 18.3307C16.1143 18.1737 15.9312 17.9506 15.823 17.6895C15.7149 17.4285 15.6866 17.1413 15.7417 16.8642C15.7969 16.587 15.9329 16.3325 16.1327 16.1327C16.3325 15.9329 16.587 15.7969 16.8642 15.7417C17.1413 15.6866 17.4285 15.7149 17.6895 15.823C17.9506 15.9312 18.1737 16.1143 18.3307 16.3492C18.4876 16.5841 18.5714 16.8603 18.5714 17.1429C18.5714 17.5217 18.4209 17.8851 18.153 18.153C17.8851 18.4209 17.5217 18.5714 17.1429 18.5714Z"
                fill="currentColor"
              />
            </svg>
            <p class="mx-[8px] text-[16px] leading-[20px]">API</p>
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
          </MenuButton>
        </div>
        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <MenuItems
            class="absolute top-[10%] left-[59.6%] w-[230px] rounded-[6px] shadow-lg bg-[#2D3134] ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div class="py-1">
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? ' text-[#FB8122]' : 'text-[#E1E2E2]',
                    'block text-center pt-[10px] text-[16px]'
                  ]"
                  >API1</a
                >
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? ' text-[#FB8122]' : 'text-[#E1E2E2]',
                    'block text-center pt-[21px] text-[16px]'
                  ]"
                  >API2</a
                >
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? ' text-[#FB8122]' : 'text-[#E1E2E2]',
                    'block text-center py-[21px] text-[16px]'
                  ]"
                  >API3</a
                >
              </MenuItem>
              <form method="POST" action="#">
                <MenuItem v-slot="{ active }">
                  <button
                    type="submit"
                    :class="[
                      active ? ' text-[#FB8122]' : 'text-[#E1E2E2]',
                      'block w-full text-center pb-[10px] text-[16px]'
                    ]"
                  >
                    API4
                  </button>
                </MenuItem>
              </form>
            </div>
          </MenuItems>
        </transition>
      </Menu>
      <!--Affiliate-->
      <Menu as="div" class="flex justify-center items-center cursor-pointer">
        <div>
          <MenuButton
            class="text-[#E1E2E2] flex justify-center items-center hover:text-[#FB8122]"
          >
            <svg
              width="20"
              height="22"
              viewBox="0 0 20 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.7235 13.3044C11.7235 14.385 10.8476 15.261 9.76702 15.261C8.68641 15.261 7.81055 14.3849 7.81055 13.3044C7.81055 12.2238 8.68641 11.3479 9.76702 11.3479C10.8476 11.3479 11.7235 12.2238 11.7235 13.3044Z"
                stroke="currentColor"
                stroke-miterlimit="10"
              />
              <path
                d="M14.7676 21V19C14.7676 17.6956 13.811 16.5653 12.5502 16.1739L12.2023 16.087L9.76759 18.5217L7.28934 16.0435L6.94148 16.1303C5.68062 16.5216 4.76758 17.652 4.76758 18.9565V21H14.7676Z"
                stroke="currentColor"
                stroke-miterlimit="10"
              />
              <path
                d="M11.5057 2.73917C11.5057 3.69964 10.727 4.47833 9.76651 4.47833C8.80599 4.47833 8.02734 3.69968 8.02734 2.73917C8.02734 1.77865 8.80599 1 9.76651 1C10.727 1 11.5057 1.77865 11.5057 2.73917Z"
                stroke="currentColor"
                stroke-miterlimit="10"
              />
              <path
                d="M3.2453 5.3638C4.07702 5.84403 4.36198 6.90763 3.88172 7.73953C3.40149 8.57126 2.33789 8.85621 1.50612 8.37598C0.674394 7.89575 0.389303 6.83212 0.869518 6.00039C1.34977 5.16848 2.41353 4.88356 3.24524 5.36382"
                stroke="currentColor"
                stroke-miterlimit="10"
              />
              <path
                d="M3.88168 14.2605C4.36193 15.0924 4.07697 16.156 3.24511 16.6362C2.41338 17.1165 1.34978 16.8315 0.869518 15.9996C0.389287 15.1679 0.674213 14.1043 1.50612 13.6241C2.33784 13.1438 3.40144 13.4287 3.88172 14.2605"
                stroke="currentColor"
                stroke-miterlimit="10"
              />
              <path
                d="M18.0274 13.6249C18.8593 14.1051 19.1442 15.1688 18.664 16.0005C18.1838 16.8322 17.1201 17.1173 16.2883 16.6371C15.4565 16.1568 15.1716 15.0931 15.6519 14.2613C16.1321 13.4296 17.1957 13.1446 18.0275 13.6249"
                stroke="currentColor"
                stroke-miterlimit="10"
              />
              <path
                d="M18.664 5.99997C19.1442 6.83173 18.8593 7.89529 18.0275 8.37557C17.1956 8.85582 16.1321 8.57086 15.6518 7.73915C15.1716 6.90743 15.4566 5.84364 16.2884 5.36343C17.1201 4.8832 18.1837 5.16826 18.664 6.00003"
                stroke="currentColor"
                stroke-miterlimit="10"
              />
              <path
                d="M17.1582 13.3914V8.60876"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-miterlimit="10"
              />
              <path
                d="M14.0273 17.087L15.7663 16.2173"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-miterlimit="10"
              />
              <path
                d="M3.76758 16.2174L5.50657 17.0871"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-miterlimit="10"
              />
              <path
                d="M2.37598 8.56528V13.3913"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-miterlimit="10"
              />
              <path
                d="M8.15886 3.39136L3.76758 5.78269"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-miterlimit="10"
              />
              <path
                d="M15.7673 5.78269L11.376 3.39136"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-miterlimit="10"
              />
            </svg>
            <p class="mx-[8px] text-[16px] leading-[20px]">Affliate</p>
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
          </MenuButton>
        </div>
        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <MenuItems
            class="absolute top-[10%] left-[73.5%] w-[230px] rounded-[6px] shadow-lg bg-[#2D3134] ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div class="py-1">
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? ' text-[#FB8122]' : 'text-[#E1E2E2]',
                    'block text-center pt-[10px] text-[16px]'
                  ]"
                  >Affliate1</a
                >
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? ' text-[#FB8122]' : 'text-[#E1E2E2]',
                    'block text-center pt-[21px] text-[16px]'
                  ]"
                  >Affliate2</a
                >
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? ' text-[#FB8122]' : 'text-[#E1E2E2]',
                    'block text-center py-[21px] text-[16px]'
                  ]"
                  >Affliate3</a
                >
              </MenuItem>
              <form method="POST" action="#">
                <MenuItem v-slot="{ active }">
                  <button
                    type="submit"
                    :class="[
                      active ? ' text-[#FB8122]' : 'text-[#E1E2E2]',
                      'block w-full text-center pb-[10px] text-[16px]'
                    ]"
                  >
                    Affliate4
                  </button>
                </MenuItem>
              </form>
            </div>
          </MenuItems>
        </transition>
      </Menu>
      <!--Support-->
      <Menu as="div" class="flex justify-center items-center cursor-pointer">
        <div>
          <MenuButton
            class="text-[#E1E2E2] flex justify-center items-center hover:text-[#FB8122]"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.92893 18.0711C7.83418 21.9763 14.1658 21.9763 18.0711 18.0711C21.9763 14.1658 21.9763 7.83418 18.0711 3.92893C14.1658 0.0236892 7.83417 0.0236892 3.92893 3.92893C0.0236885 7.83418 0.0236898 14.1658 3.92893 18.0711Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.96954 14.0305C9.64322 15.7041 12.3568 15.7041 14.0305 14.0305C15.7041 12.3568 15.7041 9.64322 14.0305 7.96955C12.3568 6.29587 9.64322 6.29587 7.96954 7.96954C6.29587 9.64322 6.29587 12.3568 7.96954 14.0305Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.8672 9.1531L19.8223 6.29224"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.8477 7.13265L15.7085 2.17749"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.13191 12.847L2.17676 15.7078"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.15285 14.8673L6.29199 19.8225"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.8477 14.8673L15.7085 19.8225"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.8672 12.847L19.8223 15.7078"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.15285 7.13271L6.29199 2.17755"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.13191 9.1531L2.17676 6.29224"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p class="mx-[8px] text-[16px] leading-[20px]">Support</p>
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
          </MenuButton>
        </div>
        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <MenuItems
            class="absolute top-[10%] left-[87.5%] w-[230px] rounded-[6px] shadow-lg bg-[#2D3134] ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div class="py-1">
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? ' text-[#FB8122]' : 'text-[#E1E2E2]',
                    'block text-center pt-[10px] text-[16px]'
                  ]"
                  >Support1</a
                >
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? ' text-[#FB8122]' : 'text-[#E1E2E2]',
                    'block text-center pt-[21px] text-[16px]'
                  ]"
                  >Support2</a
                >
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? ' text-[#FB8122]' : 'text-[#E1E2E2]',
                    'block text-center py-[21px] text-[16px]'
                  ]"
                  >Support3</a
                >
              </MenuItem>
              <form method="POST" action="#">
                <MenuItem v-slot="{ active }">
                  <button
                    type="submit"
                    :class="[
                      active ? ' text-[#FB8122]' : 'text-[#E1E2E2]',
                      'block w-full text-center pb-[10px] text-[16px]'
                    ]"
                  >
                    Support4
                  </button>
                </MenuItem>
              </form>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
</script>
