var db = require("../db/knexDB");
var moment = require("moment");
var userController = {};

userController.testData = function (req, res) {

    var data = {};

    var sampleData = [];

    sampleData.push({id: 1, name: "Junpei", from:"gfdgdf", title: "Paris terroism", date: "2015-11-14",
        url:"http://www.nytimes.com/2015/11/15/world/europe/paris-terrorist-attacks.html?action=click&pgtype=Homepage&clickSource=story-heading&module=span-abc-region&region=span-abc-region&WT.nav=span-abc-region&_r=0"});
    sampleData.push({id: 2, name: "Shinya", from:"pihh", title: "BONE", date: "2010-01-23", url:"https://i.imgur.com/8gvR3aV.jpg"});
    sampleData.push({id: 3, name: "Alex", from:"ophuig", title: "Japan world cup 3", date: "2014-12-12", url:"https://www.youtube.com/watch?v=d_QPz0ZX1Y0"});
    sampleData.push({id: 4, name: "Junpei2", from:"fvksdv", title: "What givery does", date: "2015-11-11", url:"https://givery.co.jp/services/"});
    sampleData.push({id: 5, name: "Shinya2", from:"gjiimi", title: "cat", date: "2015-11-10", url:"http://imgur.com/e9E1ZPI"})

    data.result = sampleData;

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");

    return res.status(200).json(data);
}

userController.testDatabase = function (req, res) {
    var data = {};

    db("urls").insert({
        name: req.body.name,
        url: req.body.url
    }).then(function (result){
        data.result = result;
        return res.status(200).json(data);
    }).catch(function (err) {
        console.log(err);
        return res.status(500).json({error: err});
    })
}

userController.getList = function (req, res) {
    var data = {}

    db.select().from("urls")
    .then(function (result) {
        mappedResult = result.map(function (url) {
            url.date = moment(moment(url.date).unix()._d).format();
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

    var start = moment(req.body.start).unix();
    var end = moment(req.body.end).unix();

    db.select()
    .from("urls")
    .whereBetween('date', [start, end])
    .then(function (result) {
        mappedResult = result.map(function (url) {
            url.date = moment(moment(url.date).unix()._d).format();
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

    db.select()
    .from("urls")
    .where("id", ">=", queryId)
    .then(function (result) {
        mappedResult = result.map(function (url) {
            url.date = moment(moment(url.date).unix()._d).format();
            return url;
        })
        data.result = mappedResult;
        return res.status(200).json(data);
    }).catch(function (err) {
        return res.status(500).json({error: err});
    });
}

module.exports = userController;