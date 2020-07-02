#!/usr/bin/env node
const path = require('path');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const {Octokit} = require('@octokit/rest');
const {execSync} = require('child_process');

const scaffoldPool= require('../lib/params');
const {copyTempToProject} = require('../lib/files');
const {getGithubToken} = require('../lib/inquirer');
const {createRemoteWareHouse} = require('../lib/warehouse');
const {cloneRemoteWareHouse, cloneWareHouseTemp} = require('../lib/clone');
const {getStoredGithubToken, authenticityAccessToken} = require('../lib/github');

const {spin1, spin2, spin3, spin4} = require('../lib/spinner');

clear();      
// 先来画一个**的图案
console.log(chalk.yellow(figlet.textSync('MECH CLI', {horizontalLayout: 'full'})));

// 开始生成
console.log(chalk.yellow('<----- Let`s start a new project ----->'));

// 执行逻辑
async function run() {
  try {
    spin1.start();
    // 获取本地存储的token
    let storeToken = getStoredGithubToken();

    // 如本地未存储token，通过账户和密码获取token
    if(!storeToken) {
      // 获取账号及密码
      const {accessToken} = await getGithubToken();
      storeToken = await authenticityAccessToken(accessToken);
    }

    // 创建octokit实例
    const gitHub = new Octokit({auth: storeToken});
    spin1.stop();

    // 创建远程仓库
    const {cloneUrl, projectName, projectScaffold, projectAuthor} = await createRemoteWareHouse(gitHub);
    
    spin2.start();
    // 拉去远程仓库到本地（项目）
    await cloneRemoteWareHouse(cloneUrl, projectName);
    spin2.stop();

    spin3.start();
    // 初始化仓库
    execSync('npm init -y', {cwd: pathStr(projectName)});

    // 克隆仓库模板
    await cloneWareHouseTemp(scaffoldPool[projectScaffold]);

    // 拷贝模板到项目中仓库中
    copyTempToProject(projectScaffold, projectName, projectAuthor, () => {
      // execSync(`git remote set-url origin ${cloneUrl}`, {cwd: pathStr(projectName)});
      spin3.stop();
      // 删除模板
      spin4.start();

      setTimeout(() => {
        execSync(`rm -rf ${projectScaffold}`);
      }, 1000);
      
      // execSync('npm install', {cwd: pathStr(projectName)});
      spin4.stop();
      process.exit();

    });
  } catch (error) {
    console.log(error)
  }
}

run();

function pathStr(name) {
  return path.resolve(process.cwd(), name);
}
