const fs = require('fs');

module.exports = {
  getCurrentDirectoryBase: () => {
    return process.cwd();
  },

  directoryExists: filePath => {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      console.log(err)
      return false;
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
  }
};