export class ITile{
    static HIDDEN:number = 0;
    static SHOWN:number = 1;
    static HIDDEN_MOUSE_DOWN: number = 2;
    static FLAGGED: number = 3;
    state:number;
    
    value:number;
    isBomb:boolean;
    row:number;
    column:number;
}