"use strict";

const { clsProxifyNamespace, setClsProxyValue } = require("cls-proxify");
const { logger, LOGGER_CLS_KEY } = require("../utils/logging");
const { v4: uuidv4 } = require("uuid");
const CronJob = require("cron").CronJob;
const { GithubSecurityAdvisoryJob } = require("./github-security-advisories");

// @TODO refactor how jobs notify channel
/**
 * Initializes CronJobs and starts them.
 */
function init(services, client) {
  const jobs = {};

  // Github Advisory notifier
  const ghsan = new GithubSecurityAdvisoryJob(
    services.GithubSecurityAdvisoryService,
    client
  );

  jobs[ghsan.name] = new CronJob(
    ghsan.schedule,
    withCls(ghsan.name, ghsan.job)
  );

  return jobs;
}

function withCls(name, fn) {
  clsProxifyNamespace.run(async () => {
    const loggerProxy = logger.child({
      job: name,
      jobId: uuidv4(),
    });
    setClsProxyValue(LOGGER_CLS_KEY, loggerProxy);
    await fn();
  });
}

module.exports = {
  init,
};
