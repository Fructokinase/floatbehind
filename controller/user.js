var db = require("../db/knexDB");
var moment = require("moment");
var userController = {};

userController.testData = function (req, res) {

    var data = {};

    var sampleData = [];

    sampleData.push({page_id: 1, user_name: "Junpei", from:"gfdgdf", title: "Paris terroism", datetime: "2015-11-14",
        url:"http://www.nytimes.com/2015/11/15/world/europe/paris-terrorist-attacks.html?action=click&pgtype=Homepage&clickSource=story-heading&module=span-abc-region&region=span-abc-region&WT.nav=span-abc-region&_r=0"});
    sampleData.push({page_id: 2, user_name: "Shinya", from:"pihh", title: "BONE", datetime: "2010-01-23", url:"https://i.imgur.com/8gvR3aV.jpg"});
    sampleData.push({page_id: 3, user_name: "Alex", from:"ophuig", title: "Japan world cup 3", datetime: "2014-12-12", url:"https://www.youtube.com/watch?v=d_QPz0ZX1Y0"});
    sampleData.push({page_id: 4, user_name: "Junpei2", from:"fvksdv", title: "What givery does", datetime: "2015-11-11", url:"https://givery.co.jp/services/"});
    sampleData.push({page_id: 5, user_name: "Shinya2", from:"gjiimi", title: "cat", datetime: "2015-11-10", url:"http://imgur.com/e9E1ZPI"})

    data.result = sampleData;

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");

    return res.status(200).json(data);
}

userController.testDatabase = function (req, res) {
    var data = {};

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");

    db("pages").insert({
        user_name: req.body.name,
        url: req.body.url
    }).then(function (result){
        data.result = result;
        return res.status(200).json(data);
    }).catch(function (err) {
        return res.status(500).json({error: err});
    })
}

userController.getList = function (req, res) {
    var data = {}

    db.select().from("pages")
    .then(function (result) {
        mappedResult = result.map(function (url) {
            url.datetime = moment(moment(url.datetime).unix()._d).format();
            return url;
        })
        data.result = mappedResult;
        return res.status(200).json(data);
    }).catch(function (err) {
        console.log(err)
        return res.status(500).json({error: err});
    })
}

userController.getListByTime = function (req, res) {
    var data = {};

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");

    var start = moment(req.query.start).unix();
    var end = moment(req.query.end).unix();

    db.select()
    .from("pages")
    .whereBetween('datetime', [start, end])
    .then(function (result) {
        mappedResult = result.map(function (url) {
            url.datetime = moment(moment(url.datetime).unix()._d).format();
            return url;
        })
        data.result = mappedResult;
        return res.status(200).json(data);
    }).catch(function (err) {
        return res.status(500).json({error: err});
    });
}

userController.getListById = function (req, res) {
    var data = {}
    var queryId = Number(req.query.id);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");

    db.select()
    .from("pages")
    .where("page_id", ">=", queryId)
    .then(function (result) {
        mappedResult = result.map(function (url) {
            url.datetime = moment(moment(url.datetime).unix()._d).format();
            return url;
        })
        data.result = mappedResult;
        return res.status(200).json(data);
    }).catch(function (err) {
        return res.status(500).json({error: err});
    });
};

userController.deleteList = function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");

};

module.exports = userController;
