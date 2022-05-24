process.stdout.write(
  'Проверьте далее ближе к четвергу или напишите мне в дискорд: 幸一 (Kōichi)#7522\n'
)
process.on('SIGINT', () => {
  console.log('Большое спасибо :)')
  process.exit()
})
