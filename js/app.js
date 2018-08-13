function shuffle(arra1) {
  var ctr = arra1.length, temp, index;

// While there are elements in the array
  while (ctr > 0) {
// Pick a random index
      index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
      ctr--;
// And swap the last element with it
      temp = arra1[ctr];
      arra1[ctr] = arra1[index];
      arra1[index] = temp;
  }
  return arra1;
}

let photoList, videoList = "";
let flickityString = "";
const photoViewer = document.querySelector('.photoViewer');
let flkty = "";

const createFlickityString = fileArray => {
  let innerDiv = "";
  for (filename of fileArray) {
    innerDiv += `
      <div class="carousel-cell" data-flickity-bg-lazyload='${filename}'>
      </div>`;
  };
  flickityString = innerDiv;
  document.querySelector('.main-carousel').innerHTML = flickityString;
}

const fetchList = function (resourceType) {
  const result = fetch(`data/${resourceType}.json`)
    .then(res => res.json())
    .then(resString => {
      document.querySelector('.preloader').style.display = "none";
      if (resourceType === "images") {
        photoList = Array.from(resString);
        createFlickityString(shuffle(photoList));
      } else {
        videoList = Array.from(resString);
      };
    })
    .catch(err => console.log(err));
}

const toggleFullscreen = option => {
  switch (option) {
    case "on":
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
        console.log('requestFullscreen');
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
        console.log('mozRequestFullscreen');
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
        console.log('webkitRequestFullscreen');
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
      break;
    case "off":
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      break;
    default:
      break;
  }
}
// 4. Photo viewer
const launchPhotos = () => {
  photoViewer.style.display = "flex";
  setTimeout(() => {
    photoViewer.style.opacity = 1;
  }, 00);
  setTimeout(() => {
    toggleFullscreen("on");
  }, 500);

  flkty = new Flickity(".main-carousel", {
    // options
    cellAlign: 'center',
    contain: true,
    imagesLoaded: true,
    percentPosition: false,
    wrapAround: true,
    autoPlay: 5000,
    bgLazyLoad: true,
    bgLazyLoad: 2,
    pauseAutoPlayOnHover: false
  });
  flkty.resize();
}
const hidePhotoviewer = () => {
  photoViewer.style.opacity = 0;
  setTimeout(() => {
    photoViewer.style.display = "none";
    toggleFullscreen("off");
  }, 500);
}
const unpause = () => {
  console.log(flkty);
  flkty.playPlayer();
  flkty.unpausePlayer();
  console.log('clicked');
}
// 4. Init
// - load list and add listners
window.onload = () => {
  const clicked = e => {
    if (e.target.className == 'selection photos') {
      launchPhotos();
    } else {
      console.log('video');
      console.log(videoList);
    }
  }
  fetchList("images");
  fetchList("videos");
  document.querySelector('.selection.photos').addEventListener('click', clicked);
  document.querySelector('.selection.videos').addEventListener('click', clicked);
  document.querySelector('.close-photo').addEventListener('click', hidePhotoviewer);
  document.querySelector('.auto-play').addEventListener('click', unpause);
}
