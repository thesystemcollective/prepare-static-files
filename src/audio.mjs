import path from 'path'

import fs from '@magic/fs'
import log from '@magic/log'

import ffmpeg from 'fluent-ffmpeg'

import { isLossLess } from './lib.mjs'

// ffmpeg -i input.mp3 -c:a aac -b:a 192k output.m4a

const convertFile = ({ file, codec, ext }) =>
  new Promise(async res => {
    const origExt = path.extname(file)
    const name = file.replace(origExt, ext)

    const exists = await fs.exists(name)
    if (exists) {
      res()
      return
    }

    ffmpeg(file).addOutput(name).audioBitrate(192).audioCodec(codec).on('end', res).run()
  })

export const audio = async ({ files, silent }) =>
  await Promise.all(
    files.map(async file => {
      if (isLossLess(file)) {
        if (!silent) {
          log.info('start converting audio:', file)
        }

        await Promise.all([
          convertFile({ file, codec: 'aac', ext: '.m4a' }),
          convertFile({ file, codec: 'libvorbis', ext: '.ogg' }),
          convertFile({ file, codec: 'libmp3lame', ext: '.mp3' }),
        ])

        if (!silent) {
          log.info('wrote converted audio files for:', file)
        }
      }
    }),
  )
