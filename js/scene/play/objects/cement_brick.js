class CementBrick extends BlockObject {
  constructor () {
    super();

    this._name = "cementBrick";
  }

  break (bullet) {
    // 删除砖块从地图中
    this.scene.gameMap.remove(this);
  }
}
