// 地图位置
const MAP_BASE_X = 32;
const MAP_BASE_Y = 16;
// 地图尺寸
const MAP_W = 416;
const MAP_H = 416;
// 地图行列数
const MAP_ROWS = 26;
const MAP_COLS = 26;
// 块尺寸
const BLOCK_W = MAP_W / MAP_ROWS;
const BLOCK_H = MAP_H / MAP_COLS;
// "家"尺寸
const HOME_W = 32;
const HOME_H = 32;
// 地图中的块物体
const BLOCK_EMPTY = 0;
const BLOCK_CEMENT_BRICK = 1;
const BLOCK_STEEL_BRICK = 2;
const BLOCK_GRASS = 3;
const BLOCK_WATER = 4;
const BLOCK_ICE = 5;
const BLOCK_NAMES = ['cementBrick', 'steelBrick', 'grass', 'water', 'ice'];
const HOME = 9;
const ANOTHRE_HOME = 8;

let gameMap;

/*
游戏地图
*/
class GameMap extends Drawable {
  constructor(game) {
    super();

    this.canvas = document.getElementById('map');
    this.canvas.style.left = MAP_BASE_X + 'px';
    this.canvas.style.top = MAP_BASE_Y + 'px';
    this.canvas.width = MAP_W;
    this.canvas.height = MAP_H;
    this.context = this.canvas.getContext('2d');

    this.game = game;
    this._width = MAP_W;
    this._height = MAP_H;
  }

  static instance(...args) {
    var gameMap = gameMap || new GameMap(...args);
    return gameMap;
  }

  draw() {
    var imageNameMap = {};
    var map = map1;
    var imgName, w, h;
    // 画背景样式
    this.context.fillStyle = '#000';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    for (var r = 0; r < MAP_ROWS; r++) {
      for (var c = 0; c < MAP_COLS; c++) {
        w = BLOCK_W;
        h = BLOCK_H;
        switch (map[r][c]) {
          case BLOCK_EMPTY:
            continue;
          case BLOCK_CEMENT_BRICK:
            imgName = 'cementBrick';
            break;
          case BLOCK_STEEL_BRICK:
            imgName = 'steelBrick';
            break;
          case BLOCK_GRASS:
            imgName = 'grass';
            break;
          case BLOCK_WATER:
            imgName = 'water';
            break;
          case BLOCK_ICE:
            imgName = 'ice';
            break;
          //case ANOTHRE_HOME:
          case HOME:
            imgName = 'home';
            w = HOME_W;
            h = HOME_H;
            break;
        }

        GameImage.drawImage(
          this.context,
          imgName,
          c * w, r * h,
          w, h);
      }
    }
  }
}
