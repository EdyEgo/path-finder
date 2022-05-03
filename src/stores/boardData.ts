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
        startPoint:[string,string] | []//['1','7']  row number , column number          {[key:string]:string}  // rowstring:columnstring 
        targetPoint:[string,string] | []
        bombPoint:[string,string] | []
      }
    >{
        rowsNumber : screen.width > 990 ? screen.width > 1280 ? 29 : 29 : 27,//screen.width > 790 ? 28 :21,
        columnsNumber : screen.width > 990 ? screen.width > 1280 ? 46 : 35 : 30,//screen.width > 790 ? 75 : 32,
        createdRows:0,
        createColumns: 0,
        columnsInfo:{},
        startPoint:[],
        targetPoint:[],
        bombPoint:[]
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
      // if status is start or target or bomb , remove the old point with that status and make it clean/unvisited

    if(newStatus === 'start' || newStatus === 'target' || newStatus === 'bomb'){
     
       // change to unvisited the old interest point 
        // this.columnsInfo[]

        const uniqueOldStatusRowIndex = this[`${newStatus}Point`][0];
        const uniqueOldStatusColumnIndex = this[`${newStatus}Point`][1];

       if(uniqueOldStatusRowIndex && uniqueOldStatusColumnIndex){
        // delete old unique node point
        this.columnsInfo[uniqueOldStatusRowIndex][uniqueOldStatusColumnIndex].status = 'unvisited'
       }
  // add the new indexes to the unique node point
       this[`${newStatus}Point`] = [`${rowIndex}`,`${columnIndex}`]

      // this[`${newStatus}Point`]  = new target or start or bomb point
    }

      this.columnsInfo[rowIndex][columnIndex].status = newStatus
    
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