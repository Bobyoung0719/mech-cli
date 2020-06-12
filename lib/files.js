const fs = require('fs');
const path = require('path');

const srcPath = path.resolve(process.cwd(), 'T1');
const tarPath = path.resolve(process.cwd(), 'T2')

module.exports = {
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },

  directoryExists: filePath => {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      console.log(err)
      return false;
    }
  },

  copyTempToProject: cb => {
    // const rs = fs.createReadStream(srcPath);

    // rs.on('error', function(err) {
    //   if (err) {
    //     console.log('read error', srcPath);
    //   }
    //   cb && cb(err);
    // });
  
    // const ws = fs.createWriteStream(tarPath);

    // ws.on('error', function(err) {
    //   if (err) {
    //     console.log('write error', tarPath);
    //   }
    //   cb && cb(err);
    // })

    // ws.on('close', function(ex) {
    //   cb && cb(ex);
    // });
  
    // rs.pipe(ws);

  },

  editPackJson: (name, author, des) => {
    const jsonPath = `${process.cwd()}/${name}/package.json`;

    fs.readFile(jsonPath, (err, data) => {
      if(err) return;
      const _data = JSON.parse(data.toString());
      _data.name = name;
      _data.author = author || 'Alex-young';
      _data.description = des || 'description is empty';

      const newStr = JSON.stringify(_data, null, 2);

      fs.writeFile(jsonPath, newStr, err => {
        if (err) throw err;
      });
    });
  },


};