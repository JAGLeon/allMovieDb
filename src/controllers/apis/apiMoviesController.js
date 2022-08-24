const { default: fetch } = require("node-fetch");
let db = require("../../database/models");

const BASE_URL = "http://localhost:3000/api";

const getUrl = (req) =>
  req.protocol + "://" + req.get("host") + req.originalUrl;


module.exports = {
  getAll: (req, res) => {
  
  db.Movie.findAll({
      include: [
        {
          association: "genre",
        },
        {
          association: "actors",
        },
      ],
    })
      .then((movies) => {
        return res.json({
          meta: {
            endpoint: getUrl(req),
            status: 200,
            total: movies.length,
          },
          data: movies,
        });
      })
      .catch((error) => res.status(400).send(error));  },
  getOne: (req, res) => {
    if (req.params.id % 1 !== 0 || req.params.id < 0) {
      return res.status(404).json({
        meta: {
          status: 400,
          msg: "ID erroneo",
        },
      });
    } else {
      db.Movie.findOne(
        {
          where: {
            id: req.params.id,
          },
        },
        {
          include: [
            {
              association: "movies",
            },
            {
              association: "genre",
            },
          ],
        }
      )
        .then((movie) => {
          if (movie) {
            return res.status(200).json({
              meta: {
                endpoint: getUrl(req),
                status: 200,
              },
              data: movie,
            });
          } else {
            return res.status(404).json({
              meta: {
                status: 400,
                msg: "ID no funca",
              },
            });
          }
        })
        .catch((error) => res.status(400).send(error));
    }
  },
  create: (req, res) => {
    const { title, rating, awards, release_date, length, genre_id } = req.body;
    db.Movie.create({
      title,
      rating,
      awards,
      release_date,
      length,
      genre_id,
    })
      .then((movie) => {
        res.status(201).json({
          //201 = Created
          meta: {
            endpoint: getUrl(req),
            msg: "Movie se agrego",
          },
          data: movie,
        });
      })
      .catch((error) => {
        switch (error.name) {
          case "SequelizeValidationError":
            let errorsMsg = [];
            let notNullErrors = [];
            let validationsErrors = [];
            error.errors.forEach((error) => {
              errorsMsg.push(error.message);
              if (error.type == "notNull Violation") {
                notNullErrors.push(error.message);
              }
              if (error.type == "Validation error") {
                validationsErrors.push(error.message);
              }
            });
            let response = {
              status: 400, 
              messages: "Error de datos",
              errors: {
                quantity: errorsMsg.length,
                msg: errorsMsg,
                notNull: notNullErrors,
                validations: validationsErrors,
              },
            };
            return res.status(400).json(response);
          default:
            return res.status(500).json({
              error,
            });
        }
      });
  },
  update: (req, res) => {
    const { title, rating, awards, release_date, length, genre_id } = req.body;

    db.Movie.update(
      {
        title,
        rating,
        awards,
        release_date,
        length,
        genre_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((result) => {
        if (result) {
          return res.status(201).json({
            msg: "Se modifico",
          });
        } else {
          return res.status(200).json({
            msg: "No hay cambios",
          });
        }
      })
      .catch((error) => res.status(500).json(error));
  },
  delete: (req, res) => {
    let actorUpdate = db.Actor.update(
      {
        favorite_movie_id: null,
      },
      {
        where: {
          favorite_movie_id: req.params.id,
        },
      }
    );
    let actorMovieUpdate = db.actor_movie.destroy({
      where: {
        movie_id: req.params.id,
      },
    });
    Promise.all([actorUpdate, actorMovieUpdate]).then(
      db.Movie.destroy({
        where: {
          id: req.params.id,
        },
      })
        .then(result => {
          if (result) {
            return res.status(200).json({
              msg: "Movie se elimino",
            });
          } else {
            return res.status(200).json({
              msg: "No hay cambios",
            });
          }
        })
        .catch((error) => res.status(500).json(error))
    );
  },
};
