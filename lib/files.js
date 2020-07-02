const fs = require('fs');
const path = require('path');

// 项目执行目录
const CWD = process.cwd();

// 执行次数， 文件总个数， 文件夹个数
let count = 0, filesLen = 0, folderLen = 0;

// 拷贝资源
function copyFun(tempPath, proPath, cb = () => {}) {
  fs.readdir(tempPath, (err, files) => {
    // 为空是直接回调
    if(files && files.length > 0) {
      filesLen += files.length;

      files.forEach(v => {
        const p1 = path.join(tempPath, v);
        const p2 = path.join(proPath, v);

        fs.stat(p1, (err, stats) => {
          // 如果是文件夹
          if(stats.isDirectory()) {
            ++folderLen;
            fs.mkdir(p2, er2 => {copyFun(p1, p2)});
          } else {
            copyFile(p1, p2, cb);
          }
        });
      });
    }
  });
}

// 复制文件
function copyFile(srcDir, tarDir, cb) {
  const rs = fs.createReadStream(srcDir);
  const ws = fs.createWriteStream(tarDir);
  rs.pipe(ws);

  ++count; 

  if(count == (filesLen - folderLen)) {
    cb && cb();
  }
}

// 删除模板文件夹
function deleteTempFolder(path) {
  fs.readFile(path, (err, files) => {
    if(files.length) {
      fs.stat(path, (err, stat) => {
        if(stat.isDirectory()) {
          const files = fs.readFile(path);
    
          if(files.length) {
            fs.rmdirSync(path);
          } else {
            files.forEach(v => {
              fs.rmdirSync(v);
            });
          }
        } else {
          fs.unlinkSync(path);
        }
      });
    } else {
      fs.rmdirSync(path);
    }
  });
}

module.exports = {
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },

  directoryExists: filePath => {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  },

  // 拷贝模板
  copyTempToProject: (temp, projectName, author, cb) => {
    const proPath = path.resolve(CWD, projectName);
    const tempPath = path.resolve(CWD, temp);
    
    // 项目（仓库）的package.json
    const proJson = path.resolve(CWD, `${projectName}/package.json`);

    // 模板的package.json
    const tempJson =  path.resolve(CWD, `${temp}/package.json`);

    // 读取项目的package.json
    fs.readFile(proJson, (err, proRes) => {
      const proData = JSON.parse(proRes.toString());

      // 读取模板package.json
      fs.readFile(tempJson, (err, temRes) => {
        const tempData = JSON.parse(temRes.toString());

        proData.author = author;
        proData.browserslist = tempData.browserslist;
        proData.devDependencies = tempData.devDependencies;
        proData.dependencies = tempData.dependencies;

        const newProJson = JSON.stringify(proData, null, 2);

        // 重写项目（仓库）package.json
        fs.writeFile(proJson, newProJson, () => {});

        // 删除模板package.json
        fs.unlink(tempJson, () => {
          copyFun(tempPath, proPath, cb);
        });
      });
    });
  }
};