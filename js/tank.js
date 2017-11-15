﻿
/*
抽象坦克
*/
class Tank extends Drawable {
  constructor(game) {
    super();
    this.game = game;

    this._x = 0;
    this._y = 0;
    this._speed = 3; // 速度
    this._vx = 0; // x方向速度
    this._vy = 0; // y方向速度
    this._dir = DIR_NONE; // 方位
    this._hp = 100;  // 血条
    this._lives = 1; // 多少条命
    this._fireBuffered = true; // 当前时间是否可以发子弹
    this._host = -1; // 军队,用来区分敌友
  }

  /* 发子弹 */
  _fire() {
    if (!this._fireBuffered)
      return;
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

    this._fireBuffered = false;
  }

  _getBulletSpec() {
    return {
      power: 0.5
    };
  }

  setFireBuffered(b) {
    this._fireBuffered = b;
  }

  reduceHP(hp) {
    this._hp -= hp;
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
