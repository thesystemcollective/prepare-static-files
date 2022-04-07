import { compressibles } from '@magic/mime-types'

export const getExtension = file => {
  const fileNameArray = file.split('.')
  const ext = fileNameArray[fileNameArray.length - 1]

  return ext
}

export const isGltf = file => file.endsWith('.gltf')

export const isImage = file => ['.png', '.jpg', '.jpeg', '.webp'].some(ext => file.endsWith(ext))

export const isVideo = file => ['.mp4', '.webm'].some(t => file.endsWith(t))

export const isAudio = file => ['.mp3', '.m4a', '.ogg', '.mp4'].some(t => file.endsWith(t))

export const isLossLess = file => ['.flac', '.wav', '.alac'].some(t => file.endsWith(t))

export const isVideoSource = file => ['.mov', '.m4v'].some(t => file.endsWith(t))

export const isZip = file => file.endsWith('.gz')

export const isCompressible = file => compressibles[getExtension(file)]

export const isPly = file => file.endsWith('.ply')
