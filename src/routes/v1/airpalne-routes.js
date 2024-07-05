const express = require('express');
const airplaneRouter = express.Router();
const {AirplaneController} = require('../../controllers');
const {AirplaneMiddleware} = require('../../middlewares');


// /api/v1/airplanes POST
airplaneRouter.post('/',AirplaneMiddleware.validateCreateRequest,AirplaneController.createAirplane);

module.exports = airplaneRouter;
