/*
* 主场景
*/
class OnlinePlayScene extends Scene {
  constructor (game) {
    super();
    var ids = location.search.match(/id=(\d+)/);
    if (!ids) {
      alert('无id!');
      return;
    }
    var meId = ids[1];
    var otherId = meId == 1 ? 2 : 1;
    var mePlayerNo = meId;
    var otherPlayerNo = otherId;

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

    // 画地图
    playScene.gameMap.draw();

    var player1Params = {
      x: 4 * BLOCK_W * 2,
      y: MAP_H - TANK_H
    };
    var player2Params = {
      x: 8 * BLOCK_W * 2,
      y: MAP_H - TANK_H
    };

    var meParams = mePlayerNo == 1 ? player1Params : player2Params;
    var heParams = mePlayerNo == 2 ? player1Params : player2Params;
    /// VS CPU模式
    // 创建本地玩家
    let playerTankMe = new PlayerTank(playScene, {
      playerNo: mePlayerNo,
      x: meParams.x,
      y: meParams.y,
      dir: DIR_UP,
      host: HOST_PLAYER,
      controlls: {
        up: Keys.W,
        down: Keys.S,
        left: Keys.A,
        right: Keys.D,
        fire: Keys.J
      },
      ghost: {
        fire: function () {
          socket.emit('message', {to: otherId, type: 5});
        },
        move: function (dir) {
          socket.emit('message', {to: otherId, type: dir});
        },
        stop: function () {
          socket.emit('message', {to: otherId, type: 6});
        }
      }
    });

    // 创建网络玩家
    let playerTankHe = new PlayerTank(playScene, {
      playerNo: otherPlayerNo,
      x: heParams.x,
      y: heParams.y,
      dir: DIR_UP,
      host: HOST_PLAYER,
      controlls: null
    });

    // 往本场景中增加两个玩家坦克
    playScene.addChild(playerTankMe);
    playScene.addChild(playerTankHe);
    playScene._tanks.push(playerTankHe);
    playScene._tanks.push(playerTankMe);



    // socket------------------------------------------------------
    var socket = io.connect('http://220.249.112.147:9092');
    socket.on('connect', function() {
       console.info('socket connected');
    });
    socket.on('disconnect', function() {
        console.info('socket disconnected');
     });

    socket.emit('login', {id: meId});
    socket.on('online', function(id){
      console.log('on online');
      socket.emit('intent', {type: 'addFriends', data: {friendIds: otherId}});
    });
    socket.on('friendOnline', function() {

    });
    socket.on("message", function(data){
      var act = +data.type;
      if (act == 5) {
        playerTankHe.fire();
      } else if (act == 6) {
        playerTankHe.stop();
      } else {
        playerTankHe.move(act);
      }
    });
  }

  start () {
    // GameAudio.play('start');
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
