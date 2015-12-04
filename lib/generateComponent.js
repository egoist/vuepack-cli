const path = require('path')
const fs = require('fs')
const exists = require('path-exists')
const mkdirp = require('mkdirp')

mkdirp.sync(path.join(process.cwd(), 'src/components'))
mkdirp.sync(path.join(process.cwd(), 'src/css'))

module.exports = function () {
  const componentName = argv._[2]
  if (!componentName) {
    log.error(`You have to specific a ${'component name'.white.bold} first!`)
  } else {
    const cssPath = join('css', componentName)
    const componentPath = join('component', componentName)
    const cssPathExists = exists.sync(cssPath)
    const componentPathExists = exists.sync(componentPath)
    const force = argv.f || argv.force
    const forceText = force ? ' force' : ''
    if (!force && (cssPathExists || componentPathExists)) {
      if (cssPathExists) {
        log.error(`${'CSS file'.white.bold} of the ${'Component'.white.bold} exists, use ${'-f/--force'.white.bold} to force create!`)
      }
      if (componentPathExists) {
        log.error(`The ${'Component'.white.bold} exists, use ${'-f/--force'.white.bold} to force create!`)
      }
    } else {
      const componentFile = require('./files/component')(componentName)
      const cssFile = ''
      fs.writeFileSync(componentPath, componentFile, 'utf-8')
      fs.writeFileSync(cssPath, cssFile, 'utf-8')
      log.success(`Component ${componentName.white.bold} is${forceText} created!`)
    }
  }
}

function join(type, filename) {
  var typeDir = type
  var ext = '.css'
  if (type === 'component') {
    typeDir += 's'
    ext = '.vue'
  }
  return path.join(process.cwd(), `src/${typeDir}`, `${filename}${ext}`)
}
