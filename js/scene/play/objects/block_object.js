/* 地图块,包括水泥砖,钢砖,水,冰,草 */
class BlockObject extends MapObject {
  constructor () {
    super();
    this._width = BLOCK_W;
    this._height = BLOCK_H;
  }
}
