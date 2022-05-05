export interface NodeObjectType{
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