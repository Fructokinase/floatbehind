var db = require("../db/knexDB");
var moment = require("moment");
var slackController = {};

slackController.urlFromSlack = function (req, res) {
    data = {};

    data.message = "ok =)";
    data.result = req.body;

    var info = {};
    
    info.user_name = req.body.user_name;
    info.team_id = req.body.team_id;
    info.team_domain = req.body.team_domain;
    info.channel_id = req.body.channel_id;
    info.channel_name = req.body.channel_domain;
    info.url = req.body.text;

    db("urls").insert({
        user_name: info.user_name,
        team_id: info.team_id,
        team_domain: info.team_domain,
        channel_id: info.channel_id,
        channel_name: info.channel_name,
        date:  moment().format("X"),
        url: info.url
    }).then(function () {
        data.message = "ok! :D";
        return res.status(200).json(data);
    }).catch(function (err) {
        return res.status(500).json({error: err});
    })

    
}

module.exports = slackController;
