const path = require('path')
const fs = require('fs')
const fsProm = require('fs/promises')
const folderPath = path.join(__dirname, 'secret-folder')

fsProm
  .readdir(folderPath, { withFileTypes: true })
  .then((s) => {
    s.forEach((st) => {
      if (st.isFile()) {
        fsProm
          .stat(path.join(folderPath, st.name))
          .then((f) => {
            const data = st.name.split('.')
            data.push(`${f.size / 1000}kb`)
            console.log(data.join(' - '))
          })
          .catch((e) => console.log(e))
      }
    })
  })
  .catch((e) => console.log(e))
