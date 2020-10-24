import { isZip } from '../../src/lib.mjs'

const matches = [
  'gz',
]

const fails = [
  'm4a',
  'mp3',
  'exe',
  'dll',
]

export default {
  matches: matches.map(f => ({ fn: isZip(`file.${f}`), info: `file.${f} is a gzip file` })),
  nonMatches: fails.map(f => ({ fn: isZip(`file.${f}`), expect: false, info: `file.${f} is not a gzip file` }))
}