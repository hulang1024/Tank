/*
矩形碰撞检测
@param d1 矩形1
@param d2 矩形2
@return  如果碰撞,返回true
*/
function isCollision (d1, d2) {
  let x0 = d1.getX(),
      y0 = d1.getY(),
      w0 = d1.getWidth(),
      h0 = d1.getHeight(),
      x1 = d2.getX(),
      y1 = d2.getY(),
      w1 = d2.getWidth(),
      h1 = d2.getHeight();
  return x0<x1+w1 && y0<y1+h1 && x0+w0>x1 && y0+h0>y1;
}
