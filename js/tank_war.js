/*
坦克大战主类
*/
class TankGame extends Drawable {
  constructor() {
    super();

    var game = this;

    // 背景层
    var bgcanvas = document.getElementById('background');
    bgcanvas.width = CANVAS_W;
    bgcanvas.height = CANVAS_H;
    var bgctx = bgcanvas.getContext('2d');
    // 画背景样式
    bgctx.fillStyle = '#7f7f7f';
    bgctx.fillRect(0, 0, bgcanvas.width, bgcanvas.height);

    this.canvas = document.getElementById('canvas');
    this.canvas.width = CANVAS_W;
    this.canvas.height = CANVAS_H;
    document.querySelector('#main').style.width = CANVAS_W + 'px';
    document.querySelector('#main').style.height = CANVAS_H + 'px';

    this.context = canvas.getContext('2d');

    var paused;

    GameImage.load(function() {
      GameAudio.load(function() {
        start();
      });
    });

    function start() {
      //GameAudio.play('start');

      game.gameMap = GameMap.instance(game);
      game.gameMap.draw();
      // 创建玩家1
      var playerTank1 = new PlayerTank(game, {
        playerNo: 1,
        x: 4 * BLOCK_W * 2,
        y: MAP_H - TANK_H,
        controlls: {
          up: Keys.W, down: Keys.S, left: Keys.A, right: Keys.D, fire: Keys.J
        }
      });
      // 创建玩家2
      var playerTank2 = new PlayerTank(game, {
        playerNo: 2,
        x: 8 * BLOCK_W * 2,
        y: MAP_H - TANK_H,
        controlls: {
          up: Keys.Up, down: Keys.Down, left: Keys.Left, right: Keys.Right, fire: Keys.Number1
        }
      });
      game.addChild(playerTank1);
      game.addChild(playerTank2);


      document.addEventListener('keydown', function(event) {
        var key = event.keyCode;
        game.onKeyDown(key);
        switch (key) {
          case 'Space':
          case 'Enter':
            paused = !paused;
            break;
        }
      });
      document.addEventListener('keyup', function(event) {
        var key = event.keyCode;
        game.onKeyUp(key);
      });

      loop();

      function loop() {
        /// update
        game.update();
        /// draw
        game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
        game.draw();

        requestAnimationFrame(loop);
      }
    }
  }
}

new TankGame();
