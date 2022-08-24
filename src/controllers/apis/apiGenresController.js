const { urlencoded } = require("express");
let db = require("../../database/models");

const getUrl = (req) =>
  req.protocol + "://" + req.get("host") + req.originalUrl;
// const getBaseUrl = (req) => req.protocol + "://" + req.get("host");

module.exports = {
  list: (req, res) => {
    db.Genre.findAll({
        include: [{association: "movies"}]
    }).then((genres) => {
      return res.json({
        meta: {
          status: 200,
          total: genres.length,
          endpoint: getUrl(req),
        },
        data: genres,
      });
    })
    .catch(error => (
      res.json({
        meta: {
          status:400,
          url: getUrl
        },
        error: error
      })
    ))

  },
  detail: (req, res) => {
    db.Genre.findOne({
      where: { id: req.params.id },
      include: [{association: "movies"}]
    }).then((genre) => {
      return res.json({
        meta: {
          status: 200,
          endpoint: getUrl(req),
        },
        data: genre,
      });
    })    
    .catch(error => (
      res.json({
        meta: {
          status:400,
          url: getUrl
        },
        error: error
      })
    ))
  },
};
