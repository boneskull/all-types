'use strict';

const REPO_URL = 'https://github.com/DefinitelyTyped/DefinitelyTyped.git';
const pullOrClone = require('git-pull-or-clone')
const globalModules = require('global-modules');
const lnfs = require('lnfs');
const {resolve} = require('path');

exports.update = (opts = {}) => {
  console.error(`Updating ${REPO_URL} at ${opts.dir}, please wait...`);
  pullOrClone(REPO_URL, opts.dir, err => {
    if (err) {
      throw err;
    }
    lnfs(resolve(opts.dir, 'types'), resolve(globalModules, '@types'), 'dir');
    console.error('Up-to-date.');
  });
};
