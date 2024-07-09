const express = require('express');
const airplaneRouter = express.Router();
const {AirplaneController} = require('../../controllers');
const {AirplaneMiddleware} = require('../../middlewares');


// /api/v1/airplanes POST
airplaneRouter.post('/',AirplaneMiddleware.validateCreateRequest,AirplaneController.createAirplane);
airplaneRouter.get('/',AirplaneController.getAirplanes);
airplaneRouter.get('/:id',AirplaneController.getAirplaneByOne);
airplaneRouter.delete('/:id',AirplaneController.deleteAirplane);

module.exports = airplaneRouter;
