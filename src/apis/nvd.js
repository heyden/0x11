"use strict";

const fetch = require("node-fetch");

const BASE_URL = "https://services.nvd.nist.gov/rest/json/cve/1.0/";

/**
 * Retrives CVE details from the national vulnerability database (NVD)
 * @param {} cve CVE ID
 * @returns {Promise<Object>} CVE details from the NVD
 * @throws {error} Error indicating a failure to retrieve CVE details from the NVD
 */
async function getCVEDetails(cve) {
  console.log("looking up cve", cve);
  const response = await fetch(`${url}${cve}`);
  const data = await response.json();
  return data;
}

module.exports = {
  getCVEDetails,
};
