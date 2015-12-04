const generateComponent = require('./generateComponent')

module.exports = function () {
  const type = argv._[1]
  switch (type) {
    case 'component':
      return generateComponent()
    default:
      return
  }
}
