
var GameImage = (function () {
  let imageMap = new Map();
  // 主切片集图片
  let collImage;
  // 主切片数据 {name: [sx, sy],...]
  let sliceDataMap = new Map();

  function initSliceDataMap () {
    /// 初始化切片数据

    // 初始化玩家坦克, 名字格式:例如 玩家1方向上 = playerTank1Up
    for (let p = 0; p < 2; p++) {
      for (let d = 0; d < 4; d++) {
        sliceDataMap.set('playerTank' + (p + 1) + DIR_NAMES[d], [p * 4 * TANK_W + d * TANK_W, 0]);
      }
    }

    // 子弹
    for (let d = 0; d < 4; d++) {
      sliceDataMap.set('bullet' + DIR_NAMES[d], [80 + d * BULLET_SIZE, 96]);
    }

    // 地图块
    const BLOCK_NAMES = ['cementBrick', 'steelBrick', 'grass', 'water', 'ice'];
    for (let i = 0; i < 5; i++) {
      sliceDataMap.set(BLOCK_NAMES[i], [0 + i * BLOCK_W, 96]);
    }

    sliceDataMap.set('home', [256, 0]);

  }

  return {
    load: function (success) {
      // load images
      const filenames = ['menu.gif', 'coll.gif'];
      let loadCnt = 0;
      for (let name of filenames) {
        let img = new Image();
        img.src = 'res/' + name;
        img.onload = function() {
          loadCnt++;
          if (loadCnt == filenames.length) {
            initSliceDataMap();
            success();
          }
        };
        // 加入map
        imageMap.set(name.substring(0, name.lastIndexOf('.')), img);
      }

      collImage = this.getByName('coll');
    },

    getByName: function (name) {
      return imageMap.get(name);
    },

    /*
    @param context
    @param name 图片名
    @param x
    @param y 画布目标位置
    @param width
    @param height 画布目标尺寸
    */
    drawImage: function (context, name, x, y, width, height) {
      let sliceData = sliceDataMap.get(name);
      context.drawImage(collImage,
        sliceData[0], sliceData[1], width, height,
        x, y, width, height);
    }
  };
})();
