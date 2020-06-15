const chalk = require('chalk');
const git = require('simple-git/promise')();
const {Spinner} = require('./params');

const {userInputPass} = require('./inquirer');

// 创建远程仓库
module.exports = {
  createRemoteWareHouse: async gitHub => {
    const spin = new Spinner('创建远程仓库中...');

    const {
      isConfirm,
      projectName,
      projectAuthor,
      projectScaffold,
      projectAuthority,
      projectDescription
    } = await userInputPass();

    if(!isConfirm) {
      console.log(chalk.yellow(`<----- you have choose 'No' to end!!! ----->`));
      process.exit();
    }

    spin.start();
    const params = {
      name: projectName,
      description: projectDescription,
      private: projectAuthority === 'private',
    };
   
    try {
      const {data = {}} = await gitHub.repos.createForAuthenticatedUser(params);
      return {
        projectName,
        projectAuthor, 
        projectScaffold,
        sshUrl: data.ssh_url,
        cloneUrl: data.clone_url
      }
    } finally {
      spin.stop();
    }
  },

  initRemoteWareHouse: async url => {
    const spin = new Spinner('初始化远程仓库中...');
    spin.start();

    await git.init();
    await git.add('./*');
    await git.commit('Initial commit')
    await git.addRemote('origin', url);
    await git.push('origin', 'master');

    spin.stop();
    return true;
  } 
}
