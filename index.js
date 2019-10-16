const path = require('path')
const fs = require('fs')
const execSh = require('exec-sh').promise

async function exec({ args, verbose }) {
  if (args == undefined || args.length <= 0) {
    console.error('Error: No executable specified.')
    return 1
  }

  let pwd = process.cwd()

  while (true) {
    let executable = path.resolve(pwd, `node_modules/.bin/${args[0]}`)

    if (verbose) {
      console.log(`Search in ${executable}`)
    }

    if (fs.existsSync(executable)) {
      if (verbose) {
        console.log(`${executable} ${args.slice(1).join(' ')}`)
      }

      return await execSh(`${executable} ${args.slice(1).join(' ')}`)
    }

    if (
      pwd == undefined ||
      pwd == process.env.HOME ||
      pwd.toLowerCase().indexOf(process.env.HOME.toLowerCase()) != 0
    ) {
      if (verbose) {
        console.log(`(global) ${args.join(' ')}`)
      }

      return await execSh(`${args.join(' ')} 2>&1`)
    }

    pwd = path.resolve(pwd, '../')
  }
}

module.exports = { exec }
