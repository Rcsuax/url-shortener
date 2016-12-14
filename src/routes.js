'use strict';
import express from 'express';
import Url from './model';
const router = express.Router();

router.param('url', (req, res, next, url) => {
    url = req.params.url + req.params[0];
    if (url.startsWith('http://') || url.startsWith('https://')) {
        req.url = url
        next();
    } else {
        res.send({'Error': 'Invalid Url'});
    }
})

router.prototype.idFilter = function(req, next) {
    Url.find((err, urls) => {
        urls.sort((a, b) => {
            return a._id > b._id
        })
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
    })
}

router.get('/:id', (req, res) => {
    Url.findOne({'_id': req.params.id}, (err, results) => {
        console.log("found results: " + results);
        if (err) {
            res.send(err)
        } else {
            res.redirect(results.url);
        }
    })
})


router.use('/new', (req, res, next) => {
    router.prototype.idFilter(req, next);
});

router.get('new/:url*', (req, res, next) => {
    let address = new Url();
    address._id = req.id;
    address.url = req.url;
    address.save((err) => {
        if (err) {
            console.log(err)
        }
        res.send({"id": req.id,"url": req.url});
    });
});

export {router}
