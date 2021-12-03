"use strict";

const { Routes } = require("discord-api-types/v9");
const { REST } = require("@discordjs/rest");

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_AOC_GUILD_ID = process.env.DISCORD_AOC_GUILD_ID;

const commands = [
  require("../src/commands/ghsa").data,
  require("../src/commands/cve").data,
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(DISCORD_TOKEN);

rest
  .put(
    Routes.applicationGuildCommands(DISCORD_CLIENT_ID, DISCORD_AOC_GUILD_ID),
    {
      body: commands,
    }
  )
  .then(() => console.log("successfully registered commands"))
  .catch(console.error);
