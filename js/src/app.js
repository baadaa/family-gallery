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

const photoViewer = document.querySelector('.photoViewer');

const fetchList = resourceType => {
  fetch(`data/${resourceType}.json`)
    .then(res => res.json())
    .then(resString => {
      document.querySelector('.preloader').style.display = "none";
      if (resourceType === "images") {
        return flkMethods.createFlktyString(shuffle(Array.from(resString)));
      } else {
        console.log(Array.from(resString));
        return Array.from(resString);
      };
    })
    .catch(err => console.log(err));
}

const flkMethods = {
  createFlktyString(fileArray) {
    const divStr = fileArray.map(filename => {
        return `<div class="carousel-cell" data-flickity-bg-lazyload='${filename}'></div>`;
      }).join('');
    document.querySelector('.main-carousel').innerHTML = divStr;
  },
  launchFlktyPhotos() {
    photoViewer.style.display = "flex";
    setTimeout(() => { photoViewer.style.opacity = 1 }, 0);
    setTimeout(() => { toggleFullscreen("on") }, 500);
    const flkty = new Flickity(".main-carousel", flkOptions);
    flkty.resize();
  },
  hideFlktyPhotoViewer() {
    photoViewer.style.opacity = 0;
    setTimeout(() => {
      photoViewer.style.display = "none";
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
  const clicked = e => {
    if (e.target.className == 'selection photos') {
      flkMethods.launchFlktyPhotos();
    } else {
      console.log('video');
    }
  }
  fetchList("images");
  fetchList("videos");
  document.querySelector('.selection.photos').addEventListener('click', clicked);
  document.querySelector('.selection.videos').addEventListener('click', clicked);
  document.querySelector('.close-photo').addEventListener('click', flkMethods.hideFlktyPhotoViewer);
  document.querySelector('.auto-play').addEventListener('click', flkMethods.unpauseFlkty);
}
