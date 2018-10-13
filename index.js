const shell = require('shelljs');
const path = require('path');
const fs = require('fs');

function exec({ args, verbose }) {
  if (args == undefined || args.length <= 0) {
    console.error('Error: No executable specified.');
    return 1;
  }

  let pwd = process.cwd();

  do {
    let executable = path.resolve(pwd, `node_modules/.bin/${args[0]}`);

    if (fs.existsSync(executable)) {
      if (verbose) {
        console.log(`${executable} ${args.slice(1).join(' ')}`);
      }
      output = shell.exec(`${executable} ${args.slice(1).join(' ')}`);
      return output.code;
    }

    pwd = path.resolve(pwd, '../');
  } while (pwd != process.env.HOME);

  return 0;
}

module.exports = { exec };
