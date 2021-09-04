import crypto from 'crypto'
import path from 'path'

import fs from '@magic/fs'

export const etags = async dirs =>
  await Promise.all(
    dirs.map(async dir => {
      const outFile = path.join(dir, 'etags.csv')
      const lines = []

      const files = await fs.getFiles(dir)

      await Promise.all(
        files.map(async file => {
          const content = await fs.readFile(file)
          const fileWithoutDir = file.replace(`${dir}/`, '')
          const etag = await crypto.createHash('sha1').update(content).digest('base64')

          // do not etag the etags.csv file and ignore gzipped files
          if (file !== outFile && !file.endsWith('.gz')) {
            lines.push(`${fileWithoutDir},${etag}`)
          }
        }),
      )

      const csv = lines.join('\n')
      await fs.writeFile(outFile, csv)
    }),
  )
