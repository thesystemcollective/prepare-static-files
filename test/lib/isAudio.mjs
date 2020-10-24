import { isAudio } from '../../src/lib.mjs'

const matches = [
  'mp3',
  'm4a',
  'ogg',
]

const fails = [
  'exe',
  'dll',
  'mkv',
  'json',
]

export default {
  matches: matches.map(f => ({ fn: isAudio(`file.${f}`), info: `file.${f} is an audio file` })),
  nonMatches: fails.map(f => ({ fn: isAudio(`file.${f}`), expect: false, info: `file.${f} is not an audio file` }))
}
