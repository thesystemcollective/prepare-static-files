import log from '@magic/log'
import fs from '@magic/fs'

import zopfli from 'node-zopfli-es'

export const compress = async ({ file, silent }) => {
  const outputName = `${file}.gz`

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
  const twentyPercent = input.length * 0.2
  const difference = input.length - zipped.length

  if (difference > twentyPercent) {
    await fs.writeFile(outputName, zipped)

    if (!silent) {
      log.info('Wrote compressed file:', outputName)
    }
  } else {
    if (!silent) {
      log.warn('ZIP', 'less than 20% smaller', file)

      try {
        const stat = await fs.stat(outputName)
        const difference = input.length - stat.size
        if (difference < twentyPercent) {
          await fs.rmrf(outputName)
        }
      } catch (e) { }
    }
  }
}
