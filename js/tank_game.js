
class TankGame extends Drawable {
  constructor() {
    super();

    var game = this;

    this.canvas = document.getElementById('canvas');
    this.canvas.width = 512;
    this.canvas.height = 448;
    document.querySelector('#main').style.width = this.canvas.width;
    document.querySelector('#main').style.height = this.canvas.height;

    this.context = canvas.getContext('2d');

    var paused;

    GameImage.load(function() {
      GameAudio.load(function() {
        start();
      });
    });

    function start() {
      //GameAudio.play('start');

      var gameMap = GameMap.instance(game.canvas.width, game.canvas.height);
      var playerTank1 = new PlayerTank(game, {
        playerNo: 1,
        x: 100,
        y : 400,
        controlls: {
          up: 'KeyW', down: 'KeyS', left: 'KeyA', right: 'KeyD', fire: 'KeyJ'
        }
      });
      var playerTank2 = new PlayerTank(game, {
        playerNo: 2,
        x: 300,
        y : 400,
        controlls: {
          up: 'ArrowUp', down: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight', fire: 'Numpad1'
        }
      });
      game.addChild(gameMap);
      game.addChild(playerTank1);
      game.addChild(playerTank2);

      game.gameMap = gameMap;

      document.addEventListener('keydown', function(event) {
        var key = event.code;
        game.onKeyDown(key);
        switch (key) {
          case 'Space':
          case 'Enter':
            paused = !paused;
            break;
        }
      });
      document.addEventListener('keyup', function(event) {
        var key = event.code;
        game.onKeyUp(key);
      });

      loop();

      function loop() {
        /// update
        game.update();

        /// draw
        game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
        // 画背景
        game.context.fillStyle = '#000';
        game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);

        game.draw();

        requestAnimationFrame(loop);
      }
    }
  }
}

new TankGame();
