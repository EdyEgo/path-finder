<script lang="ts" setup>
import { ref, defineProps, onMounted, watchEffect, watch } from "vue";
import { useBoardData } from "../stores/boardData";
import { useOptions } from "../stores/options";

const boardStore = useBoardData();
const optionsStore = useOptions();

const props = defineProps<{
  nodeColumnObject: any;
  indexColumn: number;
  indexRow: number;
}>();

const clickModeStatus = ref();
const dragNodesEnabled = ref(boardStore.$state.dragNodesEnabled);

watchEffect(() => {
  optionsStore.selectedMode;
  clickModeStatus.value = optionsStore.selectedMode;
});

const columnIndex = ref("column-" + props.indexColumn.toString());
const columnAspect = ref<string>(
  boardStore.$state.grid[props.indexRow][props.indexColumn].status
);

function nodeIsDraggAble(){
  const isTargetOrStart = boardStore.$state.grid[props.indexRow][props.indexColumn].status.includes("target") ? true :
    boardStore.$state.grid[props.indexRow][props.indexColumn].status.includes("start") ? true : false

    return boardStore.$state.dragNodesEnabled === true && isTargetOrStart
}

watchEffect(() => {
  boardStore.$state.grid[props.indexRow][props.indexColumn].status; // watch the status

  columnAspect.value = boardStore.$state.grid[props.indexRow][props.indexColumn].status;
});

function changeColumnStatus(customStatus?:string) {
  // here we gonna look at the options too see what modude is selected(ex wall , blackHole/bomb)
  // and on click or on hover or on click keept pressed change the column object and add that style to
  // the columnAspect
  if(customStatus){

    boardStore.changeColumnStatus(props.indexRow, props.indexColumn, customStatus);
    columnAspect.value = customStatus;
    return 
  }
  boardStore.changeColumnStatus(props.indexRow, props.indexColumn, clickModeStatus.value);

  columnAspect.value = clickModeStatus.value;
}

function handleMouseDown() {
  boardStore.changeNodeInDragStatus(
    boardStore.$state.grid[props.indexRow][props.indexColumn]
  );

  console.log("drag up  ");
}
function handleMouseEnter() {
  // here change the target and the start point and beggin the current algorithm , but without animation

  if (boardStore.$state.draggedNodeStatus !== null) {
    // if boardStore.$state.draggedNodeStatus , beggin the prosses of running the algorithm
    // we are in the future start/target node , 
    //so take the status of the dragged node and move it to this one , then clear path and start algorithm
     const targetOrStart = boardStore.$state.draggedNodeStatus.status.includes('target') ? 'target' : 'start'
     changeColumnStatus(targetOrStart)
    
     boardStore.clearPath(true)
     //

     const selectedAlgorithm = optionsStore.$state.selectedAlgorithm
  boardStore.activateAnAlghorithmFromList(selectedAlgorithm)

    boardStore.$state.grid[props.indexRow][props.indexColumn]

  }

  console.log(" hover with maybe drag up ");
}
function handleMouseUp() {
  boardStore.changeNodeInDragStatus(null);
  console.log(
    "drag down ",
    "ss",
    boardStore.$state.grid[props.indexRow][props.indexColumn]
  );
}
</script>

