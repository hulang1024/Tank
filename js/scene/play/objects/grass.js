class Grass extends BlockObject {
  constructor () {
    super();
    
    this._name = "grass";
  }

  isBarrier () { return false; }
}
