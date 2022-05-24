const path = require('path')
const fs = require('fs')

const stream = fs.createWriteStream(__dirname + '/text.txt', 'utf8', {
  flags: 'a+',
})

process.stdout.write('Type text:\n')

process.stdin.on('data', (s) => {
  s = s.toString()
  if (s.trim() === 'exit') process.exit()
  stream.write(s)
})

process.on('exit', () => {
  process.stdout.write('Write Completed! Thanks! :)\n')
})

process.on('SIGINT', () => {
  process.exit()
})
