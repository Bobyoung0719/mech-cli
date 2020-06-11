const CLUI = require('clui');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const {scaffoldPool} = require('../lib/params');
const {gitCloneStart} = require('../lib/clone');
const {editPackJson} = require('../lib/files');
const {askGithubCredentials} = require('../lib/inquirer');


const spin = (t1, t2 = '') => new CLUI.Spinner(t1, t2);

clear();

// 先来画一个牛逼的图案
console.log(chalk.yellow(figlet.textSync('MECH CLI', {horizontalLayout: 'full'})));

// 开始生成
console.log(chalk.yellow('<----- Let`s start a new project ----->'));

// 用户交互式命令
const run = async () => {
  try {
    // 获取用户输入信息
    const {
      isSureRes,
      projectName,
      projectAuthor, 
      projectScaffold, 
      projectDescription
    } = await askGithubCredentials();

    if (!isSureRes) {
      console.log(chalk.yellow(`<----- you have choose 'No' to end!!! ----->`));

      process.exit();
    }

    // 仓库地址
    const repoPath = scaffoldPool[projectScaffold];
    // spin('git clone start, please waitting', ['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷']).start();

    // 克隆仓库
    await gitCloneStart(repoPath, projectName);
    // spin('git clone finished').stop();

    // 重新编辑package.json 
    editPackJson(projectName, projectAuthor, projectDescription);

    // npm install
    

  } catch (error) {
    console.log(error)
  }
} 

run();