let _id = 1;
class Drawable {
  constructor () {
    this._x = 0;
    this._y = 0;
    this._width = 0;
    this._height = 0;
    this._children = [];
    this._id = _id++;
    console.log("create Drawable #" + this._id);
  }

  getX () { return this._x; }
  getY () { return this._y; }
  getWidth () { return this._width; }
  getHeight () { return this._height; }

  addChild (d) {
    this._children.push(d);
  }

  removeChild (d) {
    let i = this._children.indexOf(d);
    if (i > -1) {
      console.log("delete Drawable #" + this._children[i]._id);
      this._children.splice(i, 1);
    }
  }

  onKeyDown (event ,key) {
    this._children.forEach(function(d) {
      d.onKeyDown(event, key);
    });
  }

  onKeyUp (event, key) {
    this._children.forEach(function(d) {
      d.onKeyUp(event, key);
    });
  }

  update () {
    this._children.forEach(function(d) {
      d.update();
    });
  }

  draw () {
    this._children.forEach(function(d) {
      d.draw();
    });
  }
}
