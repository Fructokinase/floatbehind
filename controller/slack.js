

var slackController = {};

// req.body
//
//
//
//
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

    return res.status(200).json(data);
}

module.exports = slackController;
