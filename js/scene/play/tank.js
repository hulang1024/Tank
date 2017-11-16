// 方向常量, 用于坦克,子弹参数
const DIR_NONE = -1;
const DIR_UP = 0;
const DIR_DOWN = 1;
const DIR_LEFT = 2;
const DIR_RIGHT = 3;
const DIR_NAMES = ['Up', 'Down', 'Left', 'Right'];
// 坦克尺寸
const TANK_W = 32;
const TANK_H = 32;
﻿
/*
抽象坦克
*/
class Tank extends Drawable {
  constructor (scene) {
    super();
    this.scene = scene;

    this._x = 0;
    this._y = 0;
    this._width = TANK_W;
    this._height = TANK_H;
    this._speed = 3; // 速度
    this._vx = 0; // x方向速度
    this._vy = 0; // y方向速度
    this._dir = DIR_NONE; // 方位
    this._hp = 100;  // 血条
    this._lives = 1; // 多少条命
    this._fireBuffered = true; // 当前时间是否可以发子弹
    this._host = -1; // 军队,用来区分敌友
  }

  setFireBuffered (b) {
    this._fireBuffered = b;
  }

  reduceHP (hp) {
    this._hp -= hp;
  }

  update () {
    if (this._vx == 0 && this._vy == 0) {
      return;
    }

    let map = this.scene.gameMap;
    // 判断x是否撞到墙
    if (this._vx < 0) {
      if (this._x + this._vx < 0) {
        this._x = 0;
        this._vx = 0;
      }
    } else {
      if (this._x + TANK_W + this._vx > map.getWidth()) {
        this._x = map.getWidth() - TANK_W;
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
      if (this._y + TANK_H + this._vy > map.getHeight()) {
        this._y = map.getHeight() - TANK_H;
        this._vy = 0;
      }
    }

    this._x += this._vx;
    this._y += this._vy;

    // 增加向量之后检查碰撞
    if (this._checkCollision()) {
      console.log('collision');
      // 恢复上个位置
      this._x -= this._vx;
      this._y -= this._vy;
      this._vx = 0;
      this._vy = 0;
    }
  }

  /* 发子弹 */
  _fire () {
    if (!this._fireBuffered)
      return;
    // 计算子弹起始位置
    let bulletX, bulletY;
    let margin = BULLET_SIZE;
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

    let spec = this._getBulletSpec();
    spec.x = bulletX;
    spec.y = bulletY;
    spec.dir = this._dir;
    spec.tank = this;
    this.scene.tankLayer.addChild(new Bullet(this.scene, spec));

    this._fireBuffered = false;
  }

  _getBulletSpec () {
    return {
      power: 0.5
    };
  }

  /* 检查坦克是否与前面其它物体碰撞 */
  _checkCollision () {
    let ret = false;


    return ret;
  }

}
