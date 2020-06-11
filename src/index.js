const CLUI = require('clui');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const {scaffoldPool} = require('../lib/params');
const {directoryExists} = require('../lib/files');
const {gitCloneStart} = require('../lib/clone');
const {askGithubCredentials} = require('../lib/inquirer');

const spin = (t1, t2 = '') => new CLUI.Spinner(t1, t2);

clear();

// 先来画一个牛逼的Mech
console.log(
  chalk.yellow(
    figlet.textSync('MECH CLI', {horizontalLayout: 'full'})
  )
);

// 开始生成
console.log(chalk.yellow('<----- Let`s start a new project ----->'));

// 用户交互式命令
const run = async () => {
  try {
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

    const repoPath = scaffoldPool[projectScaffold];
    spin('git clone start, please waitting', ['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷']).start();
    await gitCloneStart(repoPath, projectName);
    spin('git clone finished').stop();
  } catch (error) {
    console.log(error)
  }

} 

run();