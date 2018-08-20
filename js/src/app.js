// TODO:
// 
// 2. Build out video player
// 3. Update .gitignore to include server-side codes
// 4. Detect event emitted by Flickity to better handle pause/play
// 

import './styles.scss';
import './modules/flickity.min.css';
import { shuffle } from './modules/shuffle';
import { toggleFullscreen } from './modules/toggleFullscreen';
import Flickity from 'flickity-bg-lazyload';
import { flkOptions } from './modules/flkOptions';

const mediaViewer = document.querySelector('.mediaViewer');
const videoViewer = document.querySelector('.videoViewer');
let imgList, vidList;
const fetchList = resourceType => {
  fetch(`data/${resourceType}.json`)
    .then(res => res.json())
    .then(resString => {
      document.querySelector('.preloader').style.display = "none";
      flkMethods.createFlktyString(shuffle(Array.from(resString)), resourceType);
    })
    .catch(err => console.log(err));
}

const flkMethods = {
  createFlktyString(fileArray, resourceType) {
    if (resourceType === "images") {
      document.querySelector('.mediaViewer .main-carousel').innerHTML = fileArray.map(filename => {
        return `<div class="carousel-cell" data-flickity-bg-lazyload='${filename}'></div>`;
      }).join('');
    } else {
      document.querySelector('.videoViewer .main-carousel').innerHTML = fileArray.map(filename => {
        return `<div class="carousel-cell"><video controls><source src="${filename}" type="video/mp4"></video></div>`;
      }).join('');
      console.log(vidList);
      // return 'ddd';
    }

  },
  launchFlkty(resourceType) {
    if (resourceType === "images") {
      mediaViewer.style.display = "flex";
      setTimeout(() => { mediaViewer.style.opacity = 1 }, 0);
      setTimeout(() => { toggleFullscreen("on") }, 500);
      const flkty = new Flickity(".mediaViewer .main-carousel", flkOptions);
      flkty.resize();
    } else {
      videoViewer.style.display = "flex";
      setTimeout(() => { videoViewer.style.opacity = 1 }, 0);
      setTimeout(() => { toggleFullscreen("on") }, 500);
      const flkty = new Flickity(".videoViewer .main-carousel", flkOptions);
      flkty.resize();
    }    // document.querySelector('.main-carousel').innerHTML = fileString;
  },
  hidePhotoViewer() {
    mediaViewer.style.opacity = 0;
    setTimeout(() => {
      mediaViewer.style.display = "none";
      toggleFullscreen("off");
    }, 500);
  },
  hideVideoViewer() {
    videoViewer.style.opacity = 0;
    document.querySelectorAll('video').forEach((vid) => vid.pause());
    setTimeout(() => {
      videoViewer.style.display = "none";
      toggleFullscreen("off");
    }, 500);
  },
  unpauseFlkty() {
    flkty.playPlayer();
  }
};



// 4. Init
// - load list and add listners
window.onload = () => {
  fetchList("images");
  fetchList("videos");
  const clicked = e => {
    if (e.target.className == 'selection photos') {
      flkMethods.launchFlkty("images");
    } else {
      flkMethods.launchFlkty("videos");
      
    }
  }

  document.querySelector('.selection.photos').addEventListener('click', clicked);
  document.querySelector('.selection.videos').addEventListener('click', clicked);
  document.querySelector('.close-photo').addEventListener('click', flkMethods.hidePhotoViewer);
  document.querySelector('.close-video').addEventListener('click', flkMethods.hideVideoViewer);
  document.querySelector('.auto-play').addEventListener('click', flkMethods.unpauseFlkty);
}
