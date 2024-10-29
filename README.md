# website-to-file

`website-to-file` is a Node.js library for capturing screenshots and generating PDFs from web pages using Puppeteer. It provides a simple interface to take images and PDF snapshots while allowing customization of various options.

## Installation

You can install `website-to-file` via npm:

```bash
npm install website-to-file
```

## Usage

```javascript
import capture from 'website-to-file';
```

### Functions

```javascript
capture.image(url, options);
capture.asFile.image(url, path, options);
capture.pdf(url, path, options);
```

### Options

```javascript
const options = {
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
```

### Capturing Images

```javascript
// As Base64 (can be changed in options)
const screenshot = await capture.image('https://ismetomerkoyuncu.tech');

// As a file
await capture.asFile.image('https://ismetomerkoyuncu.tech', 'example.png');
```

### Capturing PDFs

```javascript
await capture.pdf('https://ismetomerkoyuncu.tech', 'output.pdf');
```

### Evaluating JavaScript

```javascript
// Hiding an element with a specific class
capture.pdf(
	'https://medium.com/@ismetkync/closure-nedir-4b1eb7177598',
	`${Date.now()}.pdf`,
	{
		evaluate: () => {
			const className = document.querySelector('.bx');
			if (className) {
				className.style.display = 'none';
			}
		},
	},
);
```
