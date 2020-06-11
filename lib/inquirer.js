const inquirer = require('inquirer');
const {scaffoldPool} = require('./params');

const questions = [
  {
    type: 'list',
    name: 'projectScaffold',
    choices: Object.keys(scaffoldPool),
    message: 'choose one of the scaffold-tools that you wanted:',
  },
  {
    type: 'String',
    name: 'projectName',
    message: 'Enter your project Name:',
    validate: value => {
      if (value.length) {
        return true;
      } else {
        return 'Please enter your project name:';
      }
    }
  },
  {
    type: 'String',
    name: 'projectDescription',
    message: 'Enter your project description:',
  },
  {
    type: 'String',
    name: 'projectAuthor',
    message: 'Enter your project author:',
  },
  {
    type: 'confirm',
    name: 'isSureRes',
    message: 'Is this your choose?',
  }
];

module.exports = {
  askGithubCredentials: () => {
    return inquirer.prompt(questions);
  }
}