import { isPly } from '../../src/lib.mjs'

const matches = ['ply']

const fails = ['exe', 'dll', 'mkv', 'json']

export default {
  matches: matches.map(f => ({ fn: isPly(`file.${f}`), info: `file.${f} is a ply file` })),
  nonMatches: fails.map(f => ({
    fn: isPly(`file.${f}`),
    expect: false,
    info: `file.${f} is not a ply file`,
  })),
}
