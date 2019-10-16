#!/usr/bin/env node
var npex = require('../index.js')

async function main() {
  // Delete the 0 and 1 argument (node and script.js)
  var args = process.argv.splice(process.execArgv.length + 2)
  let verbose = undefined

  if (args[0] == '--help') {
    return showHelp()
  }

  if (args[0] == '--verbose') {
    verbose = true
    args = args.slice(1)
  }

  if (args.length <= 0) {
    const error = new Error('Error: no command given.')
    console.error(error.message)
    showHelp()
    throw error
  }

  await npex.exec({ args, verbose })
}

function showHelp() {
  console.log('Usage: npex [--verbose] <command> [<args>...]')
}

main().then(
  () => {},
  (error) => {
    process.exit(error.code || 1)
  }
)
