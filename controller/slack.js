var db = require("../db/knexDB");
var moment = require("moment");
var slackController = {};

slackController.urlFromSlack = function (req, res) {
    data = {};

    data.message = "ok =)";
    data.result = req.body;

    var info = {};
    
    info.user_name = req.body.user_name;
    info.url = req.body.text;
    info.from = "Slack";
    info.title = "Filler";

    db("urls").insert({
        user_name: info.user_name,
        from: info.from,
        date:  moment().format("X"),
        url: info.url,
        title: info.title
    }).then(function () {
        data.message = "ok! :D";
        return res.status(200).json(data);
    }).catch(function (err) {
        return res.status(500).json({error: err});
    })

    
}

module.exports = slackController;
