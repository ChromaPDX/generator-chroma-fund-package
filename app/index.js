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
        name: 'url',
        message: 'Url'
    },{
        name: 'offering_price',
        message: 'Offering Price'
    },{
        name: 'percentage_offered',
        message: 'Percentage offered'
    },
    {
        name: 'threshold',
        message: 'Threshold'
    },
    {
        name: 'return_cap',
        message: 'Return CAP'
    },{
      name: 'admin_email',
      message: 'Admin email'
    }];

    this.prompt(prompts, function (props) {

        this.name = props.name;
        this.url = props.url;
        this.offering_price = props.offering_price;
        this.percentage_offered = props.percentage_offered;
        this.threshold = props.threshold;
        this.return_cap = props.return_cap;
        this.admin_email = props.admin_email;

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
