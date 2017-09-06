#!/usr/bin/env node
'use strict';

const meow = require('meow');
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');
const {update} = require('../lib');
const xdg = require('xdg-basedir');
const {resolve} = require('path');

const workingCopyDirpath = process.env.ALL_TYPES_DIR ||
  resolve(xdg.data, pkg.name, 'DefinitelyTyped');

updateNotifier({pkg})
  .notify();

const cli = meow(`
  Usage
    $ all-types [options]

  Options
    -d, --dir
      Path to DefinitelyTyped working copy dir
    --show-dir
      Print default working copy dir & exit
    -v, --version
      Print version & exit

  Examples
    $ all-types
      Updates (or installs) typings in default location
    $ all-types --dir /custom/path/to/DefinitelyTyped/
      Updates (or installs) typings in default location
`, {
  alias: {
    v: 'version',
    d: 'dir'
  },
  boolean: ['version', 'show-dir'],
  default: {
    dir: workingCopyDirpath
  }
});

if (cli.flags.showDir) {
  console.log(workingCopyDirpath);
  process.exit(0);
}

update(cli.flags);
