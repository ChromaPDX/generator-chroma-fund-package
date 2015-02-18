'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('ChromaFundPackage') + ' generator!'
    ));

    var prompts = [{
      name: 'name',
      message: 'Name?'
    },{
        name: 'blurb',
        message: 'Burb?'
    },{
        name: 'threshold',
        message: 'Threshold?'
    },{
        name: 'url',
        message: 'Url?'
    }];

    this.prompt(prompts, function (props) {

        this.name = props.name;
        this.blurb = props.blurb;
        this.threshold = props.threshold;
        this.url = props.url;

        done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copyTpl(
        this.templatePath('<%=name%>/_package.js'),
        this.destinationPath(this.name + '/package.js'),
        this
      );
      this.fs.copyTpl(
        this.templatePath('<%=name%>/_<%=name%>.js'),
        this.destinationPath(this.name + "/" + this.name + ".js"),
        this
      );
      this.fs.copyTpl(
        this.templatePath('<%=name%>/_<%=name%>-tests.js'),
        this.destinationPath(this.name + "/" + this.name + "-tests.js"),
        this
      );
      this.fs.copy(
        this.templatePath('README.md'),
        this.destinationPath(this.name + "/README.md")
      );
    }

  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
