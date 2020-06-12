const git = require('simple-git');

module.exports = {
  cloneRemoteWareHouse: async (repoPath, newName) => {
    try {
      await git().clone(repoPath, newName);

      return true;
    } catch (error) {
      return false
    }
  },

  cloneWareHouseTemp: async repoPath => {
    try {
      await git().clone(repoPath);

      return true;
    } catch (error) {
      return false
    }
  }
}


