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

export { toggleFullscreen };