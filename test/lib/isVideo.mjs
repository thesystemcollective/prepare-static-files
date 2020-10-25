import { isVideo } from '../../src/lib.mjs'

const matches = ['mp4', 'webm']

const fails = ['m4a', 'mp3', 'exe', 'dll']

export default {
  matches: matches.map(f => ({ fn: isVideo(`file.${f}`), info: `file.${f} is a video` })),
  nonMatches: fails.map(f => ({
    fn: isVideo(`file.${f}`),
    expect: false,
    info: `file.${f} is not a video`,
  })),
}
