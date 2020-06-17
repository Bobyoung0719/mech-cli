const chalk = require('chalk');
const {userInputPass} = require('./inquirer');

// 创建远程仓库
module.exports = {
  createRemoteWareHouse: async gitHub => {
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
    const params = {
      name: projectName,
      description: projectDescription,
      private: projectAuthority === 'private',
    };
  
    const {data = {}} = await gitHub.repos.createForAuthenticatedUser(params);
    
    return {
      projectName,
      projectAuthor,
      projectScaffold,
      cloneUrl: data.clone_url
    }
  }
}
