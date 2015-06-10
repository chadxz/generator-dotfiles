# generator-dotfiles

A yeoman generator for common dotfiles, npm scripts and packages that I use in every node.js project.

## install

- `git clone` this repo
- `npm install`
- `npm link` to install this generator globally
- `npm install -g yo` if you haven't already

From there, you can just run `yo dotfiles` in your project folder and it will dump the dotfiles in your directory,
setup the linting package.json scripts, and install jshint + jscs.

## to-do

 - add option for es6 and eslint config
 - add option for tests, to create test dir and mocha.opts file
 - add option for bower, to create .bowerrc and bower.json
