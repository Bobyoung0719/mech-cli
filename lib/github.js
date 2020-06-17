
const pkg = require('../package.json');
const Configstore = require('configstore');
const {createTokenAuth} = require('@octokit/auth-token');

const conf = new Configstore(pkg.name);

module.exports = {
  // 获取本地token
  getStoredGithubToken: () => { 
    return conf.get('githubToken');
  },

  // 令牌验证token
  authenticityAccessToken: async (accessToken) => {
    const {token} = await createTokenAuth(accessToken)();

    if (token) {
      conf.set('githubToken', token);
      return token;
    } else {
      throw new Error('校验accessToken失败！！！')
    }
  }
};

// auth-token: e17387e7bd7aa592d1b28078b16389beaf8bfe39

/**
 * npm
 * email: Bobyoung0719@gmail.com
 * username: alex_yang
 * mima: y0815taoJokeer
 */