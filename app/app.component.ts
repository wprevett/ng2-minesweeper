import { Component } from '@angular/core';
import { ITile } from './models/tile';
import { TileComponent } from './tile/tile.component';
@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  moduleId: module.id,
  providers:[ITile],
  directives:[TileComponent]
})
export class AppComponent {
    width:number = 10;
    height:number = 10;
    numBombs:number = this.width * this.height / 10;
    tiles:ITile[][] = [];
    debugTiles:ITile[][] = [];
    bombTiles:any[] = [];
    constructor(){
        this.generateMap();
    }
    
    generateMap():void{
        this.generateTiles();
        
        this.addBombs();
        this.calculateTileValues();
        
        this.addDebugTiles();
        
    }
    
    generateTiles():void{
        //populate first dimension
        for (let r = 0; r < this.width; r++){
            this.tiles.push([]);
        }
        //create tile instances
        for (let r = 0; r < this.width; r++) {
            for(let c = 0; c < this.height; c++){
                this.tiles[r].push({ isBomb : false, value : 0, row:r, column:c, state:ITile.HIDDEN });
            }   
        }
    }
    
    addBombs():void{
        for (let b = 0; b < this.numBombs; b++){
            this.chooseBombTile();
        }
    }
    
    calculateTileValues():void{
        //calculate values
        for (let b = 0; b < this.bombTiles.length; b++){
            let row = this.bombTiles[b].r;
            let col = this.bombTiles[b].c;
            for(let r = row - 1; r < row + 2; r++){
                for(let c = col - 1; c < col + 2; c++){
                    if(this.tiles[r] && this.tiles[r][c])
                    {
                        let thisTile = this.tiles[r][c];
                        if(!thisTile.isBomb){
                            thisTile.value++;
                        }
                    }
                }
            }
        }
    }
    
    onTileShown(tile:ITile){
        if(tile.isBomb){
            // game over
            //alert('Game over');
        }
        else if (tile.value == 0){
            // cascade tile flips
            this.cascadeEmptyTiles(tile);
        }
    }
    
    cascadeEmptyTiles(tile:ITile){
        for(let r = tile.row - 1; r < tile.row + 2; r++){
            for(let c = tile.column - 1; c < tile.column + 2; c++){
                if(this.tiles[r] && this.tiles[r][c])
                {
                    let thisTile = this.tiles[r][c];
                    if(thisTile.state == ITile.HIDDEN && !thisTile.isBomb){
                        let newTile = { isBomb : thisTile.isBomb, value : thisTile.value, row:thisTile.row, column:thisTile.column, state:ITile.SHOWN };
                        this.tiles[newTile.row][newTile.column] = newTile;
                        if(newTile.value == 0){
                            this.cascadeEmptyTiles(newTile);   
                        }
                    }
                }
            }
        }
    }
    
    chooseBombTile():void{
        let found:boolean = false;
        let col:number;
        let row:number;
        while(!found){
            row = Math.floor(Math.random() * this.width);
            col = Math.floor(Math.random() * this.height);
            if(!this.tiles[row][col].isBomb){
                this.tiles[row][col].isBomb = true;
                this.bombTiles.push({r:row, c:col});
                found = true;
            }
        }
    }
    
    addDebugTiles():void{
        let serialized = JSON.stringify(this.tiles);
        this.debugTiles = JSON.parse(serialized);
        
        for (let r = 0; r < this.width; r++) {
            for(let c = 0; c < this.height; c++){
                this.debugTiles[r][c].state = ITile.SHOWN;
            }   
        }
    }
}