<template>
  <!-- @mouseenter="changeColumnAspect" -->
  <td
    class=""
    :class="[columnAspect, columnIndex]"
    @click="boardStore.$state.dragNodesEnabled === false && changeColumnStatus()"
    @mousedown="
      (  nodeIsDraggAble() &&
          handleMouseDown())
    "
    @mouseup="
       
          handleMouseUp()
    "
    @mouseenter="boardStore.$state.dragNodesEnabled && handleMouseEnter()"
  >
    
    <!-- <div class="start " :class="columnAspect === 'unvisited' ? '':'hidden'">
                  
                   </div> -->
    <div class="relative start" :class="columnAspect.includes('start') ? '' : 'hidden'">
      <svg class="absolute -top-2" width="1em" height="1em" viewBox="0 0 72 72">
        <path
          fill="#FCEA2B"
          d="M16.12 48.114c-3.158 3.163-4.652 7.56-3.97 11.688c4.128.676 8.522-.82 11.683-3.977c3.158-3.163 4.652-7.56 3.97-11.688c-4.128-.676-8.522.82-11.683 3.977z"
        ></path>
        <path
          fill="#61B2E4"
          d="M31.973 45.839a4.985 4.985 0 0 1-1.362 2.55a4.986 4.986 0 0 1-1.145.852a29.857 29.857 0 0 1 4.695 9.75c.71-.62 1.391-1.278 2.042-1.968a30.742 30.742 0 0 0 4.852-6.832a30.743 30.743 0 0 0 2.744-7.636c-3.729 1.955-7.772 3.077-11.826 3.284z"
        ></path>
        <path
          fill="#92D3F5"
          d="M14.923 35.749c-.69.65-1.347 1.33-1.97 2.038a29.864 29.864 0 0 1 9.761 4.679c.227-.414.51-.794.844-1.128a4.988 4.988 0 0 1 2.542-1.36c.21-4.05 1.336-8.09 3.292-11.814l.006-.011a30.762 30.762 0 0 0-7.64 2.743a30.746 30.746 0 0 0-6.835 4.853z"
        ></path>
        <path
          fill="#EA5A47"
          d="M34.821 20.747c-5.231 5.25-8.367 12.164-8.723 19.233a4.989 4.989 0 0 1 4.515 1.358a4.985 4.985 0 0 1 1.356 4.534c7.076-.361 13.992-3.503 19.242-8.74c6.712-6.723 9.885-16.067 8.434-24.84a26.146 26.146 0 0 0-5.292-.313c-7.174.292-14.21 3.45-19.532 8.767v.001zm10.249-.53a4.716 4.716 0 0 1 6.669 0a4.713 4.713 0 0 1 .002 6.668h-.001a4.717 4.717 0 0 1-6.67-6.667z"
        ></path>
        <path
          fill="#F1B31C"
          d="M26.538 52.037a14.471 14.471 0 0 1-3.007 2.562c-3.49 2.223-7.725 2.834-11.441 1.653c-.15 1.196-.13 2.391.06 3.55c4.128.676 8.522-.82 11.683-3.978a14.425 14.425 0 0 0 2.705-3.787z"
        ></path>
        <path
          fill="#D22F27"
          d="M26.204 38.687c-.033.428-.056.856-.068 1.283a4.985 4.985 0 0 1 5.833 5.901c7.075-.361 13.99-3.503 19.24-8.74a30.823 30.823 0 0 0 3.974-4.935a30.864 30.864 0 0 1-4.352 3.308c-7.558 4.71-16.694 5.892-24.628 3.183h.001z"
        ></path>
        <path d="M36.166-14.451z"></path>
        <path
          fill="#61B2E4"
          d="M24.039 48.551c.87-.437 1.72-.918 2.55-1.438a31.73 31.73 0 0 0 6.63-5.555l.002-.003a31.73 31.73 0 0 0 4.733-6.912a.985.985 0 0 0 .105-.387c-3.399-.753-14.846 10.251-14.02 14.295z"
        ></path>
        <path
          d="M48.405 29.49c-3.276 0-5.941-2.664-5.941-5.94s2.665-5.938 5.941-5.938s5.941 2.664 5.941 5.939s-2.665 5.939-5.941 5.939zm0-9.899a3.964 3.964 0 0 0-3.96 3.96a3.964 3.964 0 0 0 3.96 3.96a3.964 3.964 0 0 0 3.96-3.96a3.964 3.964 0 0 0-3.96-3.96z"
        ></path>
        <path
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="1.949"
          d="M20.653 45.063a14.377 14.377 0 0 0-4.533 3.05c-3.158 3.164-4.652 7.56-3.97 11.688c4.128.676 8.522-.82 11.683-3.977a14.374 14.374 0 0 0 3.053-4.532M14.923 35.749c-.69.65-1.347 1.33-1.97 2.038a29.864 29.864 0 0 1 9.761 4.679c.227-.414.51-.794.844-1.128a4.988 4.988 0 0 1 2.542-1.36c.21-4.05 1.336-8.09 3.292-11.814l.006-.011a30.762 30.762 0 0 0-7.64 2.743a30.746 30.746 0 0 0-6.835 4.853h0zm17.05 10.09a4.985 4.985 0 0 1-1.362 2.55a4.986 4.986 0 0 1-1.145.852a29.857 29.857 0 0 1 4.695 9.75c.71-.62 1.391-1.278 2.042-1.968a30.742 30.742 0 0 0 4.852-6.832a30.743 30.743 0 0 0 2.744-7.636c-3.729 1.955-7.772 3.077-11.826 3.284h0z"
        ></path>
        <path
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="1.949"
          d="M31.83 43.345c.27.886.25 1.692.137 2.525c7.076-.362 13.993-3.504 19.243-8.742c6.71-6.721 9.884-16.063 8.435-24.834c-8.771-1.436-18.108 1.742-24.823 8.451c-5.232 5.251-8.368 12.164-8.724 19.234a4.979 4.979 0 0 1 2.77.239"
        ></path>
        <path
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="1.949"
          d="M37.072 34.196h0a30.755 30.755 0 0 0-6.7 4.584a30.743 30.743 0 0 0-5.384 6.421a29.987 29.987 0 0 0-1.392 2.47"
        ></path>
      </svg>
    </div>
    <div class="relative target" :class="columnAspect.includes('target') ? '' : 'hidden'">
      <svg class="absolute -top-2" width="1em" height="1em" viewBox="0 0 100 100">
        <path
          fill="currentColor"
          d="M50 0a3.5 3.5 0 0 0-3.5 3.5v80A3.5 3.5 0 0 0 50 87a3.5 3.5 0 0 0 3.5-3.5V47h43a3.5 3.5 0 0 0 3.5-3.5v-40A3.5 3.5 0 0 0 96.5 0h-46a3.5 3.5 0 0 0-.254.01A3.5 3.5 0 0 0 50 0zm13.8 7h9.8v7.43h9.8V7H93v7.43h-9.6v9.799H93v9.8h-9.6V40h-9.8v-5.97h-9.8V40H54v-5.97h9.8v-9.801H54v-9.8h9.8V7zm0 7.43v9.799h9.8v-9.8h-9.8zm9.8 9.799v9.8h9.8v-9.8h-9.8z"
          color="currentColor"
        ></path>
        <path
          fill="currentColor"
          d="M38.004 76.792C27.41 78.29 20 81.872 20 87.143C20 94.243 32.381 100 50 100s30-5.756 30-12.857c0-5.272-7.41-8.853-18.003-10.35l-1.468 2.499C68.514 80.399 74 82.728 74 85.429c0 3.787-10.745 6.857-24 6.857s-24-3.07-24-6.857c-.001-2.692 5.45-5.018 13.459-6.13c-.484-.836-.97-1.67-1.455-2.507z"
          color="currentColor"
        ></path>
      </svg>
    </div>

    <div class="relative bomb" :class="columnAspect === 'bomb' ? '' : 'hidden'">
      <svg class="absolute -top-2" width="1em" height="1em" viewBox="0 0 512 512">
        <path
          fill="#D0C9BF"
          d="M328.965 140.508a7.322 7.322 0 0 1-4.947-1.915a7.353 7.353 0 0 1-.489-10.388c16.239-17.844 36.276-29.311 57.947-33.16c17.961-3.188 36.882-1.113 53.273 5.849a7.356 7.356 0 0 1 3.894 9.643a7.356 7.356 0 0 1-9.644 3.893c-25.471-10.818-63.695-10.281-94.594 23.673a7.332 7.332 0 0 1-5.44 2.405z"
        ></path>
        <path
          fill="#384C59"
          d="m344.472 183.587l11.735-11.735c14.059-14.059 14.059-36.853 0-50.912l-13.455-13.455c-14.059-14.059-36.853-14.059-50.912 0l-20.097 20.097c-22.701-9.815-47.729-15.264-74.034-15.264c-103.131 0-186.735 83.604-186.735 186.735s83.604 186.735 186.735 186.735s186.735-83.604 186.735-186.735c0-43.59-14.938-83.691-39.972-115.466z"
        ></path>
        <path
          fill="#FFC145"
          d="M453.976 104.663c0 12.186-9.915 22.101-22.102 22.101s-22.101-9.915-22.101-22.101s9.914-22.101 22.101-22.101s22.102 9.915 22.102 22.101zm-13.768-37.258V39.952c0-4.603-3.731-8.334-8.334-8.334s-8.334 3.731-8.334 8.334v27.453a8.334 8.334 0 0 0 16.668 0zM411.422 84.21a8.333 8.333 0 0 0 0-11.786L392.01 53.012a8.334 8.334 0 0 0-11.785 11.786l19.412 19.412c1.627 1.627 3.76 2.441 5.893 2.441s4.265-.814 5.892-2.441zm-19.412 72.102l19.412-19.412a8.334 8.334 0 0 0-11.785-11.786l-19.412 19.412a8.333 8.333 0 0 0 5.893 14.227a8.306 8.306 0 0 0 5.892-2.441zm48.198 13.061V141.92c0-4.603-3.731-8.334-8.334-8.334s-8.334 3.731-8.334 8.334v27.453c0 4.603 3.731 8.334 8.334 8.334s8.334-3.731 8.334-8.334zm43.316-13.061a8.333 8.333 0 0 0 0-11.786l-19.412-19.412a8.334 8.334 0 0 0-11.785 11.786l19.412 19.412c1.627 1.627 3.76 2.441 5.893 2.441s4.265-.814 5.892-2.441zm21.395-51.649a8.334 8.334 0 0 0-8.334-8.334h-27.453c-4.603 0-8.334 3.731-8.334 8.334s3.731 8.334 8.334 8.334h27.453a8.334 8.334 0 0 0 8.334-8.334zM464.112 84.21l19.412-19.412a8.334 8.334 0 0 0-11.785-11.786l-19.412 19.412a8.333 8.333 0 0 0 5.893 14.227a8.306 8.306 0 0 0 5.892-2.441z"
        ></path>
        <ellipse
          cx="138.274"
          cy="186.373"
          fill="#80878C"
          rx="57"
          ry="35.419"
          transform="rotate(156.273 138.27 186.36)"
        ></ellipse>
      </svg>
    </div>

    <div class="relative weight" :class="columnAspect === 'weight' ? '' : 'hidden'">
      <svg class="absolute -top-2" width="1.25em" height="1em" viewBox="0 0 640 512">
        <path
          fill="currentColor"
          d="M352 176c17.7 0 32 14.3 32 32s-14.3 32-32 32h-32.9v208H368c5.4 0 10.8-.5 16-1.3V480c0 10.1 2.7 21.3 7.6 30.3c-7.7 1.1-15.6 1.7-23.6 1.7H208c-88.4 0-160-71.6-160-160v-6.1l-7.03 6.2c-9.37 10.2-24.57 10.2-33.941 0c-9.372-8.5-9.372-23.7 0-33.1l56.001-56c9.37-9.3 24.57-9.3 33.94 0l55.13 56c10.2 9.4 10.2 24.6 0 33.1c-8.5 10.2-23.7 10.2-33.1 0l-7-6.2v6.1c0 53 42.1 96 96 96h48V240h-32c-17.7 0-32-14.3-32-32s14.3-32 32-32h10.9C209 158.8 192 129.4 192 96c0-53.02 42.1-96 96-96c53 0 96 42.98 96 96c0 33.4-17.9 62.8-42.9 80H352zm-64.9-48c18.6 0 32-14.3 32-32c0-17.67-13.4-32-32-32c-16.8 0-32 14.33-32 32c0 17.7 15.2 32 32 32zM528 192c44.2 0 80 35.8 80 80v48c17.7 0 32 14.3 32 32v128c0 17.7-14.3 32-32 32H448c-17.7 0-32-14.3-32-32V352c0-17.7 14.3-32 32-32v-48c0-44.2 35.8-80 80-80zm0 48c-17.7 0-32 14.3-32 32v48h64v-48c0-17.7-14.3-32-32-32z"
        ></path>
      </svg>
    </div>
  </td>
