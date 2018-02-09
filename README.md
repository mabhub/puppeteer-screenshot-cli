# Puppeteer screenshot CLI

Simple wrapper around [Puppeteer](https://github.com/GoogleChrome/puppeteer) to take screenshot from command line.

## Usage

```shell
npm i [-g] puppeteer-screenshot-cli

puppeteer-screenshot 'http://perdu.com' --selector 'h1'
```

### Options

Default viewport size is `800px × 600px`. Use `--width` and `--height` to
override.

*See `puppeteer-screenshot --help` for more options.*
