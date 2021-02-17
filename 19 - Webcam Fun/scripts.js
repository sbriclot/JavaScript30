const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(err => {
      console.error("Cam error !!!", err);
    });
};

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    let pixels = ctx.getImageData(0, 0, width, height);
    // pixels = redEffect(pixels);
    // pixels = rgbEffect(pixels);
    // ctx.globalAlpha = 0.1;
    pixels = greenScreen(pixels);
    ctx.putImageData(pixels, 0, 0);
  }, 16);
};

function takePhoto() {
  //played the soound
  snap.currentTime = 0;
  snap.play();

  // take data out of the canvas
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src="${data}" alt="Handsome Man"/>`;
  strip.insertBefore(link, strip.firstChild);
};

function redEffect(pixels) {
  for(let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100; // Red
    pixels.data[i + 1] = pixels.data[i + 1] - 50;  // Green
    pixels.data[i + 2] = pixels.data[i + 2] * .5;  // Blue
  }
  return pixels;
};

function rgbEffect(pixels) {
  for(let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0] + 100; // Red
    pixels.data[i + 500] = pixels.data[i + 1] - 50;  // Green
    pixels.data[i - 500] = pixels.data[i + 2] * .5;  // Blue
  }
  return pixels;
};

function greenScreen(pixels) {
  const levels = {};
  document.querySelectorAll('.rgb input').forEach((level) => {
    levels[level.name] = level.value;
  });

  for(let i = 0; i < pixels.data.length; i += 4) {
    red = pixels.data[i + 0] + 100; // Red
    green = pixels.data[i + 1] - 50;  // Green
    blue = pixels.data[i + 2] * .5;  // Blue
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
        pixels.data[i + 3] = 0;
    }
  }
  return pixels;
};

getVideo();

video.addEventListener('canplay', paintToCanvas);