/*
主场景
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

    this.gameMap = new GameMap(playScene, map1);

    this._tanks = [];

    addPlayers();

    function addPlayers () {
      // 画地图
      playScene.gameMap.draw();

      /// VS CPU模式
      // 创建玩家1
      let playerTank1 = new PlayerTank(playScene, {
        playerNo: 1,
        x: 4 * BLOCK_W * 2,
        y: MAP_H - TANK_H,
        dir: DIR_UP,
        host: HOST_PLAYER,
        controlls: {
          up: KeyEvent.DOM_VK_W,
          down: KeyEvent.DOM_VK_S,
          left: KeyEvent.DOM_VK_A,
          right: KeyEvent.DOM_VK_D,
          fire: KeyEvent.DOM_VK_J
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
          up: KeyEvent.DOM_VK_UP,
          down: KeyEvent.DOM_VK_DOWN,
          left: KeyEvent.DOM_VK_LEFT,
          right: KeyEvent.DOM_VK_RIGHT,
          fire: [KeyEvent.DOM_VK_1, KeyEvent.DOM_VK_NUMPAD1]
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

  getAllDrawables () {
    return this.gameMap.getObjects().concat(this._tanks);
  }

  draw() {
    this.tankLayer.context.clearRect(0, 0, this.tankLayer.getWidth(), this.tankLayer.getHeight());
    Scene.prototype.draw.call(this);
  }
}
