var Page = require("../db/page");
var moment = require("moment");
var slackController = {};
var slackAdapter = require("../adapters/slack");

slackController.urlFromSlack = function (req, res) {

  data = {};

  expression = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi
  //expression = /[-a-zA-Z0-9@:%._\+~#=]{2,256}(\.[a-z]{2,6})?\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/gi
  var regex = new RegExp(expression);

  data.message = "オーケー";

  var info = {};

  info.userName = req.body.user_name;
  info.url = req.body.text;
  info.from = "Slack";
  info.title = "Tech Crunch 2015";

  splitt = info.url.split(/([^\/]+)(\/.*)*/);
  console.log("SGHSGHS")
  console.log(splitt)
  splittt = splitt[1].split(/(.+:\/\/)?([^\/]+)(\/.*)*/);

  var host = splittt[0];
  var path = splittt[1];

  var urlOpts = {host: host, path: path};
  var re = /(<\s*title[^>]*>(.+?)<\s*\/\s*title)>/gi;


  if (info.url.match(regex)){
    const page = new Page({
      userName: info.userName,
      from: info.from,
      datetime:  moment().format("X"),
      url: info.url,
      title: info.title
    });

    page.save()
      .then(function () {
        return res.status(200).json(data);
      })
      .catch(function (err) {
        console.log(err)
        return res.status(500).json({error: err});
      });
  } else {
    return res.status(400).json({message: "URLを貼れ！"});
  }
};

slackController.requestOAuth = function (req, res) {
  res.redirect(slackAdapter.getOAuthUrl());
};

slackController.callbackOAuth = function (req, res) {
  slackAdapter
    .fetchTokenByParam(req.query)
    .then((token) => {
      // TODO: store token
      console.log(token);
      res.send("OK");
    });
};

module.exports = slackController;
