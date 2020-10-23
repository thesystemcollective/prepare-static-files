export const isImage = file =>
  file.endsWith('png') || file.endsWith('jpg') || file.endsWith('webp') || file.endsWith('ico')

export const isVideo = file => file.endsWith('mp4') || file.endsWith('webm')
export const isAudio = file => file.endsWith('mp3')

export const isCompressible = file =>
  !isImage(file) && !isVideo(file) && !isAudio(file) && !file.endsWith('.gz')
