import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const LS_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

function onPlay(data) {
  localStorage.setItem(LS_KEY, JSON.stringify(data.seconds));
}

player.on('timeupdate', throttle(onPlay, 1000));

const savedTime = JSON.parse(localStorage.getItem(LS_KEY)) || 0;

player.setCurrentTime(savedTime);
