import path from 'path'

import fs from '@magic/fs'
import log from '@magic/log'

import ffmpeg from 'fluent-ffmpeg'

// ffmpeg -i input.mp3 -c:a aac -b:a 192k output.m4a

const convertFile = ({ file, codec, ext }) =>
  new Promise(async res => {
    const origExt = path.extname(file)
    const name = path.join(process.cwd(), file.replace(origExt, ext))

    const exists = await fs.exists(name)

    if (exists) {
      res(false)
    }

    ffmpeg(file)
      .addOutput(name)
      //.audioBitrate(192)
      .audioCodec(codec)
      .on('end', () => res(true))
      .run()
  })

export const audio = async ({ file, silent }) => {
  const status = await Promise.all([
    convertFile({ file, codec: 'aac', ext: '.mp4' }),
    convertFile({ file, codec: 'libmp3lame', ext: '.mp3' }),
  ])

  if (status.includes(true) && !silent) {
    log.info('wrote converted audio files for:', file)
  }
}
