## @grundstein/prepare-static-files

this is a cli tool that prepares directories of static files for hosting by optimizing them
using sharp, zopfli and ffmpeg.

it also generates alternative file formats for browser compatibility.

### converts:
* image files automatically get duplicated as webp.
* non audio, non image and non video files get zopfli gzipped, if their size is more than 10% smaller or the savings are bigger than 512kb.
  in our tests on older phones, those levels where the sweetspot compromise between decompression and download time.
* convert flac to mp4, mp3 and ogg. add missing file formats if one of those (mp4, mp3, ogg) exists, but no other versions.

#### install

```bash
npm i --save-dev @grundstein/prepare-static-files
```

now, node_modules/.bin/prepare-static-files exists.

#### usage

in package.json:
```json
{
  "scripts": {
    "optimize": "prepare-static-files"
  }
}
```

#### cli script:

if installed globally (npm i -g):
```bash
prepare-static-files --help
```

if installed locally, in your repository:
```
node_modules/.bin/prepare-static-files --help
```


#### api

prepare-static-files also exposes a javascript api

```javascript

import prepareStaticFiles from '@grundstein/prepare-static-files'

const buildFunction = async () => {
  await prepareStaticFiles({ dirs: 'public' })
}

buildFunction()

```

#### Changelog

##### v0.0.1
first release

##### v0.0.2
* fix license name in package.json
* update dependencies

##### v0.0.3
update dependencies

##### v0.0.4
* update dependencies
* etags.csv entries are alphabetically sorted

##### v0.0.5
* update dependencies

##### v0.0.6
* update dependencies

##### v0.0.7
* update dependencies
* add ply optimization code

##### v0.0.8
* FIX: ply handled the arguments wrongly

##### v0.0.9 - unreleased
...
