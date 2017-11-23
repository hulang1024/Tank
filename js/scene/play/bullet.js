const BULLET_SIZE = 6;

/*
子弹
*/
class Bullet extends Drawable {
  constructor (scene, spec) {
    super();
    this.scene = scene;

    this._x = spec.x;
    this._y = spec.y;
    this._dir = spec.dir;
    this._power = spec.power;
    this._tank = spec.tank;

    this._width = BULLET_SIZE + 2;
    this._height = BULLET_SIZE + 2;

    // 根据power确定速度
    let velocity = this._power * 2;

    // 根据方向参数确定x和y的速度
    switch (this._dir) {
      case DIR_UP:
        this._vx = 0;
        this._vy = -velocity;
        break;
      case DIR_DOWN:
        this._vx = 0;
        this._vy = +velocity;
        break;
      case DIR_LEFT:
        this._vx = -velocity;
        this._vy = 0;
        break;
      case DIR_RIGHT:
        this._vx = +velocity;
        this._vy = 0;
        break;
    }
  }

  getTank () { return this._tank; }

  getPower () { return this._power; }

  onCollision (other) {
    this.scene.tankLayer.removeChild(this);
    this._tank.setFireBuffered(true);
  }

  update () {
    this._x += this._vx;
    this._y += this._vy;

    if (this._checkCollisionWall()) {
      this.onCollision(null);
      return;
    }

    // 是否撞到实体
    let ret = false;
    let objects = this.scene.getAllDrawables();
    for (var other of objects) {
      if (!other || other === this) continue; // 排除null和自己
      if (isCollision(this, other)) {
        ret = true;
        other.onCollision(this);
      }
    }
    if (ret) {
      this.onCollision(other);
      this.scene.gameMap.draw(); // 重绘地图
    }
  }

  draw () {
    this.scene.tankLayer.drawImage(
      'bullet' + DIR_NAMES[this._dir],
      this._x, this._y,
      BULLET_SIZE, BULLET_SIZE);
  }


  /* 检查是否撞到了墙 */
  _checkCollisionWall () {
    let b = 0;
    let bullet = this;
    switch (this._dir) {
      case DIR_UP:
        if(bullet._y < 0)
          b = 1;
        break;
      case DIR_DOWN:
        if(bullet._y >  this.scene.gameMap.getHeight())
          b = 1;
        break;
      case DIR_LEFT:
        if(bullet._x < 0)
          b = 1;
        break;
      case DIR_RIGHT:
        if(bullet._x > this.scene.gameMap.getWidth())
          b = 1;
        break;
    }
    return b;
  }
}
