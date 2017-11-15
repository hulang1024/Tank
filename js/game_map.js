let gameMap;
class GameMap extends Drawable {
  constructor(width, height) {
    super();
    this._width = width;
    this._height = height;
  }

  static instance(...args) {
    var gameMap = gameMap || new GameMap(...args);
    return gameMap;
  }

  draw() {

  }
}
