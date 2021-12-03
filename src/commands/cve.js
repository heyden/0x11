"use strict";

const { SlashCommandBuilder } = require("@discordjs/builders");

class CVECommand {
  name = "cve";

  constructor(githubSecurityAdvisoryService) {
    this.githubSecurityAdvisoryService = githubSecurityAdvisoryService;
    this.command = this.command.bind(this);
  }

  async command(interaction) {}
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cve")
    .setDescription("lookup a cve on NVD")
    .addStringOption((option) =>
      option
        .setName("cve-id")
        .setDescription("CVE ID to looup")
        .setRequired(true)
    ),
  CVECommand,
};
