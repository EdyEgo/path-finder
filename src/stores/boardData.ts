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
        startPoint:[number,number] //['1','7']  row number , column number          {[key:string]:string}  // rowstring:columnstring 
        targetPoint:[number,number] 
        weightPoint:[number,number] | []
        bombPoint:[number,number] | []
       
        dragNodesEnabled:boolean
        draggedNodeStatus:NodeObjectType | null
        disableActionButtons:boolean
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
        startPoint:[10,15],
        targetPoint:[12,35],
        weightPoint:[],
        bombPoint:[],
        
        
        dragNodesEnabled:false,
        draggedNodeStatus:null,
        //
        disableActionButtons:false,
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
   
    changeNodeInDragStatus(node:NodeObjectType | null){
      this.draggedNodeStatus= node
    },

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
    
     
   const isStart =  row === this.startPoint[0] && col === this.startPoint[1];
   const isFinish = row === this.targetPoint[0] && col === this.targetPoint[1];
  
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
      isPath:false,
      status: isStart ? 'start' : isFinish ? 'target' : 'unvisited'
    };
  },

 

  
  visualizeDjkstra(noAnimation?:boolean){


    const grid = this.grid
   
   
   
   
   
  
   
   const startNode = grid[this.startPoint[0]][this.startPoint[1]];
   const finishNode = grid[this.targetPoint[0]][this.targetPoint[1]];
   const animationTimeAlgorithm =  dijkstra(grid, startNode, finishNode,noAnimation);
   const animationTimeShortesPath = getNodesInShortestPathOrder(finishNode,noAnimation);
 
       return {animationTimeAlgorithm,animationTimeShortesPath}
     
     
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
        return {...oldNodeObject,isVisited:false,previousNode:null,status: oldNodeObject.isPath ? oldNodeObject.status + newGivenStatus : newGivenStatus,distance:Infinity}
       },
       clearPath:()=>{
         //status:oldNodeObject.isVisited && !oldNodeObject.isStart && !oldNodeObject.isFinish ?   '' : oldNodeObject.status +  newGivenStatus
         return {...oldNodeObject,isVisited:false,previousNode:null,status:oldNodeObject.isVisited && oldNodeObject.isStart === false && oldNodeObject.isFinish ===false ?   '' :   'unvisited',distance:Infinity}
       },
       
       visited:()=>{
        return {...oldNodeObject,isWall:false,isVisited:true,isFinish:false,isStart:false,isBomb:false,status:newGivenStatus}
      },
      un_start:()=>{
       return {...oldNodeObject,isStart:false,status:'unvisited'}
      },
      un_target:()=>{
        return {...oldNodeObject,isFinish:false,status:'unvisited'}
      },
      un_bomb:()=>{
        return {...oldNodeObject,isBomb:false,status:'unvisited'}
      },
      
     }

     return givenStatusList[newGivenStatus]()

  },
  
  //  resetAnimationPreviosTime()
 
  activateAnAlghorithmFromList(selectedAlgorithm:string,noAnimation?:boolean){
    resetAnimationPreviosTime()

    if(this.boardHasPath){
      // clear path but not the walls added if an previous algorithm has already made a path 
      this.clearPath()
      this.boardHasPath = false

}

const algorithmsList:{[key:string]:()=>{animationTimeAlgorithm:number,animationTimeShortesPath:number}} = {
        Dijkstra:()=>{
               return this.visualizeDjkstra(noAnimation)
        }
}
  
// make buttons inactive 
  this.disableActionButtons = true
  this.dragNodesEnabled = false
  const {animationTimeAlgorithm,animationTimeShortesPath} =   algorithmsList[selectedAlgorithm]() 

  // set action buttons to active after the animation finishes 

  if(noAnimation){
    
    this.disableActionButtons = false
    this.dragNodesEnabled = true
    this.changeBoardPathStatus(true)
    return 
  }
  setTimeout(()=>{
    this.disableActionButtons = false
    this.dragNodesEnabled = true
    // you can press the action buttons now
  }, animationTimeShortesPath)

// after the algorithm has made a path change a status of the board on hasPath variable
    this.changeBoardPathStatus(true)
    
  },

  clearWallsAndWeights(){
    this.dragNodesEnabled = false
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

  clearPath(keepDragEnabled?:boolean){
    if(!keepDragEnabled)  this.dragNodesEnabled = false
   
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
          this.grid[uniqueOldStatusRowIndex][uniqueOldStatusColumnIndex] = this.helperNodeStatusChange(this.grid[uniqueOldStatusRowIndex][uniqueOldStatusColumnIndex],'un_' + newStatus)
       
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