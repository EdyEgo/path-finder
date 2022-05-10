import {getAllNodes} from './helpers'
import type {NodeObjectType} from '../types/algorithms'

export function breadthFirstSearch(grid:any, startNode:NodeObjectType, finishNode:NodeObjectType,noAnimation:boolean | undefined){
     const  unvisitedNodes = getAllNodes(grid)
     startNode.isVisited = true
     const queue = [startNode] 
    
     const traversalOrder = [] // vizited
    //  queue.push(startNode)

     while(queue.length >= 1){
         const removedQueueFirstNode = queue.shift()
         if(removedQueueFirstNode){
           removedQueueFirstNode.isVisited = true
           traversalOrder.push(removedQueueFirstNode)
        }
        // for(let nodeIndex = 1;nodeIndex < ){

        // }

     }
}


// function updateUnvisitedNeighbors(node:any, grid:any) {
//     const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
//     for (const neighbor of unvisitedNeighbors) {
//       neighbor.distance = node.distance + 1;
//     //   neighbor.previousNode = node;
//     }
//   }
   
 function visitNeighborsNodes(node:any,grid:any[]){
    const neighbors = [];
    const {col, row} = node;
 
 }

  function getUnvisitedNeighbors(node:any, grid:any) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]); // check up
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // check down 
    if (col > 0) neighbors.push(grid[row][col - 1]);// check left 
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // check right // its grid[0] because you have the guarantee that the first row will always exists
    return neighbors.filter(neighbor => !neighbor.isVisited); // return only the unVisited nodes(filter them in an array list)
  }
