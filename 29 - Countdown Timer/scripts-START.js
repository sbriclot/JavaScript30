let countdown;
const intervals = document.querySelectorAll('[data-time]');
const display = document.querySelector('.display');
const timeLeft = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');

function timer(seconds) {
  displayTimeLeft(seconds);
  displayEndTime(seconds);

  clearInterval(countdown);
  countdown = setInterval(() => {
    seconds -= 1;
    // check if we should stop it!
    if(seconds < 0) {
      clearInterval(countdown);
      return;
    }
    // display it
    displayTimeLeft(seconds);
  }, 1000);
};

function removeClassByPrefix(el, prefix) {
  var regx = new RegExp('\\b' + prefix + '.*?\\b', 'g');
  el.className = el.className.replace(regx, '');
  return el;
}

function displayTimeLeft(seconds) {
  switch (seconds) {
    case 3:
      removeClassByPrefix(display, 'rest');
      display.classList.add('rest3');
      break;
    case 2:
      removeClassByPrefix(display, 'rest');
      display.classList.add('rest2');
      break;
    case 1:
      removeClassByPrefix(display, 'rest');
      display.classList.add('rest1');
      break;
    case 0:
      removeClassByPrefix(display, 'rest');
      display.classList.add('rest0');
  }
  const mins = Math.floor(seconds / 60);
  const secs = (seconds % 60).toString().padStart(2, '0');
  const timeDisplay = `${mins}:${secs}`
  document.title = timeDisplay;
  timeLeft.textContent = timeDisplay;
};

function displayEndTime(seconds) {
  const end = new Date(Date.now() + seconds * 1000);
  const hour = end.getHours();
  const minutes = (end.getMinutes()).toString().padStart(2, '0');
  endTime.textContent = `Be Back At ${hour}:${minutes}`;
};

function startTimer() {
  removeClassByPrefix(display, 'rest');
  timer(parseInt(this.dataset.time));
};

// manage predefined timers
intervals.forEach(interval => interval.addEventListener('click', startTimer));
// manage custom timer
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  timer(this.minutes.value * 60);
  this.reset();
});