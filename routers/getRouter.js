const { Router } = require('express');
const controller = require('../controllers/OlympicWinnerController');
const getRouter = new Router();
//  url.com/get/all
getRouter.get('/all',controller.getAllWinners);
//  url.com/get/winner?f_name=<some first name>&l_name=<some last name>
getRouter.get('/winner',controller.getWinnerByName);

module.exports = getRouter;
