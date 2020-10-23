import ffmpeg from 'fluent-ffmpeg'
import { isAudio } from './lib.mjs'

export const audio = async ({ files, silent }) =>
  await Promise.all(files.map(async file => {
    if (isAudio(file)) {
      console.log('is audio', file)
    }
  }))
