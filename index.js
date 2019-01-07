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
    //   console.log(`Search in ${executable}`);
    // }

    if (fs.existsSync(executable)) {
      if (verbose) {
        console.log(`${executable} ${args.slice(1).join(' ')}`);
      }
      output = shell.exec(`${executable} ${args.slice(1).join(' ')}`);
      return output.code;
    }

    if (
      pwd == undefined ||
      pwd == process.env.HOME ||
      pwd.toLowerCase().indexOf(process.env.HOME.toLowerCase()) != 0
    ) {
      if (verbose) {
        console.log(`(global) ${args.join(' ')}`);
      }
      output = shell.exec(`${args.join(' ')} 2>&1`);
      return output.code;
    }

    pwd = path.resolve(pwd, '../');
  }

  return 0;
}

module.exports = { exec };
