import log from '@magic/log'
import fs from '@magic/fs'
import is from '@magic/types'

import { isImage, isLossLess, isCompressible } from './lib.mjs'

import { optimizeImage } from '../src/optimizeImage.mjs'
import { compress } from '../src/compress.mjs'
import { audio } from './audio.mjs'

const handleFiles = args => {
  const { noOptimizeImages, noAudio, noCompress } = args

  return async file => {
    try {
      const stat = await fs.stat(file)

      if (stat.isDirectory(file)) {
        await handleEntryPoints(args)(file)
      } else if (stat.isFile(file)) {
        if (is.undefined(noOptimizeImages) && isImage(file)) {
          await optimizeImage({ ...args, file })
        }

        if (is.undefined(noAudio) && isLossLess(file)) {
          await audio({ ...args, file })
        }

        // '' is set if --no-compress is passed, otherwise noCompress
        if (is.undefined(noCompress) && isCompressible(file)) {
          await compress({ ...args, file })
        }

        log.success('finished processing', file)
      }
    } catch (e) {
      log.error(e, 'error processing file', file)
    }
  }
}

export const handleEntryPoints = args => async dir => {
  const fileHandler = handleFiles(args)


  const files = await fs.getFiles(dir, false)
  await Promise.all(files.map(fileHandler))

  const dirs = await fs.getDirectories(dir, false)

  const cleanedDirs = dirs.filter(d => d !== dir)
  await Promise.all(cleanedDirs.map(fileHandler))
}


export const run = async args => {
  const { dirs } = args

  log.info('prepare-static-files started')

  const handleEntries = handleEntryPoints(args)
  await Promise.all(dirs.map(handleEntries))

  log.success('prepare-static-files done')
}
