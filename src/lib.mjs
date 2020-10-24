import { compressibles } from '@magic/mime-types'

exportconst getExtension = file => {
  const fileNameArray = file.split('.')
  const ext = fileNameArray[fileNameArray.length - 1]

  return ext
}

export const isImage = file => ['.png', '.jpg', '.jpeg', '.webp'].some(ext => file.endsWith(ext))

export const isVideo = file => ['.mp4', '.webm'].some(t => file.endsWith(t))

export const isAudio = file => ['.mp3', '.m4a', 'ogg'].some(t => file.endsWith(t))

export const isLossLess = file => ['.flac', '.wav', '.alac'].some(t => file.endsWith(t))

export const isZip = file => file.endsWith('.gz')

export const isCompressible = file => compressibles[getExtension(file)]

