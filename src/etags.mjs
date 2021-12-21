import crypto from 'crypto'
import path from 'path'

import is from '@magic/types'
import fs from '@magic/fs'

export const etags = async dirs => {
  if (is.string(dirs)) {
    dirs = [ dirs ]
  }

  dirs = dirs.sort((a, b) => a - b)

  return await Promise.all(
    dirs.map(async dir => {
      const outFile = path.join(dir, 'etags.csv')

      const files = await fs.getFiles(dir)

      const sorted = files.sort()

      const lines = await Promise.all(
        sorted.map(async file => {
          const content = await fs.readFile(file)
          const fileWithoutDir = file.replace(`${dir}/`, '')
          const etag = await crypto.createHash('sha1').update(content).digest('base64')

          // do not etag the etags.csv file and ignore gzipped files
          if (file !== outFile && !file.endsWith('.gz')) {
            return `${fileWithoutDir},${etag}`
          }
        }),
      )

      const csv = lines.filter(a => a).join('\n')
      await fs.writeFile(outFile, csv)

      return csv
    }),
  )
}