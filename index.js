#!/usr/bin/env node

const puppeteer       = require('puppeteer');
const commandLineArgs = require('command-line-args');
const getUsage        = require('command-line-usage');

const EOL             = '\n';

const argsDef = [
  { name: 'url',      alias: 'u', type: String,  description: 'Source URL' + EOL, defaultOption: true },
  { name: 'output',   alias: 'o', type: String,  description: 'Output filename. \n[italic]{Default: screenshot.jpeg}' + EOL },
  { name: 'selector', alias: 's', type: String,  description: 'CSS selector of DOM element to capture. \n[italic]{Default: body}' + EOL },
  { name: 'type',     alias: 't', type: String,  description: 'Type of output image: png or jpeg. \n[italic]{Default: jpeg}' + EOL },
  { name: 'quality',  alias: 'q', type: Number,  description: 'Quality of jpeg file. Only for jpeg. \n[italic]{Default: 90}' + EOL },
  { name: 'width',    alias: 'w', type: Number,  description: 'Viewport width' },
  { name: 'height',   alias: 'h', type: Number,  description: 'Viewport height' + EOL },
  { name: 'fullPage', alias: 'f', type: Boolean, description: '' + EOL },
  { name: 'headless',             type: Boolean, },
  { name: 'help',     alias: '?', type: Boolean, description: 'This help'  + EOL },
];

const args = commandLineArgs(argsDef);

const doCapture = async function ({
  url,
  output,
  selector = 'body',
  width    = 800,
  height   = 600,
  type     = 'jpeg',
  quality  = type === 'jpeg' ? 90 : undefined,
  headless = true,
  fullPage = false,
}) {
  const browser = await puppeteer.launch({headless});
  const page    = await browser.newPage();

  await page.setViewport({ width, height });

  await page.goto(url, { waitUntil: [ 'load', 'networkidle0' ] });

  await page.waitForSelector(selector, { visible: true });

  const elementHandle = await page.$(selector);

  const picture = await page.screenshot({
    type, quality, fullPage,
    path: output,
    clip: await elementHandle.boundingBox(),
  });

  if (!output) {
    process.stdout.write(picture);
  }

  await browser.close();
};

const usage = getUsage({ header: 'Headless screenshot with Puppeteer', optionList: argsDef, hide: ['headless'] });

if (args.help) {
  process.stderr.write(usage);
  process.exitCode = 1;
} else if (args.url) {
  doCapture(args);
} else {
  process.stderr.write('No url provided...' + EOL);
  process.stderr.write(usage);
  process.exitCode = 1;
}
