"use strict";

const { SlashCommandBuilder } = require("@discordjs/builders");

class GithubSecurityAdvisoryCommand {
  name = "ghsa";

  constructor(githubSecurityAdvisoryService) {
    this.githubSecurityAdvisoryService = githubSecurityAdvisoryService;
    this.command = this.command.bind(this);
  }

  async command(interaction) {
    const ghsaID = interaction.options["github-advisory-id"];
    const advisory = await advisoryService.getGitHubAdvisory(ghsaID);
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ghsa")
    .setDescription("lookup a GitHub security advisory")
    .addStringOption((option) =>
      option
        .setName("github-advisory-id")
        .setDescription("GitHub Advisory ID to looup")
        .setRequired(true)
    ),
  GithubSecurityAdvisoryCommand,
};
