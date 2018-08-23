# Create Resource List for Player

## Summary
- Running as a server-side app, this creates two `JSON` files at `../data/` with list of images and videos from Cloudinary.
- Not to be _constantly_ running on the server; the main app loads the `JSON`s only at first load. Run this only if/when there's an update to Cloudinary resource archive—i.e. files added or/and removed.

## Setup
Make sure to create `api-creds.js` file as below.

```javascript
// api-creds.js

const key = "[API-KEY-STRING-HERE]",
  secret = "[API-SECRET-STRING-HERE]",
  url = "[api.cloudinary.com/v1_1/ACCOUNT-NAME-HERE/resources]";

module.exports = { key, secret, url };
```


## Usage
With Node installed, run:
```javascript
node create-list
```
