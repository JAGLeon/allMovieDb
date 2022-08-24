const express = require('express');
const router = express.Router();
const genresController = require('../controllers/apis/apiGenresController');
const moviesController = require('../controllers/apis/apiMoviesController');
const actorsController = require('../controllers/apis/apiActorsController');
const usersController = require("../controllers/apis/apiUsersController");
//GENRES
router.get('/api/genres', genresController.list);
router.get('/api/genres/:id', genresController.detail);
//MOVIES
router.get('/api/movies', moviesController.getAll);
router.get('/api/movies/:id', moviesController.getOne);
router.post('/api/movies/create', moviesController.create);
router.put('/api/movies/update/:id', moviesController.update);
router.delete('/api/movies/delete/:id', moviesController.delete);
//ACTORS
router.get('/api/actors/', actorsController.getAll); 
router.get('/api/actors/:id', actorsController.getOne); 
router.post('/api/actors/create', actorsController.create); 
router.put('/api/actors/update/:id', actorsController.update);
router.delete('/api/actors/delete/:id', actorsController.delete)
//USERS
router.post("/api/users/agregar", usersController.create);
router.post("/api/users/validar", usersController.validate);

module.exports = router