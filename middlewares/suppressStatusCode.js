"use strict";

// Provides support for always responding with a 200 status code if the additional query param
// "suppress_response_codes" is set, à la Twitter

module.exports = function (req, res, next) {
    var suppress = req.body && req.body.suppress_response_codes ||
                   req.query && req.query.suppress_response_codes;

    if (typeof suppress === "string") {
        suppress = suppress === "true" || suppress === "1";
    }

    if (suppress) {
        res._send = res.send;
        res.send = function () {
            res.status(200);
            res._send.apply(res, arguments);
        };
    }
    next();
};
