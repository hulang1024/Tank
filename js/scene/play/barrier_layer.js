/* 障碍层 */
class BarrierLayer extends Layer {
  constructor () {
    super({
      left: MAP_BASE_X,
      top: MAP_BASE_Y,
      width: MAP_W,
      height: MAP_H,
    });
  }
}
