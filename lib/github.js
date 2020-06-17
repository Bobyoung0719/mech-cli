
const pkg = require('../package.json');
const {Spinner} = require('../lib/params');
const Configstore = require('configstore');
const {Octokit} = require('@octokit/rest');
const request = require('@octokit/request');
const {createAppAuth} = require('@octokit/auth-app');

const conf = new Configstore(pkg.name);
const spin = new Spinner('验证身份中，请等待...');

module.exports = {
  // 获取本地token
  getStoredGithubToken: () => { 
    return conf.get('githubToken');
  },

  // 通过令牌获取权限
  getPersonalAccessToken: async (userName, passWord) => {
    spin.start();

    try {

      const auth = createAppAuth({
        id: 1,
        privateKey: "-----BEGIN PRIVATE KEY-----\n...",
        installationId: 123,
        clientId: "1234567890abcdef1234",
        clientSecret: "1234567890abcdef12341234567890abcdef1234",
      });
      const appAuthentication = await auth({ type: "app" });

      console.log('appAuthentication', appAuthentication);

      
      // const appOctokit = new Octokit({
      //   authStrategy: createAppAuth,
      //   auth: {
      //     id: 123,
      //     privateKey: process.env.PRIVATE_KEY
      //   }
      // });

      // const { data } = await appOctokit.request("/app");

      // const { token } = await appOctokit.auth({
      //   type: "installation",
      //   installationId: 123,
      // });


      // console.log(token, '======');


      // const auth = createAppAuth({
      //   clientId: userName, 
      //   clientSecret: passWord
      // });

      // console.log(auth, '11111111');

      // const res = await auth.hook(request, 'GET /user');

      // console.log(res, '2222222');

      // if (res.token) {
      //   conf.set('githubToken', res.token);
      //   return res.token;
      // } else {
      //   throw new Error('获取GitHub token失败！！！')
      // }
    } catch(err) {
      console.log(err, 'rrrrrrrrrrrrr');
    } finally {
      spin.stop();
    }
  }
};

// username: 'Bobyoung0719@gmail.com',
// password: 'gl_Yangt12',
// token: '45fb00ef4e6e1604907756e5a0374a3fa897f299'

/**
 * npm
 * email: Bobyoung0719@gmail.com
 * username: alex_yang
 * mima: y0815taoJokeer
 */