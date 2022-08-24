const db = require("../../database/models");

module.exports = {
  getAll: (req, res) => {
    db.Actor.findAll().then((actors) => {
      return res.status(200).json(actors);
    });
  },
  getOne: (req, res) => {
    db.Actor.findByPk(req.params.id).then((actor) => {
      return res.status(200).json(actor);
    });
  },
  create: (req, res) => {
    const { first_name, last_name, rating, favorite_movie_id } = req.body;
    db.Actor.create({
      first_name,
      last_name,
      rating,
      favorite_movie_id,
    })
      .then((result) => {
        return res.status(201).json(result);
      })
      .catch((err) => {
        return res.status(400).send(err);
      });
  },
  update: (req, res) => {
    const { first_name, last_name, rating, favorite_movie_id } = req.body;
    db.Movie.update(
      {
        first_name,
        last_name,
        rating,
        favorite_movie_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then( () => {
        return res.status(201).json({
          msg: "Modificacion exitosa",
        });
      })
      .catch(err => res.status(400).send(err));
  },
  delete:(req, res) => {
    db.actor_movie
      .destroy({
        where: {
          actor_id: req.params.id,
        },
      })
      .then(
        db.Actor.destroy({
          where: {
            id: req.params.id,
          },
        })
          .then(() => {
            return res.status(201).json({
              msg: "Actor eliminado",
            });
          })
          .catch((err) => res.status(400).send(err))
      );
  },
};
