import path from 'path'

import is from '@magic/types'
import log from '@magic/log'

import fs from '@magic/fs'
import sharp from 'sharp'

import { isImage } from './lib.mjs'

export const optimize = async ({ files, silent, noWebp }) => {
  await Promise.all(
    files.map(async file => {
      if (isImage(file)) {
        const sharpen = sharp(file)

        if (is.undefined(noWebp)) {
          const extension = path.extname(file)
          const webpName = file.replace(extension, '.webp')
          const webpExists = await fs.exists(webpName)
          if (!webpExists) {
            if (!silent) {
              log.info('generate webp', webpName)
            }

            const sharpen = sharp(file)
            await sharpen.toFile(webpName)
          }
        }

        if (file.endsWith('jpg')) {
          const data = await sharpen.jpeg({
            trellisQuanttisation: true,
            quality: 80,
            optimizeCoding: true,
          })

          const buffer = await data.toBuffer()

          if (!silent) {
            log.info('overwrite', file)
          }

          await fs.writeFile(file, buffer)
        } else if (file.endsWith('png')) {
          const data = await sharpen.png()

          const buffer = await data.toBuffer()

          if (!silent) {
            log.info('overwrite', file)
          }

          await fs.writeFile(file, buffer)
        }
      }
    }),
  )
}
