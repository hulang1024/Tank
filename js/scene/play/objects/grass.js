class Grass extends BlockObject {
  constructor () {
    super();

    this._name = "grass";
  }

  // 草是非障碍物
  isBarrier () { return false; }
}
