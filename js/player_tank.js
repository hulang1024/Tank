class PlayerTank extends Tank {
  constructor(game, spec) {
    super(game);

    this._x = spec.x;
    this._y = spec.y;
    this._dir = DIR_UP;
    this._host = HOST_PLAYER;
    this._playerNo = spec.playerNo;
    this._controlls = spec.controlls;
  }

  _getBulletSpec() {
    return {
      power: 2
    };
  }

  _fire() {
    Tank.prototype._fire.call(this);
    GameAudio.play('attack');
  }

  onKeyDown(key) {
    var controlls = this._controlls;
    switch (key) {
      case controlls.up:
        this._move(DIR_UP);
        break;
      case controlls.down:
        this._move(DIR_DOWN);
        break;
      case controlls.left:
        this._move(DIR_LEFT);
        break;
      case controlls.right:
        this._move(DIR_RIGHT);
        break;
      case controlls.fire:
        this._fire();
        break;
    }
  }

  onKeyUp(key) {
    var controlls = this._controlls;
    if (! [controlls.up, controlls.right, controlls.down, controlls.left].includes(key))
      return;
    this._vx = 0;
    this._vy = 0;
  }

  _move(dir) {
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

  draw() {
    GameImage.drawImage(this.game.context,
      'playerTank' + this._playerNo + DIR_NAMES[this._dir],
      this._x, this._y,
      TANK_W, TANK_H);
  }
}
