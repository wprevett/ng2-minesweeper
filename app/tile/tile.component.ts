import {Component, Input, EventEmitter, Output} from "@angular/core"
import {ITile} from '../models/tile'

@Component({
    selector:'tile',
    moduleId:module.id,
    templateUrl:'./tile.component.html'
})
export class TileComponent {
    
    @Input()tile:ITile;
    @Output() onTileShown = new EventEmitter<ITile>();
    classText:string = 'tile tile-hidden';
    
    constructor(_tile:ITile){
        this.tile = _tile;
    }
    
    onContextMenu():boolean {
        return false;
    }
    
    onMouseLeave():void {
        this.tile.state = this.tile.state == ITile.SHOWN || this.tile.state == ITile.FLAGGED ? this.tile.state : ITile.HIDDEN;
        this.updateTile();
    }
    
    onMouseDown():void {
        this.tile.state = this.tile.state == ITile.HIDDEN ? ITile.HIDDEN_MOUSE_DOWN : this.tile.state;
        this.updateTile();
    }
    
    onMouseUp(event:MouseEvent):void{
        if(this.tile.state == ITile.HIDDEN_MOUSE_DOWN){
            this.tile.state = event.which == 1 ? ITile.SHOWN : event.which == 3 ? ITile.FLAGGED : ITile.HIDDEN;
            this.updateTile();
            if(event.which == 1){
                this.onTileShown.emit(this.tile);
            }
        }
        if(this.tile.state == ITile.FLAGGED && event.which == 1){
            this.tile.state = ITile.HIDDEN;
        }
    }
    
    ngOnChanges(){
        this.updateTile();
    }
    
    updateTile():void{
        switch(this.tile.state){
            case ITile.HIDDEN:
                this.classText = 'tile tile-hidden'
                break;
            case ITile.HIDDEN_MOUSE_DOWN:
                this.classText = 'tile tile-hidden-mouse-down'
                break;
            case ITile.SHOWN:
                if(this.tile.isBomb){
                    this.classText = 'tile tile-bomb';
                }
                else{
                    this.classText = `tile tile-${this.tile.value}`
                } 
                break;
            case ITile.FLAGGED:
                this.classText = 'tile tile-flagged';
                break;
        }
    }
}