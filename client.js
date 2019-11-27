const Dropbox = require("dropbox").Dropbox;
const isoFetch = require("isomorphic-fetch");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

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

  async uploadLocalSync(location, options) {
    if (!options) {
      options = {
        path: "/" + path.basename(location),
        mode: "overwrite"
      };
    }
    try {
      const image = await readFile(location);
      options.contents = image;
      if (image.length < this.UPLOAD_FILE_SIZE_LIMIT) {
        await this.dpx.filesUpload(options);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async uploadBinarySync(data, options) {
    if (!options) {
      options = {
        path: "/" + path.basename(location),
        mode: "overwrite"
      };
    }
    options.contents = data;
    if (data.length < this.UPLOAD_FILE_SIZE_LIMIT) {
      try {
        await this.dpx.filesUpload(options);
      } catch (error) {
        console.error(error);
      }
    }
  }

  async downloadLocalSync(image, location, options) {
    if (!options) options = {};
    if (!location) location = "";
    try {
      const binary = await this.downloadBinarySync(image, options);
      await writeFile(location + image, binary);
    } catch (error) {
      console.error(error);
    }
  }

  async downloadBinarySync(image, options) {
    if (!options) options = {};
    try {
      const result = await this.dpx.filesDownload(
        { path: "/" + image },
        options
      );
      return result.fileBinary;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports.Client = Client;
