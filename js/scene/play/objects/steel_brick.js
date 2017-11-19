class SteelBrick extends BlockObject {
  constructor () {
    super();

    this._name = "steelBrick";
  }

  break (bullet) {
    if (bullet.getPower() < 3)
      return;
    // 删除砖块从地图中
    this.scene.gameMap.remove(this);
  }
}
