"use strict";

const GithubAPI = require("../apis/github");
const { loggerCls } = require("../utils/logging");

class GithubSecurityAdvisoryService {
  constructor() {}

  async get(id) {}

  /**
   * Retrieves GitHub security advisories
   * @param {object} input
   * @param {number} input.first
   * @param {number} input.last
   * @param {string} input.publishedSince advisories published since a DateTime, ISO-8601 format
   * @returns {Promise<Array>} promises resolving to a list of security advisories or an error
   * @throws {error} Error indicating a failure to retrieve security advisories
   */
  async find(input) {
    return GithubAPI.getSecurityAdvisories(input);
  }
}

module.exports = {
  GithubSecurityAdvisoryService,
};
