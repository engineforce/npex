const shell = require('shelljs');
const path = require('path');
const fs = require('fs');

function exec({ args, verbose }) {
  if (args == undefined || args.length <= 0) {
    console.error('Error: No executable specified.');
    return 1;
  }

  let pwd = process.cwd();

  while (true) {
    let executable = path.resolve(pwd, `node_modules/.bin/${args[0]}`);

    // if (verbose) {
    //   console.log(`${executable} ${args.slice(1).join(' ')}`);
    // }
    if (fs.existsSync(executable)) {
      if (verbose) {
        console.log(`${executable} ${args.slice(1).join(' ')}`);
      }
      output = shell.exec(`${executable} ${args.slice(1).join(' ')}`);
      return output.code;
    }

    if (pwd == process.env.HOME) {
      output = shell.exec(`${args.join(' ')}`);
      return output.code;
    }

    pwd = path.resolve(pwd, '../');
  }

  return 0;
}

module.exports = { exec };
