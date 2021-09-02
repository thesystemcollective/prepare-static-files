import crypto from 'crypto'
import path from 'path'

import fs from '@magic/fs'

export const etags = async dirs => {
  await Promise.all(
    dirs.map(async dir => {
      const lines = []

      const files = await fs.getFiles(dir)

      await Promise.all(
        files.map(async file => {
          const content = await fs.readFile(file)
          const outFile = file.replace(`${dir}/`, '')
          const etag = await crypto.createHash('sha1').update(content).digest('base64')

          lines.push(`${outFile},${etag}`)
        }),
      )

      const csv = lines.join('\n')
      await fs.writeFile(path.join(dir, 'etags.csv'), csv)
    }),
  )
}
