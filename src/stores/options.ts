import { defineStore } from 'pinia'


export const useOptions = defineStore({
  id: 'options',

  state: () => {
    return <
      {
       selectedAlgorithm:string
       algorithms:string[]
       selectedPattern:string
       patterns:string[]
       selectedSpeed:string
       speeds:string[]
       selectedMode:string
      }
    >{
      selectedAlgorithm:'No algorithm selected',
      algorithms:['Dijkstra','BreadthFirstSearch','Depth-first Search'],
       selectedPattern:'No pattern selected',
       patterns:['Recursive Division','Recursive Division(vertical skew)'],
       selectedSpeed:'fast',
       speeds:['fast','medium','slow'],
      selectedMode:"wall"
    }
  },

  // persist: true,

  getters: {},

  actions: {
  
    changeSelectedMode(newMode:string){
      this.selectedMode = newMode
    },

    changeSelectables(selectedAlgorithm:string,selectedPattern:string,selectedSpeed:string){
     this.selectedAlgorithm = selectedAlgorithm
     this.selectedPattern = selectedPattern
     this.selectedSpeed = selectedSpeed
    
    }
    
  }
})
