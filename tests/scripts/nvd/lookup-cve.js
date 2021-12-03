"use strict";

const NVDApi = require("../../../src/nvd");

async function main() {
  const cve = process.argv[2];
  const cveDetails = await NVDApi.getCVEDetails(cve);
  console.dir(cveDetails);
}

main();
