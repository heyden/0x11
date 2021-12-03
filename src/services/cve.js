"use strict";

const nvd = require("../apis/nvd");
const { loggerCls } = require("../utils/logging");

class CveService {
  constructor() {}

  async get(cve) {
    return nvd.getCVEDetails(cve);
  }
}

module.exports = {
  CveService,
};
