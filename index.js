const init = require('./lib/init')

module.exports = (argv) => {
  switch (argv._[0]) {
    case 'init':
      init(argv)
      break
    default:
      return
  }
}