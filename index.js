#!/usr/bin/env node

const puppeteer = require('puppeteer');
const EOL       = '\n';

const argsDef = [
  { name: 'url',      alias: 'u', type: String,  description: 'URL to navigate page to. The url should include scheme, e.g. https://.' + EOL, defaultOption: true },
  { name: 'output',   alias: 'o', type: String,  description: 'The file path to save the image to. If path is a relative path, then it is resolved relative to current working directory. If no path is provided, the image won\'t be saved to the disk.' + EOL },
  { name: 'selector', alias: 's', type: String,  description: 'A CSS selector of an element to wait for. \n[italic]{Default: body}' + EOL },
  { name: 'type',     alias: 't', type: String,  description: 'Specify screenshot type, can be either jpeg or png. \n[italic]{Default: png}' + EOL },
  { name: 'quality',  alias: 'q', type: Number,  description: 'The quality of the image, between 0-100. Not applicable to png images.' + EOL },
  { name: 'width',    alias: 'w', type: Number,  description: 'Viewport width in pixels \n[italic]{Default: 800}' + EOL },
  { name: 'height',   alias: 'h', type: Number,  description: 'Viewport height in pixels \n[italic]{Default: 600}' + EOL },
  { name: 'timeout ',             type: Number,  description: 'Maximum time to wait for in milliseconds. \n[italic]{Default: 30000}' + EOL },
  { name: 'fullPage', alias: 'f', type: Boolean, description: 'When true, takes a screenshot of the full scrollable page. \n[italic]{Defaults: false}.' + EOL },
  { name: 'noheadless',           type: Boolean, description: 'Allow disabling headless mode. \n[italic]{Default: false}' + EOL},
  { name: 'help',     alias: '?', type: Boolean, description: 'This help'  + EOL },
];

const args  = require('command-line-args')(argsDef);
const usage = require('command-line-usage')({ header: 'Headless screenshot with Puppeteer', optionList: argsDef });

const doCapture = async function ({
  url,
  output,
  type,
  quality,
  noheadless,
  selector = 'body',
  width    = 800,
  height   = 600,
  timeout  = 30000,
  fullPage = false,
}) {
  const browser = await puppeteer.launch({ headless: !noheadless });
  const page    = await browser.newPage();

  page.setDefaultNavigationTimeout(timeout);

  try {
    await page.setViewport({ width, height });

    await page.goto(url, { waitUntil: [ 'load', 'networkidle0' ] });

    await page.waitForSelector(selector, { visible: true, timeout });

    output  = output === '-' ? undefined : output;
    type    = type === 'jpg' ? 'jpeg' : type;

    const picture = await page.screenshot({
      type, quality, fullPage,
      path: output,
      clip: !fullPage && await (await page.$(selector)).boundingBox(),
    });

    if (!output) {
      process.stdout.write(picture);
    }

  } catch (error) {
    await browser.close();
    process.exitCode = 1;
    throw error;
  }

  await browser.close();
};


if (args.help || !args.url) {
  !args.help && process.stderr.write('No url provided.' + EOL);
  process.stderr.write(usage);
  process.exitCode = 1;
} else {
  doCapture(args);
}
