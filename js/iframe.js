// Загрузка ютуб плеера

var players = new Array(5);
var player;

const controls = document.querySelectorAll('.video__control'),
   iframes = document.querySelectorAll('.video__body iframe');





function onYouTubeIframeAPIReady() {
   players[0] = new YT.Player('play1', {
      events: {
         'onStateChange': onPlayerStateChange
      }
   });
   players[1] = new YT.Player('play2', {
      events: {
         'onStateChange': onPlayerStateChange
      }
   });
   players[2] = new YT.Player('play3', {
      events: {
         'onStateChange': onPlayerStateChange
      }
   });
   players[3] = new YT.Player('play4', {
      events: {
         'onStateChange': onPlayerStateChange
      }
   });
   players[4] = new YT.Player('play5', {
      events: {
         'onStateChange': onPlayerStateChange
      }
   });
   for (let index = 0; index < controls.length; index++) {
      const control = controls[index];
      const iframe = iframes[index];
      control.addEventListener("click", function () {
         if (players[index] == undefined) alert('Под эту кнопку не подключено видео!');
         else {
            if (players[index].getPlayerState() == YT.PlayerState.PLAYING && control.classList.contains('active')) {
               players[index].pauseVideo();
            } else if (control.classList.contains('active')) {
               players[index].playVideo();
            } else if (!control.classList.contains('active')) {
               control.classList.add('active');
               iframe.classList.add('active');
               for (let i = 0; i < controls.length; i++) {
                  const removeActiveControls = controls[i];
                  const removePauseBtn = removeActiveControls.querySelector('.video__control-play');
                  const removeActiveIframes = iframes[i];
                  const pausePlayers = players[i]
                  if (pausePlayers != undefined) {
                     if (i != index) {
                        pausePlayers.pauseVideo();
                        removeActiveControls.classList.remove('active');
                        removeActiveIframes.classList.remove('active');
                        removePauseBtn.classList.remove('_icon-pause');
                        removePauseBtn.classList.add('_icon-play');
                     }
                  };
               }
            }
         }
      });
   }

}
// Функция выполняется по загрузке плеера

function onPlayerStateChange(event) {
   const playBtn = document.querySelector('.active .video__control-play');
   if (event.data == YT.PlayerState.PLAYING) {
      playBtn.classList.remove('_icon-play');
      playBtn.classList.add('_icon-pause');
   } else {
      playBtn.classList.remove('_icon-pause');
      playBtn.classList.add('_icon-play');
   }
}


