const axios = require("axios");
const mongoose = require("mongoose");
const GitHubUserRepo = mongoose.model("GitHubUserRepo");

let GitHubService = {
  updateRepositoryDetailsForUser: async function name({ repositoryInfo, applicationId, userId }) {
    let gitHubRepo = await GitHubUserRepo.findOne({ userId });
    let repos = repositoryInfo.repositories.map(repository => {
      return { full_name: repository.full_name, html_url: repository.html_url };
    });
    if (gitHubRepo) {
      gitHubRepo.repos = repos;
      return await gitHubRepo.save();
    } else {
      let githubRepoDetails = new GitHubUserRepo({ userId, applicationId, repos });
      return await githubRepoDetails.save();
    }
  },
  getListOfRepositoriesForUser: async function (userId) {
    try {
      return await GitHubUserRepo.findOne({ userId });
    } catch (error) {
      console.error("Error fetching connected repositories");
    }
  },
  isAppInstalled: async function name(installation_id) {
    return await GitHubUserRepo.findOne({ applicationId: installation_id });
  },
  deleteInstalledApp: async function name(installation_id) {
    return await GitHubUserRepo.deleteOne({ applicationId: installation_id });
  }
};

module.exports = GitHubService;
