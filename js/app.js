var photoBtn = document.querySelector('.selection.photos');
var videoBtn = document.querySelector('.selection.videos');
var photoList, videoList;
var fetchList = function(resourceType) {
  var result = fetch('data/' + resourceType + ".json")
    .then(function(res) { return res.json()})
    .then(function(resString) { 
      document.querySelector('.preloader').style.display = "none";
      if (resourceType === "images") {
        photoList = Array.from(resString);
      } else {
        videoList = Array.from(resString);
      }
    })
    .catch(function(err) { console.log(err)});
  }

var clicked = function(e) {
  if (e.target === photoBtn) {
    console.log('photo');
    console.log(photoList);
  } else {
    console.log('video');
    console.log(videoList);
  }
}
// console.log(photoList);
window.onload = function() {
  fetchList("images");
  fetchList("videos");
  photoBtn.addEventListener('click', clicked);
  videoBtn.addEventListener('click', clicked);
}
