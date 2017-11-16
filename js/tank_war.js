const CANVAS_W = 512;
const CANVAS_H = 448;

/*
坦克大战主类
*/
class TankWarGame {
  constructor () {
    let game = this;

    this._initBaseUI();

    GameImage.load(function () {
      GameAudio.load(function () {
        game._initEventListeners();
        // 设置当前场景为主场景
        game.nowScene = new PlayScene(this);
        game.nowScene.start();
        game._loop();
      });
    });
  }

  _initBaseUI () {
    let mainDiv = document.querySelector('#main');
    mainDiv.style.width = CANVAS_W + 'px';
    mainDiv.style.height = CANVAS_H + 'px';
  }

  _initEventListeners () {
    let game = this;

    document.addEventListener('keydown', function (event) {
      let key = event.keyCode;
      game.nowScene.onKeyDown(key);
    });
    document.addEventListener('keyup', function (event) {
      let key = event.keyCode;
      game.nowScene.onKeyUp(key);
    });
  }

  _loop () {
    /// update
    this.nowScene.update();
    /// draw
    this.nowScene.draw();
    requestAnimationFrame(this._loop.bind(this));
  }
}

new TankWarGame();
