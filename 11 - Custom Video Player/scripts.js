// init elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const ranges = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');


// functions
function togglePlay() {
  video.paused ? video.play() : video.pause();
};

function updateToggleButton() {
  toggle.innerText = this.paused ? '►' : '❚ ❚';
};

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
};

function rangeUpdate() {
  video[this.name] = this.value;
};

function handleProgress() {
  progressBar.style.flexBasis = `${(video.currentTime / video.duration) * 100}%`;
};

function scrub(e) {
  video.currentTime  = (e.offsetX / progress.offsetWidth) * video.duration;
};

// set event listeners
// video events
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateToggleButton);
video.addEventListener('pause', updateToggleButton);

// play/pause button event
toggle.addEventListener('click', togglePlay);

// skip buttons events
skipButtons.forEach((button) => {
  button.addEventListener('click', skip);
});

// ranges events
ranges.forEach((range) => {
  range.addEventListener('change', rangeUpdate);
  range.addEventListener('mousemove', rangeUpdate);
});

// progress bar events
video.addEventListener('timeupdate', handleProgress);  // update progress bar when video is playing
progress.addEventListener('click', scrub);
let mousedown = false;
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);