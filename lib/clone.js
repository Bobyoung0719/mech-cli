const git = require('simple-git');

module.exports = {
  gitCloneStart: async (repoPath, newName) => {
    try {
      await git().clone(repoPath, newName);

      return true;
    } catch (error) {
      return false
    }
  }
}


