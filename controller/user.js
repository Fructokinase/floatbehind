var Page = require("../db/page");
var moment = require("moment");
var userController = {};

userController.testData = function (req, res) {

  var data = {};

  var sampleData = [];

  sampleData.push({pageId: 1, userName: "Junpei", from:"gfdgdf", title: "Paris terroism", datetime: "2015-11-14", url:"http://www.nytimes.com/2015/11/15/world/europe/paris-terrorist-attacks.html?action=click&pgtype=Homepage&clickSource=story-heading&module=span-abc-region&region=span-abc-region&WT.nav=span-abc-region&_r=0"});
  sampleData.push({pageId: 2, userName: "Shinya", from:"pihh", title: "BONE", datetime: "2010-01-23", url:"https://i.imgur.com/8gvR3aV.jpg"});
  sampleData.push({pageId: 3, userName: "Alex", from:"ophuig", title: "Japan world cup 3", datetime: "2014-12-12", url:"https://www.youtube.com/watch?v=d_QPz0ZX1Y0"});
  sampleData.push({pageId: 4, userName: "Junpei2", from:"fvksdv", title: "What givery does", datetime: "2015-11-11", url:"https://givery.co.jp/services/"});
  sampleData.push({pageId: 5, userName: "Shinya2", from:"gjiimi", title: "cat", datetime: "2015-11-10", url:"http://imgur.com/e9E1ZPI"})

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

  const page = new Page({
    userName: req.body.name,
    url: req.body.url,
    datetime: new Date()
  });

  page.save()
    .then(function (result){
      data.result = result;
      return res.status(200).json(data);
    })
    .catch(function (err) {
      return res.status(500).json({error: err});
    });
}

userController.getList = function (req, res) {
  var data = {};

  Page
    .fetchAll()
    .then(function (result) {
      const mappedResult = result.map(function (page) {
        page.datetime = moment(moment(page.datetime).unix()._d).format();
        return page;
      })
      data.result = mappedResult;
      return res.status(200).json(data);
    })
    .catch(function (err) {
      console.log(err)
      return res.status(500).json({error: err});
    });
}

userController.getListByTime = function (req, res) {
  var data = {};

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");

  var start = moment(req.query.start).toDate();
  var end = moment(req.query.end).toDate();

  Page
    .query(function (qb) {
      qb.whereBetween('datetime', [start, end]);
    })
    .fetchAll()
    .then(function (result) {
      const mappedResult = result.map(function (page) {
        page.datetime = moment(moment(page.datetime).unix()._d).format();
        return page;
      })
      data.result = mappedResult;
      return res.status(200).json(data);
    })
    .catch(function (err) {
      return res.status(500).json({error: err});
    });
}

userController.getListById = function (req, res) {
  var data = {}
  var queryId = Number(req.query.id);

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");

  Page
    .where('page_id', '>=', queryId)
    .fetchAll()
    .then(function (result) {
      const mappedResult = result.map(function (url) {
        url.datetime = moment(moment(url.datetime).unix()._d).format();
        return url;
      });
      data.result = mappedResult;
      return res.status(200).json(data);
    })
    .catch(function (err) {
      return res.status(500).json({error: err});
    });
};

userController.deleteList = function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");

};

module.exports = userController;
