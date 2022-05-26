const path = require('path')
const fs = require('fs')

const folderStyles = path.join(__dirname, 'styles')
const folderBundle = path.join(__dirname, 'project-dist', 'bundle.css')

const stream = fs.createWriteStream(folderBundle)

fs.readdir(folderStyles, { withFileTypes: true }, (e, fls) => {
  if (e) return `${e}`

  fls.forEach((f) => {
    if (f.isFile() && path.extname(f.name) === '.css') {
      let style = ''

      const pathS = path.join(folderStyles, f.name)
      const rStream = fs.createReadStream(pathS, 'utf8')

      rStream.on('data', (data) => (style += data))
      rStream.on('end', () => stream.write(`${style}\n`))
      rStream.on('error', (e) => console.log(e))
    }
  })
})
