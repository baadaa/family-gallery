// TODO:
// 
// 1. Break out into modules
// 2. Build out video player
// 3. Update .gitignore to include server-side codes
// 4. Detect event emitted by Flickity to better handle pause/play
//

import './styles.scss';
import './modules/flickity.min.css';
import { shuffle } from './modules/shuffle';
import { toggleFullscreen } from './modules/toggleFullscreen';
import Flickity from 'flickity-bg-lazyload';

let photoList, videoList, flkty;
let flkOptions = {
  cellAlign: 'center',
  contain: true,
  imagesLoaded: true,
  percentPosition: false,
  wrapAround: true,
  autoPlay: 5000,
  bgLazyLoad: true,
  bgLazyLoad: 2,
  pauseAutoPlayOnHover: false
}
const photoViewer = document.querySelector('.photoViewer');

const fetchList = resourceType => {
  const result = fetch(`data/${resourceType}.json`)
    .then(res => res.json())
    .then(resString => {
      document.querySelector('.preloader').style.display = "none";
      if (resourceType === "images") {
        photoList = Array.from(resString);
        flkMethods.createFlickityString(shuffle(photoList));
      } else {
        videoList = Array.from(resString);
      };
    })
    .catch(err => console.log(err));
}

const flkMethods = {
  createFlickityString(fileArray) {
    let innerDiv = "";
    for (let filename of fileArray) {
      innerDiv += `<div class="carousel-cell" data-flickity-bg-lazyload='${filename}'></div>`;
    };
    document.querySelector('.main-carousel').innerHTML = innerDiv;
  },
  launchPhotos() {
    photoViewer.style.display = "flex";
    setTimeout(() => { photoViewer.style.opacity = 1 }, 0);
    setTimeout(() => { toggleFullscreen("on") }, 500);
    flkty = new Flickity(".main-carousel", flkOptions);
    flkty.resize();
  },
  hidePhotoviewer() {
    photoViewer.style.opacity = 0;
    setTimeout(() => {
      photoViewer.style.display = "none";
      toggleFullscreen("off");
    }, 500);
  },
  unpause() {
    console.log(flkty);
    flkty.playPlayer();
    console.log('clicked');
  }
};



// 4. Init
// - load list and add listners
window.onload = () => {
  const clicked = e => {
    if (e.target.className == 'selection photos') {
      flkMethods.launchPhotos();
    } else {
      console.log('video');
      console.log(videoList);
    }
  }
  fetchList("images");
  fetchList("videos");
  document.querySelector('.selection.photos').addEventListener('click', clicked);
  document.querySelector('.selection.videos').addEventListener('click', clicked);
  document.querySelector('.close-photo').addEventListener('click', flkMethods.hidePhotoviewer);
  document.querySelector('.auto-play').addEventListener('click', flkMethods.unpause);
}
