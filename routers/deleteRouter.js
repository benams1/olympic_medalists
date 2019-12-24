const { Router } = require('express');
const controller = require('../controllers/OlympicWinnerController');
const deleteRouter = new Router();
//  url.com/delete/winner
deleteRouter.delete('/winner',controller.deleteWinner);

module.exports = deleteRouter;
