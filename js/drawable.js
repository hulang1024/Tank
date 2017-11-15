class Drawable {
  constructor() {
    this._x = 0;
    this._y = 0;
    this._width = 0;
    this._height = 0;
    this._children = [];
    console.log('init drawable');
  }

  getX() { return this._x; }
  getY() { return this._y; }
  getWidth() { return this._width; }
  getHeight() { return this._height; }

  addChild(d) {
    this._children.push(d);
  }

  removeChild(d) {
    var i = this._children.indexOf(d);
    if (i > 0) {
      this._children.splice(i, 1);
    }
  }

  onKeyDown(key) {
    this._children.forEach(function(d) {
      d.onKeyDown(key);
    });
  }

  onKeyUp(key) {
    this._children.forEach(function(d) {
      d.onKeyUp(key);
    });
  }

  update() {
    this._children.forEach(function(d) {
      d.update();
    });
  }

  draw() {
    this._children.forEach(function(d) {
      d.draw();
    });
  }
}
