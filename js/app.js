// 1. Big buttons
const photoBtn = document.querySelector('.selection.photos');
const videoBtn = document.querySelector('.selection.videos');

// 2. Lists of media files
let photoList, videoList = "";
let flickityString = "";

//
const photoViewer = document.querySelector('.photoViewer');
let flkty = "";
//
const createFlickityString = fileArray => {
  let innerDiv = "";
  for (filename of fileArray) {
    innerDiv += 
    `
      <div class="carousel-cell">
        <img src="${filename}" />
      </div>
    `;
  };
  flickityString = `
      ${innerDiv}
  `;
  document.querySelector('.main-carousel').innerHTML = flickityString;
 
  
}

// 3. Fetching local files
const fetchList = function(resourceType) {
  const result = fetch(`data/${resourceType}.json`)
    .then(res => res.json())
    .then(resString => { 
      document.querySelector('.preloader').style.display = "none";
      if (resourceType === "images") {
        photoList = Array.from(resString);
        createFlickityString(photoList);
      } else {
        videoList = Array.from(resString);
      };
    })
    .catch(err => console.log(err));
  }

// 4. Photo viewer
const launchPhotos = () => {
  photoViewer.style.display = "flex";
  setTimeout(() => {
    photoViewer.style.opacity = 1;

  }, 00); 

  // photoViewer.style.opacity = 1;
  flkty = new Flickity( ".main-carousel", {
    // options
    cellAlign: 'center',
    contain: true,
    imagesLoaded: true,
    percentPosition: false,
    wrapAround: true,
    autoPlay: 5000
  });
    flkty.resize();
}
const hidePhotoviewer = () => {
  photoViewer.style.opacity = 0;
  setTimeout(() => {
    photoViewer.style.display = "none";

  }, 500); 


}
// 4. Init
// - load list and add listners
window.onload = () => {
  const clicked = e => {
    if (e.target === photoBtn) {
      // console.log('photo');
      // console.log(photoList);
      launchPhotos();
    } else {
      console.log('video');
      console.log(videoList);
    }
  }
  fetchList("images");
  fetchList("videos");
  photoBtn.addEventListener('click', clicked);
  videoBtn.addEventListener('click', clicked);
  document.querySelector('.close-photo').addEventListener('click', hidePhotoviewer);
}
