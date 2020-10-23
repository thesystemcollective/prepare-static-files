import log from '@magic/log'
import fs from '@magic/fs'
import is from '@magic/types'
import deep from '@magic/deep'

import { optimize } from '../src/optimize.mjs'
import { compress } from '../src/compress.mjs'
import { audio } from './audio.mjs'

export const run = async args => {
  const { dirs, noAudio, noCompress, noOptimizeImages, noWebp, silent } = args

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

  if (is.undefined(noAudio)) {
    tasks.push(audio)
  }

  await Promise.all(tasks.map(async task => await task({ files, silent, noWebp })))

  log.success('done')
}
