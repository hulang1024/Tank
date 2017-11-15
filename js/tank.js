// 方向常量, 用于坦克,子弹参数
const DIR_NONE = -1;
const DIR_UP = 0;
const DIR_DOWN = 1;
const DIR_LEFT = 2;
const DIR_RIGHT = 3;
const DIR_NAMES = ['Up', 'Down', 'Left', 'Right'];

const TANK_W = 32;
const TANK_H = 32;

const HOST_PLAYER = 1
const HOST_HOSTILE = 2

// 抽象坦克
class Tank extends Drawable {
  constructor(game) {
    super();
    this.game = game;

    this._x = 0;
    this._y = 0;
    this._speed = 2; // 速度
    this._vx = 0; // x方向速度
    this._vy = 0; // y方向速度
    this._dir = DIR_NONE; // 方位
    this._host = -1; // 军队,用来区分敌友
  }

  _fire() {
    // 计算子弹起始位置
    var bulletX, bulletY;
    var margin = BULLET_SIZE;
    switch (this._dir) {
      case DIR_UP:
        bulletX = this._x + (TANK_W - BULLET_SIZE) / 2;
        bulletY = this._y - margin;
        break;
      case DIR_DOWN:
        bulletX = this._x + (TANK_W - BULLET_SIZE) / 2;
        bulletY = this._y + TANK_H  + margin;
        break;
      case DIR_LEFT:
        bulletX = this._x - margin;
        bulletY = this._y + (TANK_H - BULLET_SIZE) / 2;
        break;
      case DIR_RIGHT:
        bulletX = this._x + TANK_W + margin;
        bulletY = this._y + (TANK_H - BULLET_SIZE) / 2;
        break;
    }

    var spec = this._getBulletSpec();
    spec.x = bulletX;
    spec.y = bulletY;
    spec.dir = this._dir;
    spec.tank = this;
    this.game.addChild(new Bullet(this.game, spec));
  }

  _getBulletSpec() {
    return {
      power: 0.5
    };
  }

  update() {
    var obj = this.game.gameMap;
    // 判断x是否撞到墙
    if (this._vx < 0) {
      if (this._x + this._vx < 0) {
        this._x = 0;
        this._vx = 0;
      }
    } else {
      if (this._x + this._width + this._vx > obj.getWidth()) {
        this._x = obj.getWidth() - this._width;
        this._vx = 0;
      }
    }
    // 判断y是否撞到墙
    if (this._vy < 0) {
      if (this._y + this._vy < 0) {
        this._y = 0;
        this._vy = 0;
      }
    } else {
      if (this._y + this._height + this._vy > obj.getHeight()) {
        this._y = obj.getHeight() - this._height;
        this._vy = 0;
      }
    }

    this._x += this._vx;
    this._y += this._vy;
  }
}
