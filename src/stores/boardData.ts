import { defineStore } from 'pinia'

interface ColumnInfo{
    status:string,className:string
}

export const useBoardData = defineStore({
  id: 'columnsData',

  state: () => {
      // make your own algorithm
    return <
      {
        rowsNumber : number
        columnsNumber : number
        // columnsWithObstacles:{[key:string]:{[key:string]:{wall:string,bomb:string}}}
        columnsInfo:{[key:string]:{[key:string]:ColumnInfo}} 
        createdRows:number
        createColumns:number
        // status can be : wall , pathSearched , pathTraveled , bomb/blackHole
        startPoint:{[key:string]:string}  // rowstring:columnstring 
        finishPoint:{[key:string]:string} 
      }
    >{
        rowsNumber : screen.width > 790 ? 28 :21,
        columnsNumber : screen.width > 790 ? 75 : 32,
        createdRows:0,
        createColumns: 0,
        columnsInfo:{},
        startPoint:{},
        finishPoint:{}
    }
  },

  // persist: true,

  getters: {},

  actions: {
      
  createInitRowObject(rowIndex:string){
    this.columnsInfo[rowIndex] = {}
   
  },
  createInitColumnObject(rowIndex:string,columnIndex:string){
   
    this.columnsInfo[rowIndex] = {[columnIndex]:{status:'clean',className:'bg-red-400'}}
    console.log('after math',rowIndex,'gg',columnIndex,'and store',this.columnsInfo)
 
    // console.log('now my shit is', this.columnsInfo)
  },

    // createInitialRowWithColumnInfo(rowIndex:string,columnIndex:string){
    //  if( typeof this.columnsInfo[rowIndex] !== 'object' ){
    //   this.columnsInfo[rowIndex] = {}
    //  }
    //     this.columnsInfo[rowIndex] = {[columnIndex]:{status:'clean',className:'bg-red-400'}}
       
    // },
    incrementCreatedRowsByOne(){
      this.createdRows += 1
     return this.createdRows
    },
    incrementCreatedColumnsByOne(){
     return  this.createColumns += 1
    },

    saveColumnsInfo(rowIndex:string,columnIndex:string,columnInfo:ColumnInfo | null){
   
    },

    resetBoard(){

    }
    
   
  }
})