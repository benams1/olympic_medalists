const { Router } = require('express');
const controller = require('../controllers/OlympicWinnerController');
const deleteRouter = new Router();
//  url.com/delete/winner
deleteRouter.delete('/winner',controller.deleteWinner);
//  url.com/delete/all  only log and response successfully
deleteRouter.delete('/all',controller.deleteAllWinners);

module.exports = deleteRouter;
