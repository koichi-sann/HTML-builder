const path = require('path')
const fsProm = require('fs/promises')

const folderPath = path.join(__dirname, 'files')
const folderPathCopy = path.join(__dirname, 'files-copy')

const isFolderExist = async (fold) => {
  const res = await fsProm
    .access(fold)
    .then(() => true)
    .catch(() => false)
  return res
}

const createCopy = async (fold) => {
  if (await isFolderExist(folderPathCopy)) {
    await fsProm.rm(folderPathCopy, { recursive: true })
  }
  await fsProm.mkdir(folderPathCopy)
  fold.forEach(async (f) => {
    await fsProm
      .copyFile(path.join(folderPath, f), path.join(folderPathCopy, f))
      .then(console.log(f))
  })
  return fold.length
}

fsProm
  .readdir(folderPath)
  .then((fold) => createCopy(fold))
  .then((count) => console.log(`${count} file(s) copied!`))
