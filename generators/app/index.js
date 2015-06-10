'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },
  configuring: function () {
    this.fs.copy(
      this.templatePath('.editorconfig'),
      this.destinationPath('.editorconfig')
    );

    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copy(
      this.templatePath('es5/.jscsrc'),
      this.destinationPath('.jscsrc')
    );

    this.fs.copy(
      this.templatePath('es5/.jshintrc'),
      this.destinationPath('.jshintrc')
    );

    this.fs.copy(
      this.templatePath('es5/.jshintignore'),
      this.destinationPath('.jshintignore')
    );

    // set npm run scripts
    var packageJSONPath = this.destinationPath('package.json');
    var packageJSON = this.fs.readJSON(packageJSONPath);
    packageJSON.scripts = packageJSON.scripts || {};
    packageJSON.scripts.lint = "npm run jscs && npm run jshint";
    packageJSON.scripts.jshint = "jshint .";
    packageJSON.scripts.jscs = "jscs .";
    packageJSON.scripts.start = "node index.js";
    this.fs.writeJSON(packageJSONPath, packageJSON);
  },
  install: function () {
    this.npmInstall(['jshint', 'jscs'], { saveDev: true });
  }
});
