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
var core_1 = require('@angular/core');
var tile_1 = require('./models/tile');
var tile_component_1 = require('./tile/tile.component');
var AppComponent = (function () {
    function AppComponent() {
        this.width = 10;
        this.height = 10;
        this.numBombs = this.width * this.height / 10;
        this.tiles = [];
        this.debugTiles = [];
        this.bombTiles = [];
        this.generateMap();
    }
    AppComponent.prototype.generateMap = function () {
        this.generateTiles();
        this.addBombs();
        this.calculateTileValues();
        this.addDebugTiles();
    };
    AppComponent.prototype.generateTiles = function () {
        //populate first dimension
        for (var r = 0; r < this.width; r++) {
            this.tiles.push([]);
        }
        //create tile instances
        for (var r = 0; r < this.width; r++) {
            for (var c = 0; c < this.height; c++) {
                this.tiles[r].push({ isBomb: false, value: 0, row: r, column: c, state: tile_1.ITile.HIDDEN });
            }
        }
    };
    AppComponent.prototype.addBombs = function () {
        for (var b = 0; b < this.numBombs; b++) {
            this.chooseBombTile();
        }
    };
    AppComponent.prototype.calculateTileValues = function () {
        //calculate values
        for (var b = 0; b < this.bombTiles.length; b++) {
            var row = this.bombTiles[b].r;
            var col = this.bombTiles[b].c;
            for (var r = row - 1; r < row + 2; r++) {
                for (var c = col - 1; c < col + 2; c++) {
                    if (this.tiles[r] && this.tiles[r][c]) {
                        var thisTile = this.tiles[r][c];
                        if (!thisTile.isBomb) {
                            thisTile.value++;
                        }
                    }
                }
            }
        }
    };
    AppComponent.prototype.onTileShown = function (tile) {
        if (tile.isBomb) {
        }
        else if (tile.value == 0) {
            // cascade tile flips
            this.cascadeEmptyTiles(tile);
        }
    };
    AppComponent.prototype.cascadeEmptyTiles = function (tile) {
        for (var r = tile.row - 1; r < tile.row + 2; r++) {
            for (var c = tile.column - 1; c < tile.column + 2; c++) {
                if (this.tiles[r] && this.tiles[r][c]) {
                    var thisTile = this.tiles[r][c];
                    if (thisTile.state == tile_1.ITile.HIDDEN && !thisTile.isBomb) {
                        var newTile = { isBomb: thisTile.isBomb, value: thisTile.value, row: thisTile.row, column: thisTile.column, state: tile_1.ITile.SHOWN };
                        this.tiles[newTile.row][newTile.column] = newTile;
                        if (newTile.value == 0) {
                            this.cascadeEmptyTiles(newTile);
                        }
                    }
                }
            }
        }
    };
    AppComponent.prototype.chooseBombTile = function () {
        var found = false;
        var col;
        var row;
        while (!found) {
            row = Math.floor(Math.random() * this.width);
            col = Math.floor(Math.random() * this.height);
            if (!this.tiles[row][col].isBomb) {
                this.tiles[row][col].isBomb = true;
                this.bombTiles.push({ r: row, c: col });
                found = true;
            }
        }
    };
    AppComponent.prototype.addDebugTiles = function () {
        var serialized = JSON.stringify(this.tiles);
        this.debugTiles = JSON.parse(serialized);
        for (var r = 0; r < this.width; r++) {
            for (var c = 0; c < this.height; c++) {
                this.debugTiles[r][c].state = tile_1.ITile.SHOWN;
            }
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app.component.html',
            moduleId: module.id,
            providers: [tile_1.ITile],
            directives: [tile_component_1.TileComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map