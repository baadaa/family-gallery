const fs = require('fs');
const fetch = require('node-fetch');
const api = require('./api-creds');

const images = `https://${api.key}:${api.secret}@${api.url}/image?max_results=500`;
const videos = `https://${api.key}:${api.secret}@${api.url}/video?max_results=500`;

// Cloudinary processing parameters
const imgParam = "c_fit,f_auto,h_1280,w_1280/";
const vidParam = "c_fit,h_1280,vc_auto,w_1280/"

const processParam = (resourceType, filename) => {
  let paramStr = (resourceType === "image") ? imgParam : vidParam;
  let insertPos = filename.indexOf('upload/') + 7;
  filename = filename.slice(0, insertPos) + paramStr + filename.slice(insertPos);
  return filename;
}

const fetchItems = resources => {
  fetch(resources)  
  .then(res => res.json())
  .then(json => {
    let links = [];
    let resType = "";
    for (item of json.resources) {
      let filename = item.secure_url;
      if (filename.endsWith('.json')) { 
        continue;
      } else if (filename.endsWith('.mov') || filename.endsWith('.mp4')) {
        filename = filename.slice(0, filename.length - 4) + ".mp4";
        resType = "videos";
        links.push(processParam("video", filename));
      } else if (filename.endsWith('.jpg')) {
        links.push(processParam("image", filename));
        resType = "images"
      } else {
        links.push(filename);
      }
    };

    fs.writeFile(`../data/${resType}.json`, JSON.stringify(links), (err) => {  
      if (err) throw err;
      console.log('saved!');
    });
    return links;
  })
  .catch(err => console.log(err));  
};

fetchItems(videos);
fetchItems(images);
