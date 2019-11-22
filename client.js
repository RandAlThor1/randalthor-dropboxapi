const Dropbox = require("dropbox").Dropbox;
const isoFetch = require("isomorphic-fetch");
const fs = require("fs");
const path = require("path");

class Client {
  constructor(ACCESS_TOKEN) {
    this.ACCESS_TOKEN = ACCESS_TOKEN;
    this.UPLOAD_FILE_SIZE_LIMIT = 150 * 1024 * 1024;
    const dpx = new Dropbox({
      accessToken: this.ACCESS_TOKEN,
      fetch: isoFetch
    });
    this.dpx = dpx;
  }

  uploadLocalSync(location, options) {
    if (!options) {
      options = {
        path: "/" + path.basename(location),
        mode: "overwrite"
      };
    }
    options.contents = fs.readFileSync(location);
    const imageStats = fs.statSync(location);
    if (imageStats.size < this.UPLOAD_FILE_SIZE_LIMIT) {
      this.dpx
        .filesUploadSync(options)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  async uploadLocal(location, options) {
    if (!options) {
      options = {
        path: "/" + path.basename(location),
        mode: "overwrite"
      };
    }
    fs.readFile(location, (err, data) => {
      if (err) console.log(err);
      else {
        options.contents = data;
        fs.stat(location, (error, stats) => {
          if (error) console.error(error);
          else {
            if (stats.size < this.UPLOAD_FILE_SIZE_LIMIT) {
              this.dpx
                .filesUpload(options)
                .then(res => {
                  console.log(res);
                })
                .catch(er => {
                  console.log(er);
                });
            }
          }
        });
      }
    });
  }

  async downloadLocal(image, location, options) {
    if (!options) options = {};
    if (!location) location = "";
    try {
      let result = await this.dpx.filesDownload({ path: "/" + image }, options);
      if (!result) console.log("Error Downloading image Locally");
      fs.writeFile(location + image, result.fileBinary, err => {
        if (err) console.log(err);
      });
    } catch (error) {
      console.error(error);
    }
  }

  downloadLocalSync(image, location, options) {
    if (!options) options = {};
    if (!location) location = "";
    this.dpx
      .filesDownload({ path: "/" + image }, options)
      .then(res => {
        fs.writeFileSync(location + image, res.fileBinary);
      })
      .catch(err => {
        console.error(err);
      });
  }

  downloadBinarySync(image, location, options) {
    if (!options) options = {};
    if (!location) location = "";
    this.dpx
      .filesDownload({ path: "/" + image }, options)
      .then(res => {
        return res.fileBinary;
      })
      .catch(err => {
        console.log(err);
        return undefined;
      });
  }
}