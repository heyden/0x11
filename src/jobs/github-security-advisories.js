"use strict";

const { loggerCls } = require("../utils/logging");

class GithubSecurityAdvisoryJob {
  name = "github-advisories-notifier";
  schedule = "0 * * * * *";
  lastLookup = new Date().toISOString();

  constructor(githubSecurityAdvisoryService, client) {
    this.githubSecurityAdvisoryService = githubSecurityAdvisoryService;
    this.client = client;
    this.job = this.job.bind(this);
  }

  // @TODO - improve notifier channel support
  async job() {
    loggerCls.info("running github security advisory notifier");

    const notifierChannel = this.client.channels.cache.find(
      (c) => c.name === "appsec-awesome"
    );

    if (!notifierChannel) {
      loggerCls.info("no channel to notify");
      return;
    }
    const first = 10;
    const since = this.lastLookup;

    try {
      const advisories = await this.githubSecurityAdvisoryService.find({
        since,
        first,
      });
      if (advisories.data.securityAdvisories.nodes.length > 0) {
        const content = advisories.data.securityAdvisories.nodes
          .map(
            (advisory) =>
              `${advisory.ghsaId} [${advisory.publishedAt}]: ${advisory.summary}]`
          )
          .join("\n");
        notifierChannel.send({ content });
      }
    } catch (error) {
      loggerCls.error(error);
    } finally {
      lastLookup = since;
      loggerCls.info("job done");
    }
  }
}

module.exports = {
  GithubSecurityAdvisoryJob,
};
