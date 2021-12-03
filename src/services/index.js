"use strict";

const { GithubSecurityAdvisoryService } = require("./github-security-advisory");
const { CveService } = require("./cve");

/**
 * Initializes singletons for the application business logic services
 * @returns {object} services singleton business logic services for the application
 */
function init() {
  const services = {};
  services.GithubSecurityAdvisoryService = new GithubSecurityAdvisoryService();
  services.CveService = new CveService();
  return services;
}

module.exports = {
  init,
};
