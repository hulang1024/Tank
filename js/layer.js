/*
抽象画面层
*/
class Layer extends Drawable {
  constructor (params) {
    super();

    this.left = params.left || 0;
    this.top = params.top || 0;
    this.canvas = document.createElement('canvas');
    this.canvas.style.left = this.left + 'px';
    this.canvas.style.top = this.top + 'px';

    this.canvas.width = params.width;
    this.canvas.height = params.height;
    this.context = this.canvas.getContext('2d');

    this._width = params.width;
    this._height = params.height;
  }

  drawImage (name, x, y, width, height) {
    GameImage.drawImage(this.context, name, x, y, width, height);
  }
}
