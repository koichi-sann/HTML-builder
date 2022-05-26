const fs = require('fs')
const path = require('path')

const folderProject = path.join(__dirname, 'project-dist')
const folderProjectAssets = path.join(__dirname, 'project-dist/assets')
const folderAssets = path.join(__dirname, 'assets')
const folderComponents = path.join(__dirname, 'components')
const folderStyles = path.join(__dirname, 'styles')

const createFolder = (path) => {
  console.log(path)
  fs.mkdir(path, { recursive: true }, (e) => {
    if (e) throw e
  })
}

const assets = async () => {
  createFolder(folderProject)
  createFolder(folderProjectAssets)

  fs.readdir(folderAssets, { withFileTypes: true }, (e, fls) => {
    if (e) throw e
    fls.forEach((f) => {
      if (f.isDirectory()) {
        fs.mkdir(
          `${folderProjectAssets}/${f.name}`,
          { recursive: true },
          (e) => {
            if (e) throw e
          }
        )
        fs.readdir(
          `${folderAssets}/${f.name}`,
          { withFileTypes: true },
          (e, fls) => {
            if (e) throw e
            fls.forEach((fl) => {
              fs.copyFile(
                `${folderAssets}/${f.name}/${fl.name}`,
                `${folderProjectAssets}/${f.name}/${fl.name}`,
                (e) => {
                  if (e) throw e
                }
              )
            })
          }
        )
      }
    })
  })
  process.stdout.write('Copied Successfully!' + '\n')
}

assets()

fs.writeFile(`${folderProject}/style.css`, '', (e) => {
  if (e) throw e
})

fs.readdir(folderStyles, { withFileTypes: true }, (e, fls) => {
  if (e) throw e
  fls.forEach((f) => {
    if (path.extname(f.name) == '.css') {
      fs.readFile(path.join(`${folderStyles}`, f.name), (e, s) => {
        if (e) throw e
        fs.appendFile(`${folderProject}/style.css`, s, (e) => {
          if (e) throw e
        })
      })
    }
  })
  process.stdout.write('Merged Successfully!' + '\n')
})

const build = () => {
  fs.copyFile(
    `${__dirname}/template.html`,
    `${folderProject}/index.html`,
    (e) => {
      if (e) throw e
      fs.readFile(`${folderProject}/index.html`, 'utf8', (e, s) => {
        if (e) throw e
        fs.readdir(`${folderComponents}`, { withFileTypes: true }, (e, fls) => {
          if (e) throw e
          fls.forEach((f) => {
            fs.readFile(`${folderComponents}/${f.name}`, 'utf8', (e, inn) => {
              if (e) return `${e}`
              s = s.replace(`{{${f.name.split('.')[0]}}}`, inn)
              fs.writeFile(`${folderProject}/index.html`, s, (e) => {
                if (e) throw e
              })
            })
          })
        })
      })
    }
  )
  process.stdout.write('Build Successfully!' + '\n')
}

build()
