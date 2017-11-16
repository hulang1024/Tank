// "家"尺寸
const HOME_W = 32;
const HOME_H = 32;

class Home extends MapObject {
  constructor () {
    super();
    
    this._width = HOME_W;
    this._height = HOME_H;

    this._name = "home";
  }
}
