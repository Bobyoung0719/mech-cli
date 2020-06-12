const fs = require('fs');
const path = require('path');
const { count } = require('console');

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

  copyTempToProject: complete => {
    let count = 0;
    // 复制文件
    const copyFile = (srcDir, tarDir) => {
      const rs = fs.createReadStream(srcDir);
      
      rs.on('error', err => {
        console.log(err);
      });

      const ws = fs.createWriteStream(tarDir);
      ++count;
      rs.pipe(ws);
    }

    // 复制文件夹
    const copyFolder = (srcDir, tarDir) => {
      ++ count;
      fs.readdir(srcDir, (err, files) => {
        files.forEach(v => {
          const p1 = path.join(srcDir, v);
          const p2 = path.join(tarDir, v);

          fs.stat(p1, (er1, stats) => {
            // 如果是文件夹
            if(stats.isDirectory()) {
              fs.mkdir(p2, er2 => {
                copyFolder(p1, p2);
              });
            } else {
              copyFile(p1, p2);
            }
          });
        });
      });
    }

    copyFolder(srcPath, tarPath, complete);
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