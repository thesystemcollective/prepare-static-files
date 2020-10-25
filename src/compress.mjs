import log from '@magic/log'
import fs from '@magic/fs'

import zopfli from 'node-zopfli-es'

export const compress = async ({ file, silent }) => {
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
    await fs.writeFile(outputName, zipped)

    if (!silent) {
      log.info('Wrote compressed file:', outputName)
    }
  } else {
    if (!silent) {
      log.warn('ZIP', 'zipped file is bigger than original, did not save compressed file', file)
    }
  }
}
