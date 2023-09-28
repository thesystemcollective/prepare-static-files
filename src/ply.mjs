import plyo from 'plyo'

export const ply = async ({ file }) => {
  await plyo({
    input: [file],
    overwrite: true,
    removeNormals: true,
    precision: 3,
  })
}
