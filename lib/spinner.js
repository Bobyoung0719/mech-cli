const CLI = require('clui');
const Spinner = CLI.Spinner;

const text = [
  'github身份验证中...',
  '远程仓库创建中...',
  '项目创建中...',
  '项目创建成功！！！'
];

let spinFun = {}, fun = 'spin';

text.forEach((v, i) => {
  spinFun[`${fun}${i + 1}`] = new Spinner(v);
});

module.exports = spinFun;