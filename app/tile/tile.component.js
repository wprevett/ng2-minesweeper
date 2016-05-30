"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var tile_1 = require('../models/tile');
var TileComponent = (function () {
    function TileComponent(_tile) {
        this.onTileShown = new core_1.EventEmitter();
        this.classText = 'tile tile-hidden';
        this.tile = _tile;
    }
    TileComponent.prototype.onContextMenu = function () {
        return false;
    };
    TileComponent.prototype.onMouseLeave = function () {
        this.tile.state = this.tile.state == tile_1.ITile.SHOWN || this.tile.state == tile_1.ITile.FLAGGED ? this.tile.state : tile_1.ITile.HIDDEN;
        this.updateTile();
    };
    TileComponent.prototype.onMouseDown = function () {
        this.tile.state = this.tile.state == tile_1.ITile.HIDDEN ? tile_1.ITile.HIDDEN_MOUSE_DOWN : this.tile.state;
        this.updateTile();
    };
    TileComponent.prototype.onMouseUp = function (event) {
        if (this.tile.state == tile_1.ITile.HIDDEN_MOUSE_DOWN) {
            this.tile.state = event.which == 1 ? tile_1.ITile.SHOWN : event.which == 3 ? tile_1.ITile.FLAGGED : tile_1.ITile.HIDDEN;
            this.updateTile();
            if (event.which == 1) {
                this.onTileShown.emit(this.tile);
            }
        }
        if (this.tile.state == tile_1.ITile.FLAGGED && event.which == 1) {
            this.tile.state = tile_1.ITile.HIDDEN;
        }
    };
    TileComponent.prototype.ngOnChanges = function () {
        this.updateTile();
    };
    TileComponent.prototype.updateTile = function () {
        switch (this.tile.state) {
            case tile_1.ITile.HIDDEN:
                this.classText = 'tile tile-hidden';
                break;
            case tile_1.ITile.HIDDEN_MOUSE_DOWN:
                this.classText = 'tile tile-hidden-mouse-down';
                break;
            case tile_1.ITile.SHOWN:
                if (this.tile.isBomb) {
                    this.classText = 'tile tile-bomb';
                }
                else {
                    this.classText = "tile tile-" + this.tile.value;
                }
                break;
            case tile_1.ITile.FLAGGED:
                this.classText = 'tile tile-flagged';
                break;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', tile_1.ITile)
    ], TileComponent.prototype, "tile", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TileComponent.prototype, "onTileShown", void 0);
    TileComponent = __decorate([
        core_1.Component({
            selector: 'tile',
            moduleId: module.id,
            templateUrl: './tile.component.html'
        }), 
        __metadata('design:paramtypes', [tile_1.ITile])
    ], TileComponent);
    return TileComponent;
}());
exports.TileComponent = TileComponent;
//# sourceMappingURL=tile.component.js.map