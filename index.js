const puppeteer = require('puppeteer');
const express = require('express');
const cors = require('cors');
const multer = require('multer');  // Multer paketini ekle
const app = express();
const PORT = 3000;

// CORS'u kullan
app.use(cors());
app.use(express.json());


// Multer ayarları, dosya yüklemeleri için kullanılır
const upload = multer();

async function captureScreenshot(url) {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1920,
      height: 1080
    }
  });

  const page = await browser.newPage();
  //wair 5s
  await page.goto(url, {
    waitUntil: 'networkidle0',
  });

  // Pop-up'ı gizlemek için bir elementin CSS'ini değiştir
  await page.evaluate(() => {
    // const popup = document.querySelector('#onetrust-consent-sdk');
    // const removeads = document.querySelector('#primisAdContainer');
    // const pointers = document.querySelector('.z-views');
    // const pointers2 = document.querySelector('.pointer-events-none');
    // const bottomMenu = document.querySelector('.bottom-menu');
    // const sidebar = document.querySelector('[data-v-ea98bd18]');
    // const instagram = document.querySelector('.x9f619');
    const video = document.querySelector('vm-ihsd3zj7de_html5_api');

    if (
      // popup && removeads && pointers &&
      // bottomMenu && pointers2 && sidebar
      // && instagram
      video
    ) {
      // instagram.style.display = 'none';
      // popup.style.display = 'none';
      // sidebar.style.display = 'none';
      // pointers.style.display = 'none';
      // pointers2.style.display = 'none';
      // removeads.style.display = 'none';
      // bottomMenu.style.display = 'none';

      // add autoplay 
      video.setAttribute('autoplay', 'true');
    }
  });

  const screenshot = await page.screenshot({
    encoding: 'base64',
    fullPage: true
  });

  await browser.close();
  return screenshot;
}


app.post('/screenshot', upload.none(), async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).send('URL is required');
  }

  try {
    const screenshot = await captureScreenshot(url);

    // Base64 olarak dönüyoruz
    res.json({ screenshot });
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to capture screenshot');
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
