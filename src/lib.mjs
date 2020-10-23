export const isImage = file =>
  file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.webp') || file.endsWith('.ico')

export const isVideo = file => file.endsWith('.mp4') || file.endsWith('.webm')
export const isAudio = file =>
  file.endsWith('.mp3') || file.endsWith('.m4a') || file.endsWith('.ogg')
export const isLossLess = file =>
  file.endsWith('.flac') || file.endsWith('.wav') || file.endsWith('.alac')

export const isZip = file => file.endsWith('.gz')

export const isCompressible = file =>
  !isImage(file) && !isVideo(file) && !isAudio(file) && !isLossLess(file) && !isZip(file)
