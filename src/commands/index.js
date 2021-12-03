"use strict";

const { loggerCls } = require("../utils/logging");
const { GithubSecurityAdvisoryCommand } = require("./ghsa");
const { CVECommand } = require("./cve");

/**
 * Initialize the command hanndlers for Discord interactions.
 * @param {object} services application business logic services
 * @returns {object} commands key/value pairs for command handlers
 */
function init(services) {
  const commands = {};

  const ghsaCommand = new GithubSecurityAdvisoryCommand(
    services.GithubSecurityAdvisoryService
  );
  const cveCommand = new CVECommand(services.cveService);

  commands[ghsaCommand.name] = withError(ghsaCommand.command);
  commands[cveCommand.name] = withError(cveCommand.command);

  return commands;
}

module.exports = {
  init,
};

function withError(fn) {
  return async (interaction) => {
    try {
      await fn(interaction);
    } catch (error) {
      loggerCls.error("unable to respond to interaction", error);
      interaction.reply("no can do right now");
    }
  };
}
