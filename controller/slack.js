

var slackController = {};

// req.body
//
//
//
//
slackController.urlFromSlack = function (req, res) {
    console.log("THis is body")
    console.log(req.body)
    return res.status(200).json({message: "ok"})
}

module.exports = slackController;
