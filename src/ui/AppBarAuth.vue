<template>
  <div
    class="bg-whiteop max-w-full h-[52px] drop-shadow-[0_0px_16px_rgba(0, 0, 0, 0.5)]"
  >
    <div class="px-[32px] py-[11px]">
      <div class="grid grid-cols-2">
        <!--Logo-->
        <div class="flex justify-start items-center">
          <img src="../assets/logo.svg" alt="logo" />
        </div>
        <!--Buttons-->
        <div class="flex justify-end items-center">
          <a
            href="/login"
            class="text-[#272B2D] text-[14px] leading-[18px] px-[17px] py-[6px] bg-[#FB8122] rounded-[6px] border border-[#FB8122] cursor-pointer hover:bg-transparent hover:text-[#FB8122] hover:drop-shadow-buttonAppBarAuth"
          >
            LOG IN</a
          >
          <a
            href="/register"
            class="ml-[4px] text-[#FB8122] text-[14px] leading-[18px] px-[17px] py-[6px] bg-transparent rounded-[6px] border border-[#FB8122] cursor-pointer hover:drop-shadow-buttonAppBarAuth"
            >SIGN UP</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
