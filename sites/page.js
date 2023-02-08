import * as dotenv from 'dotenv';
dotenv.config();

export default class Page {
    async open (path) {
      await browser.url(path);
      browser.setWindowSize(1920, 1080);
    }
}