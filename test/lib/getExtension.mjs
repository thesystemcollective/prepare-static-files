import { getExtension } from '../../src/lib.mjs'

export default [
  { fn: getExtension('file.js'), expect: 'js', info: 'file with one dot can be split' },
  {
    fn: getExtension('file.with.dots.js'),
    expect: 'js',
    info: 'file with multiple dots can be split',
  },
  {
    fn: getExtension('file. w ith.dots.js'),
    expect: 'js',
    info: 'file with multiple dots and spaces can be split',
  },
]
