/*
抽象场景
*/
class Scene extends Drawable {
  constructor (game) {
    super();

    this.game = game;
  }

  start () {}

  stop () {}

  addLayer (layer) {
    let mainDiv = document.querySelector('#main');
    mainDiv.appendChild(layer.canvas);
  }
}
