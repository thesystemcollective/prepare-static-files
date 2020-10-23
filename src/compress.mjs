import log from '@magic/log'
import fs from '@magic/fs'

import zopfli from 'node-zopfli-es'

import { isCompressible } from './lib.mjs'

export const compress = async ({ files, silent }) =>
  await Promise.all(
    files.map(async file => {
      if (isCompressible(file)) {
        const outputName = `${file}.gz`

        const exists = await fs.exists(outputName)

        if (exists) {
          return
        }

        const input = await fs.readFile(file)

        const options = {
          verbose: false,
          verbose_more: false,
          numiterations: 15,
          blocksplitting: true,
          blocksplittinglast: false,
          blocksplittingmax: 15,
        }

        const zipped = await zopfli.gzip(input, options)
        if (zipped.length < input.length) {
          if (!silent) {
            log.info('Write compressed file:', outputName)
          }

          await fs.writeFile(outputName, zipped)
        } else {
          log.warn('ZIP', 'zipped file is bigger than original, did not save compressed file', file)
        }
      }
    }),
  )
