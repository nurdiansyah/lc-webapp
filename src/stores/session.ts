// import sha256 from "crypto-js";
import { writable } from "svelte/store";

// JWT-related
export const aud = writable("UNKNOWN");
export const browser = writable("UNKNOWN");
export const ip = writable("UNKNOWN");
export const os = writable("UNKNOWN");

export type SessionInfo = {
  name: string;
  value: string;
  version: string;
};

// export function audBuilder(bd) {
//   const version = parseInt(bd.browser.version);
//   const str = `${bd.os.name}||${bd.os.version}||||${bd.browser.name}||${version}`;
//   return sha256(str).toString();
// }

/*
 * Gets browser information based on native javascript built in functionality
 * https://medium.com/creative-technology-concepts-code/detect-device-browser-and-version-using-javascript-8b511906745
 * Usage: const bd = browserDetector(navigator, window).init();
 * bd.os.{name|version}, bd.browser.{name|version}
 */
export function browserDetector(navigator, window) {
  return {
    options: [],
    header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
    dataOS: [
      { name: "Windows Phone", value: "Windows Phone", version: "OS" },
      { name: "Windows", value: "Win", version: "NT" },
      { name: "iPhone", value: "iPhone", version: "OS" },
      { name: "iPad", value: "iPad", version: "OS" },
      { name: "Kindle", value: "Silk", version: "Silk" },
      { name: "Android", value: "Android", version: "Android" },
      { name: "PlayBook", value: "PlayBook", version: "OS" },
      { name: "BlackBerry", value: "BlackBerry", version: "/" },
      { name: "Macintosh", value: "Mac", version: "OS X" },
      { name: "Linux", value: "Linux", version: "rv" },
      { name: "Palm", value: "Palm", version: "PalmOS" }
    ],
    dataBrowser: [
      { name: "Chrome", value: "Chrome", version: "Chrome" },
      { name: "Firefox", value: "Firefox", version: "Firefox" },
      { name: "Safari", value: "Safari", version: "Version" },
      { name: "Internet Explorer", value: "MSIE", version: "MSIE" },
      { name: "Opera", value: "Opera", version: "Opera" },
      { name: "BlackBerry", value: "CLDC", version: "CLDC" },
      { name: "Mozilla", value: "Mozilla", version: "Mozilla" }
    ],
    init: function () {
      let agent = this.header.join(" "),
        os = this.matchItem(agent, this.dataOS),
        browser = this.matchItem(agent, this.dataBrowser);
      return { os, browser };
    },
    matchItem: function (string, data) {
      let i = 0,
        j = 0,
        regex,
        regexv,
        match,
        matches,
        version;

      for (i = 0; i < data.length; i += 1) {
        regex = new RegExp(data[i].value, "i");
        match = regex.test(string);
        if (match) {
          regexv = new RegExp(data[i].version + "[- /:;]([\\d._]+)", "i");
          matches = string.match(regexv);
          version = "";
          if (matches) {
            if (matches[1]) {
              matches = matches[1];
            }
          }
          if (matches) {
            matches = matches.split(/[._]+/);
            for (j = 0; j < matches.length; j += 1) {
              if (j === 0) {
                version += matches[j] + ".";
              } else {
                version += matches[j];
              }
            }
          } else {
            version = "0";
          }
          return {
            name: data[i].name,
            version: parseFloat(version)
          };
        }
      }
      return { name: "unknown", version: 0 };
    }
  };
}
