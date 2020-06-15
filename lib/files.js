const fs = require('fs');
const path = require('path');

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

  copyTempToProject: (tempSrc, proSrc, complete) => {
    const srcPath = path.resolve(process.cwd(), tempSrc);
    const tarPath = path.resolve(process.cwd(), proSrc);

    // console.log(srcPath, tarPath)


    // 执行次数， 文件总个数， 文件夹个数
    let count = 0, filesLen = 0, folderLen = 0;

    // 复制文件
    const copyFile = (srcDir, tarDir) => {
      const rs = fs.createReadStream(srcDir);
      const ws = fs.createWriteStream(tarDir);

      rs.pipe(ws);

      checkEnd();
    }

    // 是否复制完成
    const checkEnd = () => {
      count++;
      const isEnd = (count + folderLen) == filesLen;

      isEnd && complete('拷贝完成！！！');
    }

    // 递归拷贝文件
    const copyFolder = (srcDir, tarDir) => {
      fs.readdir(srcDir, (err, files) => {

        filesLen += files.length;

        // 为空是直接回调
        if(files.length > 0) {
          files.forEach(v => {
            const p1 = path.join(srcDir, v);
            const p2 = path.join(tarDir, v);

            fs.stat(p1, (err, stats) => {
              // 如果是文件夹
              if(stats.isDirectory()) {
                ++folderLen;
                fs.mkdir(p2, er2 => {
                  copyFolder(p1, p2);
                });
              } else {
                copyFile(p1, p2);
              }
            });
          });
        }
      });
    }

    copyFolder(srcPath, tarPath);
    // 拷贝完成删除源文件
    const deleteTempFolder = () => {
      console.log('00000')
    }

    
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