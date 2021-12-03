"use strict";

const fetch = require("node-fetch");
const { loggerCls } = require("../utils/logging");

const GITHUB_API_TOKEN = process.env.GITHUB_API_TOKEN;
const GITHUB_GRAPHQL_API = `https://api.github.com/graphql`;

const QUERY_SECURITY_ADVISORIES = `
query getSecurityAdvisories($first:Int, $publishedSince:DateTime){
  securityAdvisories(first:$first, publishedSince:$publishedSince){
    nodes{
      cvss{
        score
      }
      databaseId
      summary
      description
      references{
        url
      }
      ghsaId
      identifiers{
        type
        value
      }
      origin
      publishedAt
    }
  }
}
`.trim();

/**
 * Retrieves security advisories through GitHub's GraphQL API.
 * @param {object} input
 * @param {number} input.first
 * @param {number} input.last
 * @param {string} input.publishedSince advisories published since a DateTime, ISO-8601 format
 * @returns {Promise<Array>} promises resolving to a list of security advisories or an error
 * @throws {error} Error indicating a failure to retrieve security advisories
 */
async function getSecurityAdvisories(input) {
  loggerCls.info("looking up advisories", input);

  const queryInput = {
    first: input.first,
    publishedSince: input.publishedSince,
  };

  const body = {
    operationName: "getSecurityAdvisories",
    query: QUERY_SECURITY_ADVISORIES,
    variables: queryInput,
  };

  const response = await fetch(GITHUB_GRAPHQL_API, {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      Authorization: `bearer ${GITHUB_API_TOKEN}`,
    },
  });

  const advisories = await response.json();
  return advisories;
}

module.exports = {
  getSecurityAdvisories,
};
