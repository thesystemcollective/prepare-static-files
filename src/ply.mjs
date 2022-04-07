import path from 'path'

import fs from '@magic/fs'

export const ply = async ({ file }) => {
  const contents = await fs.readFile(file, 'utf8')

  const [head, rest] = contents.split('end_header\n')

  const lines = rest
    .split('\n')
    .map(line => {
      const r = line.split(' ').map(r => {
        if (!r) {
          return
        }

        return parseFloat(r).toFixed(3) / 1.0
      })

      return r.join(' ')
    })
    .filter(a => a)

  const finalContent = [head, lines.join('\n')].join('end_header\n')

  await fs.writeFile(file, finalContent)
}
