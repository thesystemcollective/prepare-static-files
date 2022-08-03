import path from 'path'

import fs from '@magic/fs'
import log from '@magic/log'

import ffmpeg from 'fluent-ffmpeg'

// ffmpeg -i trailer.mov -c:v libvpx -crf 10 -b:v 1M -c:a libvorbis trailer.webm

//for f in *.mp4; do
//  ffmpeg -i "$f" -map 0 -c copy -c:v libx264 -crf 23 -preset medium h264vids/"${f%.*}.mkv";
// done

// ffmpeg -i input -c:v libx264 -preset slow -crf 22 -x264-params keyint=123:min-keyint=20 -c:a copy output.mkv

const convertFile = ({ file, force, codec, ext }) =>
  new Promise(async res => {
    const origExt = path.extname(file)
    const newFileName = file.replace(origExt, ext)
    const name = path.join(process.cwd(), newFileName)

    if (!force) {
      try {
        await fs.stat(name)
        res(false)
        return
      } catch (e) {}
    }

    ffmpeg(file)
      .addOutput(name)
      .videoCodec(codec)
      .on('end', () => res(true))
      .run()
  })

export const video = async ({ file, force, silent }) => {
  const mp4 = await convertFile({ file, force, codec: 'libx264', ext: '.mp4' })
  const webm = await convertFile({ file, force, codec: 'libvpx', ext: '.webm' })

  if ((mp4 || webm) && !silent) {
    log.info('wrote converted video files for:', file)
  }
}
