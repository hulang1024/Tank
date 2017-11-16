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

/*
游戏地图
*/
class GameMap extends Drawable {
  constructor (scene, mapData) {
    super();

    this.mapData = mapData;
    this.scene = scene;
    this._width = MAP_W;
    this._height = MAP_H;
    this._objects = [];
  }

  _read () {
    for (let r = 0; r < MAP_ROWS; r++) {
      for (let c = 0; c < MAP_COLS; c++) {
        let type = this.mapData[r][c];
        let obj = MapObjectFactory.createByType(type);
        if (obj) {
          obj.setX(c * obj.getWidth());
          obj.setY(r * obj.getHeight());
          this._objects.push(obj);
        }
      }
    }
  }

  getObjects() { return this._objects; }

  draw () {
    this._read();

    let layer = this.scene.barrierLayer;
    layer.context.fillStyle = '#000';
    layer.context.fillRect(0, 0, layer.getWidth(), layer.getHeight());

    for (let r = 0; r < MAP_ROWS; r++) {
      for (let c = 0; c < MAP_COLS; c++) {
        let obj = this._objects[r * MAP_COLS + c];
        if (!obj)
          continue;
        switch (obj.constructor) {
          case CementBrick:
          case SteelBrick:
          case Water:
          case Ice:
          case Home:
            layer = this.scene.barrierLayer;
            break;
          case Grass:
            layer = this.scene.grassLayer;
            break;
        }

        layer.drawImage(obj.getName(), obj.getX(), obj.getY(), obj.getWidth(), obj.getHeight());
      }
    }
  }
}
