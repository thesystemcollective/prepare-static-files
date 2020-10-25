import { isImage } from '../../src/lib.mjs'

const matches = ['png', 'jpg', 'jpeg', 'webp']

const fails = ['m4a', 'mp3', 'exe', 'dll']

export default {
  matches: matches.map(f => ({ fn: isImage(`file.${f}`), info: `file.${f} is an image` })),
  nonMatches: fails.map(f => ({
    fn: isImage(`file.${f}`),
    expect: false,
    info: `file.${f} is an image`,
  })),
}
