# npex

[![Greenkeeper badge](https://badges.greenkeeper.io/engineforce/npex.svg)](https://greenkeeper.io/)

Find npm package executable in node_modules/.bin **recursively**, and execute the first occurrence found.

[![NPM version][1]][2]

## Descriptions

This is similar to [npx](https://www.npmjs.com/package/npx) with following differences:

1. npex tries to find executable in node_modules/.bin **recursively** until the first occurrence found (similar to the [Node.js module resolution mechanism](https://nodejs.org/api/modules.html#modules_loading_from_node_modules_folders)). E.g., `npex jest` will search following paths:

   - ~/my/git/engineforce/npex/node_modules/.bin/jest
   - ~/my/git/engineforce/node_modules/.bin/jest
   - ~/my/git/node_modules/.bin/jest
   - ~/my/node_modules/.bin/jest
   - ~/node_modules/.bin/jest
   - (globally installed jest)

2. npex will not install anything if the executable is not found.

This extremely useful for monorepo, where your executables are hoisted to the monorepo root, but you want to execute them from sub-repos' location.

## Install with npm

```sh
npm install -g npex
```

## Usages

```sh
npex [--verbose] <command> [<args>...]
```

## Examples

```sh
npex lerna ls
npex --verbose lerna ls

npex tsc
npex tsc --listFiles

npex jest
npex jest --help
```

[1]: https://badge.fury.io/js/npex.svg
[2]: https://badge.fury.io/js/npex
