const { Router } = require('express');
const controller = require('../controllers/OlympicWinnerController');
const postRouter = new Router();
//  url.com/add/winner
postRouter.post('/winner',controller.addNewWinner);

module.exports = postRouter;
