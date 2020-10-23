#!/usr/bin/env node

import cli from '@magic/cli'
import { run } from './index.mjs'

const cliArgs = {
  options: [
    ['--dirs', '--dir', '-d'],
    ['--no-optimize-images', '--no-opt'],
    ['--no-compress', '--no-zip'],
    '--no-audio',
    ['--silent', '--quiet', '-q'],
    '--no-webp',
  ],
  single: ['--no-optimize-images', '--no-compress', '--no-webp', '--no-audio'],
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
      '--no-audio': 'do not generate aac and ogg files from mp3s',
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

# do not create audio files from mp3s
prepare-static-files --no-audio

# show this help text
prepare-static-files --help
`,
  },
}

const { args } = cli(cliArgs)

run(args)
