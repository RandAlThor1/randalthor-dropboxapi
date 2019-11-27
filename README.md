# RandAlThor-dropboxapi

This is a client Wrapper to the [official Dropbox npm package](https://www.npmjs.com/package/dropbox), and is meant for small scale and only basic functionality.

# Functionality

```javascript
uploadLocalSync(location, options);
// Location is the file location of the image you wish to upload
// (optional)options is a json object of type [FilesCommitInfo](https://dropbox.github.io/dropbox-sdk-js/global.html#FilesCommitInfo)
uploadBinarySync(data, options);
// Data is the binary info of the image
// (optional)options is a json object of type [FilesCommitInfo](https://dropbox.github.io/dropbox-sdk-js/global.html#FilesCommitInfo)
downloadLocalSync(image, location, options);
// image is the path of the image within dropbox
// (optional) is the local location in which you want to save the file
// (optional) is options type [FilesDownloadArg](https://dropbox.github.io/dropbox-sdk-js/global.html#FilesDownloadArg)
downloadBinarySync(image, options);
// Returns the image Binarys
//image is the path of the image within dropbox
// (optional) is options type [FilesDownloadArg](https://dropbox.github.io/dropbox-sdk-js/global.html#FilesDownloadArg)
```

# Example

```javascript
const dropbox = require("randalthor-dropboxapi");
const client = new dropbox.Client("<ACCESS_TOKEN>");

client.uploadLocal("./image.png");
```
