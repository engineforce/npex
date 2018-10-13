#!/usr/bin/env node
var npex = require('../index.js');

function main() {
  // Delete the 0 and 1 argument (node and script.js)
  var args = process.argv.splice(process.execArgv.length + 2);
  let verbose = undefined;

  if (args[0] == '--help') {
    showHelp();
    process.exit(0);
  }

  if (args[0] == '--verbose') {
    verbose = true;
    args = args.slice(1);
  }

  if (args.length <= 0) {
    console.log('Error: no command given.');
    showHelp();
    process.exit(1);
  }

  process.exit(npex.exec({ args, verbose }));
}

function showHelp() {
  console.log('Usage: npex [--verbose] <command> [<args>...]');
}

main();
