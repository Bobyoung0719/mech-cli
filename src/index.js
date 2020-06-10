const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

// 文件处理
const files = require('../lib/files');

clear();

// 先来画一个牛逼的
console.log(
  chalk.yellow(
    figlet.textSync('MECH', {horizontalLayout: 'full'})
  )
);
