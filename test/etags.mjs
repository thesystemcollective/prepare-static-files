import path from 'path'

import { is, tryCatch } from '@magic/test'

import { etags } from '../src/etags.mjs'

const expectedEtags = 'fileOne.txt,xPk3X5g0tOfwpSjMZcBVcCv18ko=\nfileThree.txt,GB891E5L+2oHD+4RrXgLAD8DYNs=\nfileTwo.txt,HFsMPu38JTn85SXybU+Ek1y3fTw='

export default [
  { fn: () => etags, expect: is.fn, info: 'etags exports a function' },
  { fn: tryCatch(etags), expect: is.error, info: 'etags errors if called without arguments' },
  {
    fn: async () => {
      const result = await etags(path.join(process.cwd(), 'test', '.etags'))
      return result.join('\n')
    }, expect: expectedEtags, info: 'etags correctly writes etags file'
  },
]
