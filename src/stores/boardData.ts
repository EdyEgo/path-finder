import { defineStore } from 'pinia'
import {dijkstra,getNodesInShortestPathOrder} from '@/algorithms/dijkstra' 
import {resetAnimationPreviosTime} from '@/services/animationHelpers'
import type { NodeObjectType} from '@/types/algorithms'
interface ColumnInfo{
    status:string
}

// interface NodeObjectType{
//    col: number,
//    row: number,
//    isStart: boolean, 
//    isFinish: boolean, distance: number, 
//    isVisited: boolean, 
//    isWall: boolean, 
//    previousNode: any 
//    isBomb:boolean
//    isWeight:boolean
//    status:string
// }

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
        boardHasPath:boolean
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
        boardHasPath:false,
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
   this.grid = []
    for (let row = 0; row < this.rowsNumber; row++) {
      let currentRow = []
      for (let col = 0; col < this.columnsNumber; col++) {

        currentRow.push(this.createNode(col, row));
      }
      this.grid.push(currentRow);
    }
   
    this.changeBoardPathStatus(false)
    return this.grid;
  },

 changeBoardPathStatus(newStatus:boolean){
  this.boardHasPath  = newStatus
 },
  
  createNode (col:number, row:number):any {
     
   const isStart =  row === this.START_NODE_ROW && col === this.START_NODE_COL;
   const isFinish = row === this.FINISH_NODE_ROW && col === this.FINISH_NODE_COL;
    return {
      col,
      row,
      isStart,
      isFinish,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
      isBomb:false,
      status: isStart ? 'start' : isFinish ? 'target' : 'unvisited'
    };
  },

     testVisualizeDjkstra(){


 const grid = this.grid//this.getInitialGrid();







const startNode = grid[this.START_NODE_ROW][this.START_NODE_COL];
const finishNode = grid[this.FINISH_NODE_ROW][this.FINISH_NODE_COL];
const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
//     this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
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

  
  visualizeDjkstra(){


    const grid = this.grid//this.getInitialGrid();
   
   
   
   
   
   
   
   const startNode = grid[this.START_NODE_ROW][this.START_NODE_COL];
   const finishNode = grid[this.FINISH_NODE_ROW][this.FINISH_NODE_COL];
    dijkstra(grid, startNode, finishNode);
    getNodesInShortestPathOrder(finishNode);
 
       
     
     
     },
  




    createInitialRowWithColumnInfo(rowIndex:string,columnIndex:string){
     if( typeof this.columnsInfo[rowIndex] !== 'object' ){
    
      this.columnsInfo[rowIndex] = {[columnIndex]:{status:'unvisited'}}
      return 
     }
        this.columnsInfo[rowIndex][columnIndex]= {status:'unvisited'}
  
       
    },
    
 

  helperNodeStatusChange(oldNodeObject:NodeObjectType,newGivenStatus:string){
     
     const givenStatusList:{[key:string]:()=>NodeObjectType} = {
       start:()=>{
          return oldNodeObject ={...oldNodeObject,isWall:false,isVisited:false,isFinish:false,isStart:true,status:newGivenStatus}

       },
       target:()=>{
         return {...oldNodeObject,isWall:false,isVisited:false,isFinish:true,isStart:false,status:newGivenStatus}
       },
       wall:()=>{
        return {...oldNodeObject,isWall:true,isVisited:false,isFinish:false,previousNode:null,distance:Infinity,isStart:false,status:newGivenStatus}
       },
       bomb:()=>{
        return {...oldNodeObject,isWall:false,isVisited:false,isFinish:false,previousNode:null,distance:Infinity,isStart:false,isBomb:true,status:newGivenStatus}
       },
       weight:()=>{
        return {...oldNodeObject,isWall:false,isVisited:false,isFinish:false,previousNode:null,distance:Infinity,isStart:false,isBomb:false,isWeight:true,status:newGivenStatus}
       },
       clearWeightAndWall:()=>{
         return {...oldNodeObject,isWall:false,isVisited:false,isFinish:false,isStart:false,isWeight:false,status:'unvisited'}
       },
       unvisited:()=>{
        return {...oldNodeObject,isVisited:false,previousNode:null,status:oldNodeObject.status +  newGivenStatus,distance:Infinity}
       },
       visited:()=>{
        return {...oldNodeObject,isWall:false,isVisited:true,isFinish:false,isStart:false,isBomb:false,status:newGivenStatus}
      }
     }

     return givenStatusList[newGivenStatus]()

  },
  
  //  resetAnimationPreviosTime()
 
  activateAnAlghorithmFromList(selectedAlgorithm:string){
    resetAnimationPreviosTime()

    if(this.boardHasPath){
      // clear path but not the walls added if an previous algorithm has already made a path 
      this.clearPath()
      

}

const algorithmsList:{[key:string]:()=>void} = {
        Dijkstra:()=>{
                this.visualizeDjkstra()
        }
}

    algorithmsList[selectedAlgorithm]() 

// after the algorithm has made a path change a status of the board on hasPath variable
    this.changeBoardPathStatus(true)
  },

  clearWallsAndWeights(){
    resetAnimationPreviosTime()
  //  const clearedNodes =   this.grid.map((row:any)=>{
  //     return row.map((nodeObject:NodeObjectType)=>{
  //        if(nodeObject.isWall || nodeObject.isWeight){
  //         return this.helperNodeStatusChange(nodeObject,'clearWeightAndWall')
  //        }
  //        return nodeObject
  //     })
  //    })
  //    this.grid = clearedNodes
   this.getInitialGrid()

  },

  clearPath(){
    resetAnimationPreviosTime()
    // makes all visited nodes , unvisited
    const clearedNodes =   this.grid.map((row:any)=>{
      return row.map((nodeObject:NodeObjectType)=>{
       if(nodeObject.isVisited){
        return this.helperNodeStatusChange(nodeObject,'unvisited')
       }
        return nodeObject
      })
     })
     this.changeBoardPathStatus(false)
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