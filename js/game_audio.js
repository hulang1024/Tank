
var GameAudio = (function() {
  var audioMap = {};

  return {
    load: function(success) {
      // load audios
      var filenames = ['attack.mp3', 'bulletCrack.mp3', 'move.mp3', 'playerCrack.mp3', 'prop.mp3', 'start.mp3', 'tankCrack.mp3'];
      var loadCnt = 0;
      for (var name of filenames) {
        var audio = new Audio();
        audio.src = 'res/' + name;
        audio.onloadeddata = function() {
          loadCnt++;
          if (loadCnt == filenames.length) {
            success();
          }
        };
        // 加入map
        audioMap[name.substring(0, name.lastIndexOf('.'))] = audio;
      }
    },

    play: function(name) {
      setTimeout(function() {
        audioMap[name].play();
      }, 0);
    }
  };
})();
