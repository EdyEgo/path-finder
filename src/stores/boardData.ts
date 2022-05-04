import { defineStore } from 'pinia'
import {dijkstra,getNodesInShortestPathOrder} from '@/algorithms/dijkstra' 

interface ColumnInfo{
    status:string
}

interface NodeObjectType{
   col: number,
   row: number,
   isStart: boolean, 
   isFinish: boolean, distance: number, 
   isVisited: boolean, 
   isWall: boolean, 
   previousNode: any 
   isBomb:boolean
   isWeight:boolean
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
        startPoint:[number,number] | []//['1','7']  row number , column number          {[key:string]:string}  // rowstring:columnstring 
        targetPoint:[number,number] | []
        weightPoint:[number,number] | []
        bombPoint:[number,number] | []
     
       

        grid:any//[] | { col: number, row: number, isStart: boolean, isFinish: boolean, distance: number, isVisited: boolean, isWall: boolean, previousNode: any }[]
        START_NODE_ROW : number
         START_NODE_COL : number
         FINISH_NODE_ROW : number
         FINISH_NODE_COL : number
      }
    >{
        rowsNumber : screen.width > 990 ? screen.width > 1280 ? 29 : 29 : 27,//screen.width > 790 ? 28 :21,
        columnsNumber : screen.width > 990 ? screen.width > 1280 ? 46 : 35 : 30,//screen.width > 790 ? 75 : 32,
        createdRows:0,
        createColumns: 0,
        columnsInfo:{},
        startPoint:[],
        targetPoint:[],
        weightPoint:[],
        bombPoint:[],

        //
        grid:[],
        START_NODE_ROW: 10,
         START_NODE_COL: 15,
         FINISH_NODE_ROW: 10,
         FINISH_NODE_COL: 35
    }
  },

  // persist: true,

  getters: {},

  actions: {
  //  getInitialGrid  () {
  //     const grid = [];
  //     for (let row = 0; row < 20; row++) {
  //       const currentRow = [];
  //       for (let col = 0; col < 50; col++) {
  //         currentRow.push(this.createNode(col, row));
  //       }
  //       grid.push(currentRow);
  //     }
  //     return grid;
  //   },
    
  //   createNode (col:number, row:number)  {
  //     return {
  //       col,
  //       row,
  //       isStart: row === this.START_NODE_ROW && col === this.START_NODE_COL,
  //       isFinish: row === this.FINISH_NODE_ROW && col === this.FINISH_NODE_COL,
  //       distance: Infinity,
  //       isVisited: false,
  //       isWall: false,
  //       previousNode: null,
  //     };
  //   }, // old functioning



  getInitialGrid  () {
  
    for (let row = 0; row < this.rowsNumber; row++) {
      let currentRow = []
      for (let col = 0; col < this.columnsNumber; col++) {
        currentRow.push(this.createNode(col, row));
      }
      this.grid.push(currentRow);
    }
    return this.grid;
  },
  
  createNode (col:number, row:number):any {
    return {
      col,
      row,
      isStart: row === this.START_NODE_ROW && col === this.START_NODE_COL,
      isFinish: row === this.FINISH_NODE_ROW && col === this.FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
      isBomb:false,
      status:'unvisited'
    };
  },

     testVisualizeDjkstra(){
// this.columnsInfo[rowIndex][columnIndex]

//// original  

 const grid = this.grid//this.getInitialGrid();



  console.log('my grid is ',grid)

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const startNode = grid[START_NODE_ROW][START_NODE_COL];
const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
// const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);

////


      // const grid = this.columnsInfo;
//       if(!this.startPoint[0] || !this.startPoint[1] || !this.targetPoint[0] || !this.targetPoint[1])  return null
//       const startNodeRow = this.startPoint[0]
//       const startNodeCol = this.startPoint[1]
//       const finishNodeRow = this.targetPoint[0] // target/finish same thing
//       const finishNodeCol =  this.targetPoint[1]

//      const startNode = this.columnsInfo[startNodeRow][startNodeCol] 
// const finishNode = this.columnsInfo[finishNodeRow][finishNodeCol] 


//       const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
      console.log('O_o it works ???',visitedNodesInOrder)
  //     this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    
  
  
  },


    createInitialRowWithColumnInfo(rowIndex:string,columnIndex:string){
     if( typeof this.columnsInfo[rowIndex] !== 'object' ){
    
      this.columnsInfo[rowIndex] = {[columnIndex]:{status:'unvisited'}}
      return 
     }
        this.columnsInfo[rowIndex][columnIndex]= {status:'unvisited'}
  
       
    },
    
  //   changeColumnStatus(rowIndex:string,columnIndex:string,newStatus:string){ // old working
  //     // if status is start or target or bomb , remove the old point with that status and make it clean/unvisited

  //   if(newStatus === 'start' || newStatus === 'target' || newStatus === 'bomb' ){
     
  //      // change to unvisited the old interest point 
  //       // this.columnsInfo[]

  //       const uniqueOldStatusRowIndex = this[`${newStatus}Point`][0];
  //       const uniqueOldStatusColumnIndex = this[`${newStatus}Point`][1];

  //      if(uniqueOldStatusRowIndex && uniqueOldStatusColumnIndex){
  //       // delete old unique node point
  //       this.columnsInfo[uniqueOldStatusRowIndex][uniqueOldStatusColumnIndex].status = 'unvisited'
  //      }
  // // add the new indexes to the unique node point
  //      this[`${newStatus}Point`] = [`${rowIndex}`,`${columnIndex}`]

  //     // this[`${newStatus}Point`]  = new target or start or bomb point
  //   }

  //     this.columnsInfo[rowIndex][columnIndex].status = newStatus
    
  //   },

  helperNodeStatusChange(oldNodeObject:NodeObjectType,newGivenStatus:string){
     
     const givenStatusList:{[key:string]:()=>NodeObjectType} = {
       start:()=>{
          return oldNodeObject ={...oldNodeObject,isWall:false,isVisited:false,isFinish:false,isStart:true,status:newGivenStatus}

       },
       target:()=>{
         return {...oldNodeObject,isWall:false,isVisited:false,isFinish:true,isStart:false,status:newGivenStatus}
       },
       wall:()=>{
        return {...oldNodeObject,isWall:true,isVisited:false,isFinish:false,isStart:false,status:newGivenStatus}
       },
       bomb:()=>{
        return {...oldNodeObject,isWall:false,isVisited:false,isFinish:false,isStart:false,isBomb:true,status:newGivenStatus}
       },
       weight:()=>{
        return {...oldNodeObject,isWall:false,isVisited:false,isFinish:false,isStart:false,isBomb:false,isWeight:true,status:newGivenStatus}
       },
       clearWeightAndWall:()=>{
         return {...oldNodeObject,isWall:false,isVisited:false,isFinish:false,isStart:false,isWeight:false,status:'unvisited'}
       },
       unvisited:()=>{
        return {...oldNodeObject,isWall:false,isVisited:false,isFinish:false,isStart:false,isBomb:false,status:newGivenStatus}
       },
       visited:()=>{
        return {...oldNodeObject,isWall:false,isVisited:true,isFinish:false,isStart:false,isBomb:false,status:newGivenStatus}
      }
     }

     return givenStatusList[newGivenStatus]()

  },

  clearWallsAndWeights(){
   const clearedNodes =   this.grid.map((row:any)=>{
      return row.map((nodeObject:NodeObjectType)=>{
         if(nodeObject.isWall || nodeObject.isWeight){
          return this.helperNodeStatusChange(nodeObject,'clearWeightAndWall')
         }
         return nodeObject
      })
     })
     this.grid = clearedNodes
  },

  clearPath(){
    // makes all visited nodes , unvisited
    const clearedNodes =   this.grid.map((row:any)=>{
      return row.map((nodeObject:NodeObjectType)=>{
       
         return this.helperNodeStatusChange(nodeObject,'unvisited')
      })
     })
     this.grid = clearedNodes
      
  },

  changeColumnStatus(rowIndex:number,columnIndex:number,newStatus:string){
   
        // if status is start or target or bomb , remove the old point with that status and make it clean/unvisited

    if(newStatus === 'start' || newStatus === 'target' || newStatus === 'bomb' ){
     
       // change to unvisited the old interest point 
        // this.columnsInfo[]

        const uniqueOldStatusRowIndex = this[`${newStatus}Point`][0];
        const uniqueOldStatusColumnIndex = this[`${newStatus}Point`][1];

       if(uniqueOldStatusRowIndex && uniqueOldStatusColumnIndex){
        // delete old unique node point
        
          // change status to the old node point
          this.grid[uniqueOldStatusRowIndex][uniqueOldStatusColumnIndex] = this.helperNodeStatusChange(this.grid[uniqueOldStatusRowIndex][uniqueOldStatusColumnIndex],'unvisited')
       
       }
  // add the new indexes to the unique node point
       this[`${newStatus}Point`] = [rowIndex,columnIndex]

      
    }
 
 


     // change status to the edited node point
     this.grid[rowIndex][columnIndex] = this.helperNodeStatusChange(this.grid[rowIndex][columnIndex],newStatus)
    
     return this.grid[rowIndex][columnIndex]
    
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