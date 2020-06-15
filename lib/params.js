const CLI = require('clui');
const Spinner = CLI.Spinner;

const scaffoldPool = {
  'react-mp-demo': 'https://github.com/Bobyoung0719/react-mp-demo.git',
  'react-sp-demo': 'https://github.com/Bobyoung0719/react-sp-demo.git',
  'vue-sp-demo': 'https://github.com/Bobyoung0719/vue-sp-demo.git',
  'rollup-demo': 'https://github.com/Bobyoung0719/rollup-demo.git'
};

module.exports = {
  Spinner,
  scaffoldPool
}