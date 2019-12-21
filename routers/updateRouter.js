const { Router } = require('express');
const controller = require('../controllers/OlympicWinnerController');
const updateRouter = new Router();
//  url.com/update/firstName/lastName
updateRouter.put('/winner',controller.updateWinner);

module.exports = updateRouter;
