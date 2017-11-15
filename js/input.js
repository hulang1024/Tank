var Keys = {};

(function() {
  Keys = {
    Left: 37,
    Up: 38,
    Right: 39,
    Down: 40
  };
  
  // 数字按键
  for (var i = 0; i < 10; i++) {
    Keys[ 'Number' + i] = 48 + i;
  }
  // 字母按键
  for (var i = 0; i < 26; i++) {
    var c = 65 + i;
    Keys[ String.fromCharCode(c) ] = c;
  }

  Object.freeze(Keys);
})();
