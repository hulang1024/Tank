/*
* 主场景
*/
class PlayScene extends Scene {
  constructor (game) {
    super();
    let playScene = this;
    // 创建背景层
    this.addLayer(playScene.backgroundLayer = new BackgroundLayer());
    // 创建障碍层
    this.addLayer(playScene.barrierLayer = new BarrierLayer());
    // 创建坦克层
    this.addLayer(playScene.tankLayer = new TankLayer());
    // 创建草地层
    this.addLayer(playScene.grassLayer = new GrassLayer());

    this.addChild(playScene.tankLayer);

    this._tanks = [];

    this.gameMap = new GameMap(playScene, map1);
    this.gameMap.read();
    this.gameMap.draw();

    addPlayers();
    function addPlayers () {
      /// VS CPU模式
      // 创建玩家1
      let playerTank1 = new PlayerTank(playScene, {
        playerNo: 1,
        x: 4 * BLOCK_W * 2,
        y: MAP_H - TANK_H,
        dir: DIR_UP,
        host: HOST_PLAYER,
        controlls: {
          up: Keys.W,
          down: Keys.S,
          left: Keys.A,
          right: Keys.D,
          fire: Keys.J
        }
      });

      // 创建玩家2
      let playerTank2 = new PlayerTank(playScene, {
        playerNo: 2,
        x: 8 * BLOCK_W * 2,
        y: MAP_H - TANK_H,
        dir: DIR_UP,
        host: HOST_PLAYER,
        controlls: {
          up: Keys.Up,
          down: Keys.Down,
          left: Keys.Left,
          right: Keys.Right,
          fire: [Keys.Num1, Keys.NumPad1]
        }
      });

      // 往本场景中增加两个玩家坦克
      playScene.addChild(playerTank1);
      playScene.addChild(playerTank2);

      playScene._tanks.push(playerTank1);
      playScene._tanks.push(playerTank2);
    }
  }

  start () {
     //GameAudio.play('start');
  }
  stop () {

  }

  //包括坦克,砖块,子弹
  getAllDrawables () {
    return this.gameMap.getObjects().concat(this._tanks);
  }

  draw() {
    this.tankLayer.context.clearRect(0, 0, this.tankLayer.getWidth(), this.tankLayer.getHeight());
    Scene.prototype.draw.call(this);
  }
}
