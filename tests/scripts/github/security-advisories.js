"use strict";

const GithubAPI = require("../../../src/github");

async function main() {
  const advisories = await GithubAPI.getSecurityAdvisories({
    first: 10,
    publishedSince: "2021-11-24T03:21:20.447Z" || new Date().toISOString(),
  });

  if (advisories.errors) {
    console.log(advisories.errors.map((error) => error.message).join(","));
    return;
  }

  console.log(
    advisories.data.securityAdvisories.nodes
      .map(
        (advisory) =>
          `${advisory.ghsaId} [${advisory.publishedAt}]: ${advisory.summary}]`
      )
      .join("\n")
  );
}

main();
