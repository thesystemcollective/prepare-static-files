#!/usr/bin/env node

import log from '@magic/log'

import { isCompressible } from './lib.mjs'

export const compress = async ({ files, silent }) =>
  await Promise.all(files.map(async file => {
    if (isCompressible(file)) {
      console.log('compressible', file)
    }
  }))
