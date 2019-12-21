const { Router } = require('express');
const controller = require('../controllers/OlympicWinnerController');
const updateRouter = new Router();
//  url.com/update/firstName/lastName
updateRouter.put('/:fname/:lname',controller.updateWinner);

module.exports = updateRouter;
