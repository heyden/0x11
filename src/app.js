"use strict";

const Discord = require("discord.js");
const { clsProxifyNamespace, setClsProxyValue } = require("cls-proxify");
const { logger, loggerCls, LOGGER_CLS_KEY } = require("./utils/logging");

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

async function main() {
  const services = require("./services").init();
  const commands = require("./commands").init(services);

  const client = new Discord.Client({
    intents: [
      Discord.Intents.FLAGS.GUILDS,
      Discord.Intents.FLAGS.GUILD_MESSAGES,
    ],
  });

  // event handler when bot is ready to operate on discord
  client.on("ready", () => {
    logger.info("discord connection ready");

    // start cron jobs
    // @TODO - add interface to start/stop jobs
    const jobs = require("./jobs").init(services, client);
    Object.keys(jobs).forEach((job) => jobs[job].start());
  });

  // event handler for interactions
  client.on(
    "interactionCreate",
    withClsInteraction(async (interaction) => {
      if (!interaction.isCommand()) return;
      const { commandName } = interaction;
      if (commands[commandName]) {
        await commands[commandName](interaction);
      }
    })
  );

  // lets roll
  client.login(DISCORD_TOKEN);
}

function withClsInteraction(fn) {
  return async (interaction) => {
    clsProxifyNamespace.run(async () => {
      const loggerProxy = logger.child({
        interactionId: interaction.id,
        user: interaction.user.username,
      });
      setClsProxyValue(LOGGER_CLS_KEY, loggerProxy);
      await fn(interaction);
    });
  };
}

main().then(() => logger.info("0x11 running"));
