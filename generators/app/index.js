'use strict';
var gitConfig = require('git-config');
var generators = require('yeoman-generator');
var _ = require('lodash');
var userName;

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },
  _gitConfigUserName: function () {
    var config = gitConfig.sync();
    return _.get(config, 'user.name');
  },
  prompting: function () {
    var done = this.async();
    this.prompt({
      type    : 'input',
      name    : 'name',
      message : 'Your name (for license)',
      default : this._gitConfigUserName(),
    }, function (answers) {
      userName = answers.name;
      done();
    });
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

    this.fs.copyTpl(
      this.templatePath('LICENSE'),
      this.destinationPath('LICENSE'),
      {
        year: (new Date()).getFullYear(),
        name: userName
      }
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
