# npex

Find npm package executables in node_modules/.bin **recursively** (similar to the [Node.js module resolution mechanism](https://nodejs.org/api/modules.html#modules_loading_from_node_modules_folders)), and execute them.

## Descriptions

This is similar to [npx](https://www.npmjs.com/package/npx), but it tries to find executables in node_modules/.bin **recursively** and it will not install anything if executables are found.

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

npex tsc --listFiles

npex jest
npex jest --help
```
