const path = require('path')
const fs = require('fs')

const stream = fs.createReadStream(__dirname + '/text.txt')

stream.on('data', (s) => console.log(s.toString()))
stream.on('error', (e) => console.log(e.message))
