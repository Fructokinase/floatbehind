"use strict";

// Replace the stock res.json() method with one that also attaches a code field that reflects the
// HTTP status code of the response.

module.exports = function (req, res, next) {
    res._json = res.json;
    res.json = function (obj) {
        if (obj) {
            obj.code = res.statusCode;
        } else {
            obj = {
                code: res.statusCode
            };
        }
        res._json(obj);
    };
    next();
};
