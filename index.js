const init = require('./lib/init')
const generate = require('./lib/generate')

module.exports = () => {
  switch (argv._[0]) {
    case 'init':
      return init()
    case 'generate':
    case 'g':
      return generate()
    default:
      return log.warn('Bad options:', argv._)
  }
}
