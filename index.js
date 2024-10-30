import { launch } from 'puppeteer';
import { writeFileSync } from 'fs';

const defaultImageOptions = {
  launchOptions: {
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  },
  gotoOptions: {
    waitUntil: 'networkidle0',
  },
  evaluate: () => {
    const className = document.querySelector('.className');
    if (className) {
      className.style.display = 'none';
    }
  },
  waitForSelector: '.className',
  waitForTimeout: 1000,
  imageOptions: {
    encoding: 'base64',
    fullPage: true,
  },
};

const defaultPdfOptions = {
  format: 'A4',
};

async function captureImage(url, options) {
  const browser = await launch(options?.launchOptions || defaultImageOptions.launchOptions);
  const page = await browser.newPage();

  await page.goto(url, options?.gotoOptions || defaultImageOptions.gotoOptions);
  if (typeof options?.evaluate === 'function') { await page.evaluate(options.evaluate); }
  if (options?.waitForSelector) { await page.waitForSelector(options.waitForSelector); }
  if (options?.waitForTimeout) { await new Promise(resolve => setTimeout(resolve, options.waitForTimeout)); }
  const screenshot = await page.screenshot(options?.imageOptions || defaultImageOptions.imageOptions);
  await browser.close();
  return screenshot;
}

async function capturePdf(url, path, options = {}) {
  const browser = await launch(options.launchOptions || defaultImageOptions.launchOptions);
  const page = await browser.newPage();
  await page.goto(url, options.gotoOptions || defaultImageOptions.gotoOptions);
  if (typeof options.evaluate === 'function') { await page.evaluate(options.evaluate); }
  if (options.waitForSelector) { await page.waitForSelector(options.waitForSelector); }
  if (options.waitForTimeout) { await new Promise(resolve => setTimeout(resolve, options.waitForTimeout)); }
  const pdf = await page.pdf(options.pdfOptions || defaultPdfOptions);
  writeFileSync(path, pdf);
  await browser.close();
  return path;
}

const capture = {

  image: async (url, options) => {
    return await captureImage(url, options);
  },

  pdf: async (url, path, options) => {
    return await capturePdf(url, path, options);
  },

  asFile: {
    image: async (url, path, options) => {
      const data = await captureImage(url, options);
      writeFileSync(path, data, { encoding: 'base64' });
      return path;
    },
  }
};

// capture.asFile.image('https://www.google.com', 'google.png');

export default capture 