</template>

<style scoped>
.short-path {
  background-color: rgb(179, 255, 0);

  animation-name: roundToSquare;
}
.short-path-no-animation {
  background-color: rgb(179, 255, 0);
}
.wall {
  background-color: black;

  animation-name: roundToSquare;
  animation-duration: 0.5s;
}

.visited {
  background-color: rgb(7, 189, 234);

  animation-name: roundToSquare;
  animation-duration: 0.8s;

  /* border: 1px solid rgb(175, 216, 248); */
  animation-timing-function: ease;
  /* animation-direction: alternate; */
  /* animation-iteration-count: 1; */
  animation-fill-mode: forwards;
  animation-play-state: running;
}
.visited-no-animation {
  background-color: rgb(7, 189, 234);
}

.column-element {
  padding: 0.75rem 0.75rem;
}

/* .start{
  display: flex;
 padding: 0 0;
}
.start:after{
  display: flex;
  pointer-events: none;
 
 content: '\2693';


} */
.void {
  background-color: blue;
}

@keyframes roundToSquare {
  0% {
    transform: scale(0.3);
    border-radius: 100%;
    background-color: rgba(0, 0, 66, 0.75);
  }

  50% {
    transform: scale(1.1);
    background-color: rgba(17, 104, 217, 0.75);
  }
  100% {
    transform: scale(1);
    background-color: rgba(0, 217, 159, 0.75);
  }
}
</style>
