'use strict';

const BroccoliMergeTrees = require('broccoli-merge-trees');
const StaticSiteJson = require('broccoli-static-site-json');

const usersTree = new StaticSiteJson(`data/user`, {
  type: 'user',
  contentFolder: `data/users`,
  attributes: ['email', 'firstname', 'lastname', 'avatar'],
  contentTypes: [],
  collate: true,
});

module.exports = {
  name: require('./package').name,

  isDevelopingAddon() {
    return true;
  },

  treeForPublic() {
    return new BroccoliMergeTrees([usersTree]);
  },
};
