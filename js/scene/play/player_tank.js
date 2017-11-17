const HOST_PLAYER = 1;
const HOST_HOSTILE = 2;

/*
玩家坦克
*/
class PlayerTank extends Tank {
  constructor (scene, spec) {
    super(scene);

    this._x = spec.x;
    this._y = spec.y;
    this._dir = spec.dir;
    this._host = spec.host;
    this._playerNo = spec.playerNo;
    this._controlls = spec.controlls;
    this.ghost = spec.ghost;
  }

  _getBulletSpec () {
    return {
      power: 3
    };
  }

  fire () {
    let play = this._fireBuffered;
    Tank.prototype.fire.call(this);
    if (play) {
      GameAudio.play('attack');
      this.ghost && this.ghost.fire();
    }
  }

  onKeyDown (event, key) {
    if (event.repeat)
      return;
    let controlls = this._controlls;
    if (!controlls)
      return;
    switch (key) {
      case controlls.up:
        this.move(DIR_UP);
        break;
      case controlls.down:
        this.move(DIR_DOWN);
        break;
      case controlls.left:
        this.move(DIR_LEFT);
        break;
      case controlls.right:
        this.move(DIR_RIGHT);
        break;
      default:
        if (Array.isArray(controlls.fire) ? controlls.fire.includes(key) : controlls.fire == key) {
          this.fire();
        }
    }
  }

  onKeyUp (event, key) {
    let controlls = this._controlls;
    if (!controlls)
      return;
    if (! [controlls.up, controlls.right, controlls.down, controlls.left].includes(key))
      return;
    this._vx = 0;
    this._vy = 0;
  }

  move (dir) {
    switch (dir) {
      case DIR_UP:
        this._vx = 0;
        this._vy = -this._speed;
        break;
      case DIR_DOWN:
        this._vx = 0;
        this._vy = +this._speed;
        break;
      case DIR_LEFT:
        this._vx = -this._speed;
        this._vy = 0;
        break;
      case DIR_RIGHT:
        this._vx = +this._speed;
        this._vy = 0;
        break;
    }
    this._dir = dir;
  }

  setUpdate (params) {
    this._dir = params.dir;
    this._x = params.x;
    this._y = params.y;
  }

  update () {
    if (this._vx == 0 && this._vy == 0) {
      return;
    }
    Tank.prototype.update.call(this);
    this.ghost && this.ghost.update(this);
  }

  stop () {
    this._vx = 0;
    this._vy = 0;
  }

  draw () {
    this.scene.tankLayer.drawImage(
      'playerTank' + this._playerNo + DIR_NAMES[this._dir],
      this._x, this._y,
      TANK_W, TANK_H);
  }
}
