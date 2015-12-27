var db = require("../db/knexDB");
var moment = require("moment");
var slackController = {};
var http = require("http");

slackController.urlFromSlack = function (req, res) {
    data = {};

    expression = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi
    //expression = /[-a-zA-Z0-9@:%._\+~#=]{2,256}(\.[a-z]{2,6})?\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/gi
    var regex = new RegExp(expression);

    data.message = "オーケー";

    var info = {};
    
    info.user_name = req.body.user_name;
    info.url = req.body.text;
    info.from = "Slack";
    info.title = "Tech Crunch 2015";

    splitt = info.url.split(/([^\/]+)(\/.*)*/);
    console.log("SGHSGHS")
    console.log(splitt)
    splittt = splitt[1].split(/(.+:\/\/)?([^\/]+)(\/.*)*/);

    var host = splittt[0];
    var path = splittt[1];

    var http = require('http');
    var urlOpts = {host: host, path: path};
    var re = /(<\s*title[^>]*>(.+?)<\s*\/\s*title)>/gi;
    

    if (info.url.match(regex)){
        db("urls").insert({
            user_name: info.user_name,
            from: info.from,
            date:  moment().format("X"),
            url: info.url,
            title: info.title
        }).then(function () {
            return res.status(200).json(data);
        }).catch(function (err) {
            console.log(err)
            return res.status(500).json({error: err});
        })
    } else {
        return res.status(400).json({message: "URLを貼れ！"});
    }
}


module.exports = slackController;
