class CementBrick extends BlockObject {
  constructor () {
    super();

    this._name = "cementBrick";
  }

  onCollision (other) {
    if (other instanceof Bullet) {
      this._break(other);
    }
  }

  _break (bullet) {
    // 删除砖块从地图中
    this.scene.gameMap.remove(this);
  }
}
