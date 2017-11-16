
var GameImage = (function() {
  var imageMap = {};

  // 主切片集图片
  var collImage;

  // 主切片数据 {name: [sx, sy],...]
  var sliceDataMap = {};

  function init() {
    /// 初始化切片数据

    // 初始化玩家坦克, 名字格式:例如 玩家1方向上 = playerTank1Up
    for (var p = 0; p < 2; p++) {
      for (var d = 0; d < 4; d++) {
        sliceDataMap['playerTank' + (p + 1) + DIR_NAMES[d]] = [p * 4 * TANK_W + d * TANK_W, 0];
      }
    }

    // 子弹
    for (var d = 0; d < 4; d++) {
      sliceDataMap['bullet' + DIR_NAMES[d]] = [80 + d * BULLET_SIZE, 96];
    }

    // 地图块
    for (var i = 0; i < 5; i++) {
      sliceDataMap[BLOCK_NAMES[i]] = [0 + i * BLOCK_W, 96];
    }

    sliceDataMap['home'] = [256, 0];

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

      init();
    },

    getByName: function(name) {
      return imageMap[name];
    },

    drawImageInMap: function(context, name, x, y, width, height) {
      GameImage.drawImage(context, name, MAP_BASE_X + x, MAP_BASE_Y + y, width, height);
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
        sliceData[0], sliceData[1], width, height,
        x, y, width, height);
    }
  };
})();
