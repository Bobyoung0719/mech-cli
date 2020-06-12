
const pkg = require('../package.json');
const {Spinner} = require('../lib/params');
const Configstore = require('configstore');
const {createBasicAuth} = require('@octokit/auth-basic');

const conf = new Configstore(pkg.name);
const spin = new Spinner('验证身份中，请等待...');

module.exports = {
  // 获取本地token
  getStoredGithubToken: () => { 
    return conf.get('githubToken');
  },

  // 通过个人账号信息获取token
  getPersonalAccessToken: async (userName, passWord) => {
    spin.start();

    const createAuth = createBasicAuth({
      username: userName, 
      password: passWord,
      async on2Fa() {
        // 启用双层验证, 暂不启用
        // return prompt('Two-factor authentication Code:');
      },
      token: {
        scopes: ['user', 'public_repo', 'repo', 'repo:status'],
        note: 'mech-cli, the command-line tool for initalizing Git repos',
      }
    });

    try {
       const {token} = await createAuth({type: 'token'});

      if (token) {
        conf.set('githubToken', token);
        return token;
      } else {
        throw new Error('获取GitHub token失败！！！')
      }
    }finally {
      spin.stop();
    }
  }
};

// username: 'Bobyoung0719@gmail.com',
// password: 'gl_Yangt12',
// token: '45fb00ef4e6e1604907756e5a0374a3fa897f299'