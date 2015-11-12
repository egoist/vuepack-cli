const elegantSpinner = require('elegant-spinner')
const logUpdate = require('log-update')
const frame = elegantSpinner()
const path = require('path')
const fetch = require('node-fetch')
const Download = require('download')
const pathExists = require('path-exists')
const home = require('user-home')
const mkdir = require('mkdirp')
require('shelljs/global')

function spin (text) {
  const frames = ['-', '\\', '|', '/']
  var i = 0
  setInterval(() => {
    const frame = frames[i = ++i % frames.length];

      logUpdate(
  `
          ♥♥
     ${frame} ${text} ${frame}
          ♥♥
  `
      );
  }, 80)
}

module.exports = (argv) => {
  const name = argv._[1]
  if (!name) {
    return log.error('You have to specific the name of your new Vue project!')
  }
  spin('Processing')
  fetch('https://raw.githubusercontent.com/egoist/vuepack/master/package.json')
    .then(data => data.json())
    .then(data => {
      const appFolder = `${home}/.vuepack/vuepack-${data.version}`
      const vueHome = `${home}/.vuepack`
      const destFolder = process.cwd() + '/' + name
      mkdir.sync(vueHome)
      if (!pathExists.sync(appFolder)) {
        new Download({mode: '755', extract: true})
        .get(`https://codeload.github.com/egoist/vuepack/zip/${data.version}`)
        .dest(vueHome)
        .run((err, files) => {
          logUpdate.clear()
          logUpdate.done()
          if (err) {
            return log.error(err)
          }
          copyApp()
        })
      } else {

        logUpdate.clear()
        logUpdate.done()
        copyApp()
      }

      function copyApp () {
        const exists = pathExists.sync(destFolder)
        if (exists && !argv.f && !argv.force) {
          log.error(`Folder ${name} exists, use -f/--force to override it`)
          process.exit()
        }
        if (exists) {
          exec('rm -rf ' + destFolder)
        }
        cp('-R', appFolder, process.cwd())
        mv(`vuepack-${data.version}`, name)
        cd(name)
        log.info('NPM installing...')
        exec('npm install --verbose')
        log.success('Cheers! Let the hacking begin!')
        process.exit()
      }
    })
}
