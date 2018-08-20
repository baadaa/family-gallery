// TODO:
// 
// 3. Update .gitignore to include server-side codes
// 4. Detect event emitted by Flickity to better handle pause/play
// 

import './styles.scss';
import './modules/flickity.min.css';
import { shuffle } from './modules/shuffle';
import { toggleFullscreen } from './modules/toggleFullscreen';
import Flickity from 'flickity-bg-lazyload';
import { imgOptions, vidOptions } from './modules/flkOptions';

const photoViewer = document.querySelector('.photoViewer');
const videoViewer = document.querySelector('.videoViewer');

const hidePreloader = () => {
  document.querySelector('.preloader').style.opacity = 0;
} 

const fetchList = resourceType => {
  fetch(`data/${resourceType}.json`)
    .then(res => res.json())
    .then(resString => {
      hidePreloader();
      flkMethods.createFlktyString(shuffle(Array.from(resString)), resourceType);
    })
    .catch(err => console.log(err));
}

const assetString = (resourceType, filename) => {
  return (resourceType === "images") ?
  `<div class="carousel-cell" data-flickity-bg-lazyload='${filename}'></div>` :
  `<div class="carousel-cell"><video controls><source src="${filename}" type="video/mp4"></video></div>`;
}
const isPhoto = resourceType => resourceType === "images";
const stopAllVid = () => { document.querySelectorAll('video').forEach((vid) => vid.pause()) };
const flkMethods = {
  createFlktyString(fileArray, resourceType) {
    const viewer = isPhoto(resourceType) ? document.querySelector('.photoViewer .main-carousel') : document.querySelector('.videoViewer .main-carousel');
    viewer.innerHTML = fileArray.map(filename => assetString(resourceType, filename)).join('');
  },
  launchFlkty(resourceType) {
    const viewer = isPhoto(resourceType) ? photoViewer : videoViewer;
    const carousel = viewer.querySelector('.main-carousel');
    viewer.style.display = "flex";
    setTimeout(() => { viewer.style.opacity = 1 }, 0);
    setTimeout(() => { toggleFullscreen("on") }, 500);
    const flkty = new Flickity(carousel, imgOptions);
    flkty.resize();
  },
  hideViewer(e) {
    const isPhoto = e.target.parentNode.className === "photoViewer";
    const viewer = (isPhoto) ? photoViewer : videoViewer;
    if (!isPhoto) { stopAllVid() };
    viewer.style.opacity = 0;
    setTimeout(() => {
      viewer.style.display = "none";
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
  document.querySelector('.close-photo').addEventListener('click', flkMethods.hideViewer);
  document.querySelector('.close-video').addEventListener('click', flkMethods.hideViewer);
  document.querySelector('.auto-play').addEventListener('click', flkMethods.unpauseFlkty);
}
