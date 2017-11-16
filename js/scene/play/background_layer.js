/* 背景层 */
class BackgroundLayer extends Layer {
  constructor () {
    super({
      width: CANVAS_W,
      height: CANVAS_H,
    });

    // 画背景样式
    this.context.fillStyle = '#7f7f7f';
    this.context.fillRect(0, 0, this._width, this._height);
  }
}
