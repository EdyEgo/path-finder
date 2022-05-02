import { defineStore } from 'pinia'

interface ColumnInfo{
    status:string
}

export const useBoardData = defineStore({
  id: 'columnsData',

  state: () => {
  
    return <
      {
        rowsNumber : number
        columnsNumber : number
       
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
      


    createInitialRowWithColumnInfo(rowIndex:string,columnIndex:string){
     if( typeof this.columnsInfo[rowIndex] !== 'object' ){
    
      this.columnsInfo[rowIndex] = {[columnIndex]:{status:'clean'}}
      return 
     }
        this.columnsInfo[rowIndex][columnIndex]= {status:'clean'}
  
       
    },
    
    changeColumnStatus(rowIndex:string,columnIndex:string,newStatus:string){
      this.columnsInfo[rowIndex][columnIndex].status = newStatus
      console.log('modified column', this.columnsInfo[rowIndex][columnIndex])
    },

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