# Born in New York: gallery

## Summary
- A very simple photo and video gallery for personal use.

## Usage

### Before deploying
1. Upoad desired images and videos in Cloudinary account.
2. Set `api-creds.js` in the `server-load/` folder
3. Run `node create-list` in the `server-load/` folder.
4. Whenever adding/removing assets to Cloudinary, repeat step #3.
  
### Deploying
1. In `src/` folder 
```javascript 
npm install
```
2. In `src/` folder
```javascript
npm run build
```
3. Deploy to static server

## FIXME:
- Video player is too clumsy and takes up too much resources by loading multiple videos in the DOM.
- Image player stops autoplaying when user interacts with slides. Resuming autoplay is currently not functioning as intended.