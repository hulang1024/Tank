// 地图中的块物体
const BLOCK_EMPTY = 0;
const BLOCK_CEMENT_BRICK = 1;
const BLOCK_STEEL_BRICK = 2;
const BLOCK_GRASS = 3;
const BLOCK_WATER = 4;
const BLOCK_ICE = 5;
const HOME = 9;
const ANOTHRE_HOME = 8;

class MapObject extends Drawable {
  constructor (name) {
    super();

    this._name = name;
  }

  setX (x) { this._x = x; }
  setY (y) { this._y = y; }

  getName () { return this._name; }

  // 默认是障碍物
  isBarrier () { return true; }

  setScene (scene) { this.scene = scene; }
}
