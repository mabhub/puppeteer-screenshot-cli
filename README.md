# Puppeteer screenshot CLI

Simple wrapper around [Puppeteer](https://github.com/GoogleChrome/puppeteer) to take screenshot from command line.

## Usage

```shell
npm i [-g] puppeteer-screenshot-cli

puppeteer-screenshot --url 'http://perdu.com' --selector 'h1' --output ./perdu.jpg
puppeteer-screenshot -u 'http://perdu.com' -s 'body' -o - > /tmp/perdu.jpg
puppeteer-screenshot 'http://perdu.com' > perdu.jpg

```

### Options

```
  Headless screenshot with Puppeteer

    -u, --url string        URL to navigate page to. The url should include scheme, e.g. https://.

    -o, --output string     The file path to save the image to. If path is a relative path, then it is
                            resolved relative to current working directory. If no path is provided, the
                            image won't be saved to the disk.

    -s, --selector string   A CSS selector of an element to wait for.
                            Default: body

    -t, --type string       Specify screenshot type, can be either jpeg or png.
                            Default: png

    -q, --quality number    The quality of the image, between 0-100. Not applicable to png images.

    -w, --width number      Viewport width in pixels
                            Default: 800

    -h, --height number     Viewport height in pixels
                            Default: 600

    -f, --fullPage          When true, takes a screenshot of the full scrollable page.
                            Defaults: false.

    --headless              Whether to run browser in headless mode.
                            Default: true

    -?, --help              This help
```