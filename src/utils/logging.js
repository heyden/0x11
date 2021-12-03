"use strict";

const { clsProxify } = require("cls-proxify");
const pino = require("pino");

const LOGGER_CLS_KEY = "CLS_LOGGER";

const logger = pino();
const loggerCls = clsProxify(LOGGER_CLS_KEY, logger);

module.exports = {
  logger,
  loggerCls,
  LOGGER_CLS_KEY,
};
