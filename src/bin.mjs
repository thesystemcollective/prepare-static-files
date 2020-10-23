#!/usr/bin/env node

import cli from '@magic/cli'
import log from '@magic/log'
import fs from '@magic/fs'
import is from '@magic/types'
import deep from '@magic/deep'

import { optimize } from '../src/optimize.mjs'
import { compress } from '../src/compress.mjs'

const cliArgs = {
  options: [
    ['--help', '-help', 'help', '--h', '-h'],
    ['--no-optimize-images', '--no-opt'],
    ['--no-compress', '--no-zip'],
    ['--dirs', '--dir', '-d'],
    ['--silent', '--quiet', '-q'],
    ['--no-webp'],
  ],
  single: ['--no-optimize-images', '--no-compress', '--no-webp'],
  default: {
    '--dirs': ['docs'],
  },
  help: {
    name: 'thesystem - prepare-static-files',
    header: 'sharp optimizes images, zopfli compresses other assets',
    options: {
      '--dirs': 'directories to work on.',
      '--no-optimize-images': 'do not sharp optimize images',
      '--no-compress': 'do not compress files',
      '--no-webp': 'do not generate webp files',
      '--silent': 'do not output info logs',
    },
    example: `
# optimize and compress files
prepare-static-files

# do not optimize images
prepare-static-files --no-optimize-images
prepare-static-files --no-opt

# do not compress files
prepare-static-files --no-compress
prepare-static-files --no-zip

# show this help text
prepare-static-files --help
`,
  },
}

const run = async () => {
  const { args } = cli(cliArgs)

  const { dirs, noCompress, noOptimizeImages, noWebp, silent } = args

  const tasks = []

  log.info('prepare-static-files started')

  const deepFiles = await Promise.all(dirs.map(async dir => await fs.getFiles(dir)))

  const files = deep.flatten(deepFiles)

  if (!files.length) {
    log.error('Found no files to edit. Exiting.')
    return
  }

  // '' is set if --no-compress is passed, otherwise noCompress
  if (is.undefined(noCompress)) {
    tasks.push(compress)
  }

  if (is.undefined(noOptimizeImages)) {
    tasks.push(optimize)
  }

  await Promise.all(tasks.map(async task => await task({ files, silent, noWebp })))

  log.success('done')
}

run()
