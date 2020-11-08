import log from '@magic/log'
import fs from '@magic/fs'

import zopfli from 'node-zopfli-es'

export const compress = async ({ file, silent, compressMinPercent = 0.1 }) => {
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

  const compressPercent = compressMinPercent <= 1 ? compressMinPercent : compressMinPercent / 100
  const requiredSizeReduction = input.length * compressPercent

  const difference = input.length - zipped.length
  const kbMinimium = 512000

  if (difference > requiredSizeReduction && difference < kbMinimium) {
    await fs.writeFile(outputName, zipped)

    if (!silent) {
      log.info('Wrote compressed file:', outputName)
    }
  } else {
    if (!silent) {
      log.warn('ZIP', `less than 10% and less than 512kb smaller. ignoring`, file)

      try {
        const stat = await fs.stat(outputName)
        const difference = input.length - stat.size
        if (difference < requiredSizeReduction) {
          await fs.rmrf(outputName)
        }
      } catch (e) {}
    }
  }
}
