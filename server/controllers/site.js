var Site = require('../models/mongoose/site.js');
var siteclient = require('../services/siteclient.js');

module.exports.add = function (req, res, next) {
  var url = req.body.url
  console.log(url);
  Site.getByUrl(url, function (err, site) {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (site.length > 0) {
      console.log('Already have this site.');
      res.send({status: 'failed', message: 'Already have this site.'});
    } else {
      var site = {};
      site.url = url;
      siteclient.getSiteInfo(site, function (err, data) {
        if (err) return next(err);
        Site.newAndSave(site, function (err, site){
          if (err) {
            console.log(err);
            next(err);
          }
          res.send(site);
        });
      });
    }
  })
}

module.exports.getById = function (req, res, next) {
  // body...
}

module.exports.getAll = function (req, res, next) {
  Site.getAll(function (err, sites) {
    if (err) return next(err);
    res.send(sites);
  })
}