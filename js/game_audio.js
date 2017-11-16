
var GameAudio = (function () {
  var audioMap = new Map();

  return {
    load: function (success) {
      // load audios
      const filenames = ['attack.mp3', 'bulletCrack.mp3', 'move.mp3', 'playerCrack.mp3', 'prop.mp3', 'start.mp3', 'tankCrack.mp3'];
      let loadCnt = 0;
      for (let name of filenames) {
        let audio = new Audio();
        audio.src = 'res/' + name;
        audio.onloadeddata = function () {
          loadCnt++;
          if (loadCnt == filenames.length) {
            success();
          }
        };
        // 加入map
        audioMap.set(name.substring(0, name.lastIndexOf('.')), audio);
      }
    },

    play: function (name) {
      setTimeout(function () {
        audioMap.get(name).play();
      }, 0);
    }
  };
})();
