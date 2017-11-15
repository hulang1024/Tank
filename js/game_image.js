
var GameImage = (function() {
  var imageMap = {};

  // 主切片集图片
  var collImage;

  // 主切片数据 {name: [sx, sy, swidth, sheight],...]
  var sliceDataMap = {};

  init();

  function init() {
    /// 初始化切片数据

    // 初始化玩家坦克, 名字格式:例如 玩家1方向上 = playerTank1Up
    const TANK_W = 32, TANK_H = 32;
    const DIR_NAMES = ['Up', 'Down', 'Left', 'Right'];
    for (var p = 0; p < 2; p++) {
      for (var d = 0; d < 4; d++) {
        sliceDataMap['playerTank' + (p + 1) + DIR_NAMES[d]] = [p * TANK_W * 4 + TANK_W * d, 0, TANK_W, TANK_H];
      }
    }

    // 子弹
    const BULLET_W = 6, BULLET_H = 6;
    for (var d = 0; d < 4; d++) {
      sliceDataMap['bullet' + DIR_NAMES[d]] = [80 + BULLET_W * d, 96, BULLET_W, BULLET_H];
    }
  }

  return {
    load: function(success) {
      // load images
      var filenames = ['menu.gif', 'coll.gif'];
      var loadCnt = 0;
      for (var name of filenames) {
        var img = new Image();
        img.src = 'res/' + name;
        img.onload = function() {
          loadCnt++;
          if (loadCnt == filenames.length) {
            success();
          }
        };
        // 加入map
        imageMap[name.substring(0, name.lastIndexOf('.'))] = img;
      }

      collImage = this.getByName('coll');
    },

    getByName: function(name) {
      return imageMap[name];
    },

    /*
    @param context
    @param name 图片名
    @param x
    @param y 画布目标位置
    @param width
    @param height 画布目标尺寸
    */
    drawImage: function(context, name, x, y, width, height) {
      var sliceData = sliceDataMap[name];
      context.drawImage(collImage,
        sliceData[0], sliceData[1], sliceData[2], sliceData[3],
        x, y, width, height);
    }
  };
})();
