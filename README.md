# Puppeteer screenshot CLI

Simple wrapper around [Puppeteer](https://github.com/GoogleChrome/puppeteer) to take screenshot from command line.

## Usage

```shell
npm i [-g] puppeteer-screenshot-cli

puppeteer-screenshot --url 'http://perdu.com' --selector 'h1' --output ./perdu.jpg
puppeteer-screenshot -u 'http://perdu.com' --selector 'body' -o - > /tmp/perdu.jpg
puppeteer-screenshot 'http://perdu.com' > perdu.jpg

```

### Options

```
  Headless screenshot with Puppeteer

    -u, --url string        Source URL

    -o, --output string     Output filename.
                            Default: to stdout

    -s, --selector string   CSS selector of DOM element to capture.
                            Default: body

    -t, --type string       Type of output image: png or jpeg.
                            Default: jpeg

    -q, --quality number    Quality of jpeg file. Only for jpeg.
                            Default: 90

    -w, --width number      Viewport width
                            Default: 800

    -h, --height number     Viewport height
                            Default: 600

    -f, --fullPage

    -?, --help              This help
```