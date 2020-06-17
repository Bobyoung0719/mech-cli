
const inquirer = require('inquirer');
const scaffoldPool = require('./params');
const {getCurrentDirectoryBase} = require('./files');
const argv = require('minimist')(process.argv.slice(2));

// 获取token
const tokenAsk = [
  {
    type: 'input',
    name: 'accessToken',
    message: 'Enter your github auth-token:',
    validate: value => {
      if (value.length) {
        return true;
      } else {
        return 'Please enter your github auth-token:';
      }
    }
  }
];

// 项目信息
const wareHouseInfo = [
  {
    type: 'list',
    name: 'projectScaffold',
    choices: Object.keys(scaffoldPool),
    message: 'choose one of the scaffold-tools that you wanted:',
  },
  {
    type: 'input',
    name: 'projectName',
    message: 'Enter your project name:',
    default: argv._[0] || getCurrentDirectoryBase(),
    validate: value => {
      if (value.length) {
        return true;
      } else {
        return 'Please enter your project name:';
      }
    }
  },
  {
    type: 'list',
    name: 'projectAuthority',
    choices: ['public', 'private'],
    default: 'public',
    message: 'Set your project authority:',
  },
  {
    type: 'String',
    name: 'projectDescription',
    default: argv._[1] || null,
    message: 'Enter your project description:',
  },
  {
    type: 'input',
    name: 'projectAuthor',
    default: 'Alex-young',
    message: 'Enter your project author:',
  },
  {
    type: 'confirm',
    name: 'isConfirm',
    message: 'Is this your choose?',
  }
];

module.exports = {
  getGithubToken: () => {
    return inquirer.prompt(tokenAsk);
  },

  userInputPass: () => {
    return inquirer.prompt(wareHouseInfo);
  }
}