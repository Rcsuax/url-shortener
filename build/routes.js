'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.router = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.param('url', function (req, res, next, url) {
    url = req.params.url + req.params[0];
    if (url.startsWith('http://') || url.startsWith('https://')) {
        req.url = url;
        next();
    } else {
        res.send({ 'Error': 'Invalid Url' });
    }
});

router.prototype.idFilter = function (req, next) {
    _model2.default.find(function (err, urls) {
        urls.sort(function (a, b) {
            return a._id > b._id;
        });
        console.log(urls);
        try {
            req.id = urls.pop()._id;
        } catch (err) {
            console.log(err);
        }

        if (req.id === undefined) {
            req.id = 0;
        } else {
            req.id = req.id + 1;
        }
        next();
    });
};

router.get('/:id', function (req, res) {
    _model2.default.findOne({ '_id': req.params.id }, function (err, results) {
        console.log("found results: " + results);
        if (err) {
            res.send(err);
        } else {
            res.redirect(results.url);
        }
    });
});

router.use('/new', function (req, res, next) {
    router.prototype.idFilter(req, next);
});

router.get('new/:url*', function (req, res, next) {
    var address = new _model2.default();
    address._id = req.id;
    address.url = req.url;
    address.save(function (err) {
        if (err) {
            console.log(err);
        }
        res.send({ "id": req.id, "url": req.url });
    });
});

exports.router = router;