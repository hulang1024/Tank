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

  update () {
    this._x += this._vx;
    this._y += this._vy;

    if (this._checkCollisionWall()) {
      this._tank.setFireBuffered(true);
      this.scene.tankLayer.removeChild(this);
      return;
    }

    // 是否撞到实体
    let ret = false;
    let objects = this.scene.getAllDrawables();
    for (var other of objects) {
      if (!other || other === this) continue; // 排除null和自己
      if (!(other instanceof Tank) && !other.isBarrier()) continue; // 排除非障碍物,例如可直接穿越的草丛
      if (isCollision(this, other)) {
        ret = true;
        // 如果撞到了子弹
        if (other instanceof Bullet) {
          // nothing
        }
        // 如果撞到了地图块
        else if (other instanceof BlockObject) {
          switch (other.constructor) {
            case CementBrick:
            case SteelBrick:
              other.break(this);
              break;
            case Ice:
            case Water:
            case Grass:
              break;
          }
        }
      }
    }

    if (ret) {
      this._tank.setFireBuffered(true);
      // 从层中删除自己
      this.scene.tankLayer.removeChild(this);
      // 重绘地图
      this.scene.gameMap.draw();
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
