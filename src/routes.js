//IMPORTS
const { Router } = require("express");

//CONTROLLERS
const DevelopersController = require("./controllers/Developers")
const SearchController = require("./controllers/Search")

//INTIALIZATION
const routes = Router();

//ROUTES
//>Developer
routes.post('/developers', DevelopersController.store);
routes.get('/developers', DevelopersController.get);
routes.get('/developers/nearby', SearchController.index);
routes.put('/developers/:githubUsername', DevelopersController.update);
routes.delete('/developers/:githubUsername', DevelopersController.delete);

module.exports = routes;