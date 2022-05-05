// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.


import type { NodeObjectType} from '@/types/algorithms'


 // row[] , col/node?, yup the grid looks like so\
//  [{
//   col,
//   row,
//   isStart: row === START_NODE_ROW && col === START_NODE_COL,
//   isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
//   distance: Infinity,
//   isVisited: false,
//   isWall: false,
//   previousNode: null,
// },{
//   col,
//   row,
//   isStart: row === START_NODE_ROW && col === START_NODE_COL,
//   isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
//   distance: Infinity,
//   isVisited: false,
//   isWall: false,
//   previousNode: null,
// }]


export function dijkstra(grid:any, startNode:any, finishNode:any) {
   
     const visitedNodesInOrder = [];
     startNode.distance = 0;
     const unvisitedNodes = getAllNodes(grid);
     console.log('unvizited nodes',unvisitedNodes)
     while (!!unvisitedNodes.length) {
       sortNodesByDistance(unvisitedNodes);
       const closestNode = unvisitedNodes.shift();
       // If we encounter a wall, we skip it.
       if (closestNode.isWall) continue;
       // If the closest node is at a distance of infinity,
       // we must be trapped and should therefore stop.
       if (closestNode.distance === Infinity) return visitedNodesInOrder;
       closestNode.isVisited = true;
       visitedNodesInOrder.push(closestNode);
       if (closestNode === finishNode) return visitedNodesInOrder;
       updateUnvisitedNeighbors(closestNode, grid);
     }
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
     if (row > 0) neighbors.push(grid[row - 1][col]);
     if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
     if (col > 0) neighbors.push(grid[row][col - 1]);
     if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
     return neighbors.filter(neighbor => !neighbor.isVisited);
   }
   
   // soooo you need you nodes to be stored like sooo const nodes = [[1,2,3],[1,2,3]]
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
   export function getNodesInShortestPathOrder(finishNode:any) {
     const nodesInShortestPathOrder = [];
     let currentNode = finishNode;
     while (currentNode !== null) {
       nodesInShortestPathOrder.unshift(currentNode);
       currentNode = currentNode.previousNode;
     }
     return nodesInShortestPathOrder;
   }


































   export function myDijkstra(grid:[NodeObjectType][],startNode:NodeObjectType){
       startNode.distance = 0
      const unvisitedNodes = myGetAllNodes(grid)
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
   