const path = require('path');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const {Octokit} = require('@octokit/rest');
const {scaffoldPool, Spinner} = require('../lib/params');

const {cloneRemoteWareHouse, cloneWareHouseTemp} = require('../lib/clone');

const {copyTempToProject} = require('../lib/files');

const {askUserPassPort} = require('../lib/inquirer');
const {getStoredGithubToken, getPersonalAccessToken} = require('../lib/github');
const {createRemoteWareHouse, initRemoteWareHouse} = require('../lib/warehouse');

const {exec, execSync} = require('child_process');
clear();

// 先来画一个牛逼的图案
console.log(chalk.yellow(figlet.textSync('MECH CLI', {horizontalLayout: 'full'})));

// 开始生成
console.log(chalk.yellow('<----- Let`s start a new project ----->'));

// 执行逻辑
async function run() {
  try {
    // 获取本地存储的token
    let storeToken = getStoredGithubToken();
    console.log('本地token:', storeToken);

    // 如本地未存储token，通过账户和密码获取token
    if(!storeToken) {
      // 获取账号及密码
      const {userName, passWord} = await askUserPassPort();
      storeToken = await getPersonalAccessToken(userName, passWord);

      console.log('newtoken:', storeToken);
    }

    // 创建octokit实例
    const gitHub = new Octokit({auth: storeToken});

    // 创建远程仓库
    const {
      sshUrl,
      cloneUrl,
      projectName,
      projectAuthor, 
      projectScaffold,
    } = await createRemoteWareHouse(gitHub);

    console.log(cloneUrl, projectAuthor, projectScaffold);

    // clone 远程仓库到本地（项目）
    await cloneRemoteWareHouse(cloneUrl, projectName);

    // 初始化仓库
    execSync('npm init -y', {cwd: pathStr(projectName)});

    console.log('init ok')
    
    // 克隆 仓库模板
    await cloneWareHouseTemp(scaffoldPool[projectScaffold]);

    // 拷贝模板到项目中仓库中
    copyTempToProject(projectScaffold, projectName, async () => {
      console.log('copy完成---------');
    
      exec(`git remote set-url origin ${sshUrl}`, null, () => {
        console.log('set Ok ')
      });

      // 删除模板
      exec(`rm -rf ${projectScaffold}`, null, () => {
        console.log('delete temp is Ok ')
      });
    });

  } catch (error) {
    // console.log(error)
  }
}

run();

function pathStr(name) {
  return path.resolve(process.cwd(), name);
}