"use strict";

const axios = require("axios");
const _ = require("lodash");

const OAUTH_ENDPOINT = "https://slack.com/oauth/authorize";
const TOKEN_ISSUE_ENDPOINT = "https://slack.com/api/oauth.access";
const OAUTH_REDIRECT_URL = process.env.SERVICE_HOST + "/oauth/slack/callback";
const OAUTH_CLIENT_ID = process.env.SLACK_CLIENT_ID;
const OAUTH_CLIENT_SECRET = process.env.SLACK_CLIENT_SECRET;
const OAUTH_SCOPE = "team:read,users:read";

exports.getOAuthUrl = function () {
  const paramStr = paramsToString({
    clientId: OAUTH_CLIENT_ID,
    scope: OAUTH_SCOPE,
    redirectUri: OAUTH_REDIRECT_URL
  });

  return `${OAUTH_ENDPOINT}?${paramStr}`;
};

exports.fetchTokenByParam = function (redirectParam) {
  const paramStr = paramsToString({
    clientId: OAUTH_CLIENT_ID,
    clientSecret: OAUTH_CLIENT_SECRET,
    code: redirectParam.code,
    redirectUri: OAUTH_REDIRECT_URL
  });
  const url = `${TOKEN_ISSUE_ENDPOINT}?${paramStr}`;

  return axios
    .get(url)
    .then((response) => {
      return response.data["access_token"];
    });
};

function paramsToString(params) {
  const to = {};

  // translate param keys to snake case and escape param values
  _(params)
    .keys()
    .forEach((key) => {
      to[_.snakeCase(key)] = encodeURIComponent(params[key]);
    })
    .commit();

  return _(to)
    .pairs()
    .map((p) => `${p[0]}=${p[1]}`)
    .join("&");
}
