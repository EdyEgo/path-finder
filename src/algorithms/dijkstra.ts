// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.


import type { NodeObjectType} from '@/types/algorithms'
import {animationTimeHelper} from '@/services/animationHelpers'


export  function dijkstra(grid:any, startNode:any, finishNode:any) {
    
     const visitedNodesInOrder = [];
     startNode.distance = 0;
     const unvisitedNodes = getAllNodes(grid);
     let lastNodeAnimationTime = 0
     console.log('unvizited nodes',unvisitedNodes)
     while (!!unvisitedNodes.length) {
       sortNodesByDistance(unvisitedNodes);
       const closestNode = unvisitedNodes.shift();
       // If we encounter a wall, we skip it.
       if (closestNode.isWall) continue;
       // If the closest node is at a distance of infinity,
       // we must be trapped and should therefore stop.
       if (closestNode.distance === Infinity) return lastNodeAnimationTime //visitedNodesInOrder;
       closestNode.isVisited = true;
  
      // animation helper
      lastNodeAnimationTime = animationTimeHelper(closestNode,closestNode.status + ' visited')
     
       visitedNodesInOrder.push(closestNode);
       if (closestNode === finishNode) return lastNodeAnimationTime //visitedNodesInOrder;
       updateUnvisitedNeighbors(closestNode, grid);
     }
     return lastNodeAnimationTime
   }
   
   function sortNodesByDistance(unvisitedNodes:any) {
     unvisitedNodes.sort((nodeA:any, nodeB:any) => nodeA.distance - nodeB.distance);
   }
   
   function updateUnvisitedNeighbors(node:any, grid:any) {
     const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
     for (const neighbor of unvisitedNeighbors) {
       neighbor.distance = node.distance + 1;
       neighbor.previousNode = node;
     }
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
   
   
   function getAllNodes(grid:any) {
     const nodes = [];
     for (const row of grid) {
       for (const node of row) {
         nodes.push(node);
       }
     }
     return nodes;
   }
   
   // Backtracks from the finishNode to find the shortest path.
   // Only works when called *after* the dijkstra method above.
   export function getNodesInShortestPathOrder(finishNode:NodeObjectType) {
    //  const nodesInShortestPathOrder = [];
     let currentNode = finishNode;
     let lastNodeAnimationTime = 0
     while (currentNode !== null) {
      //  nodesInShortestPathOrder.unshift(currentNode);
      lastNodeAnimationTime =  animationTimeHelper(currentNode,currentNode.status + ' short-path ')
       currentNode = currentNode.previousNode;
      
     }
     return lastNodeAnimationTime
    //  return nodesInShortestPathOrder;
   }


































   export function myDijkstra(grid:[NodeObjectType][],startNode:NodeObjectType){
       startNode.distance = 0
      const unvisitedNodes = myGetAllNodes(grid) 

      while(!!unvisitedNodes){

      }


   }


 function myGetAllNodes(grid:[NodeObjectType][]){
     const nodes:NodeObjectType[] = []

     grid.forEach((row)=>{
        row.forEach((node)=>{
          nodes.push(node)
        })
     })
     return nodes
 }
   