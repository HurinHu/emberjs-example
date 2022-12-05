'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    babel: {
      plugins: [require.resolve('ember-auto-import/babel-plugin')],
    },

    fingerprint: {
      // don't fingerprint images because we need to be able to access them dynamically
      // see more info here: https://github.com/ef4/prember/issues/52
      extensions: ['js', 'css', 'map'],
      generateAssetMap: true,
      fingerprintAssetMap: true,
    },

    ifa: {
      enabled: true,
      inline: true,
    },

    minifyCSS: {
      options: { processImport: true },
    },

    prember: {
      urls: ['', 'home', 'about', 'entities'],
    },

    'ember-bootstrap': {
      bootstrapVersion: 5,
      importBootstrapCSS: true,
    },
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
