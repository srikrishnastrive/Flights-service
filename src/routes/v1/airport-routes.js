const express = require('express');
const airportRouter = express.Router();
const {AirportController} = require('../../controllers');
const {AirportMiddleware} = require('../../middlewares');


// /api/v1/airplanes POST
airportRouter.post('/',AirportMiddleware.validateCreateRequest,AirportController.createAirport);
airportRouter.get('/',AirportController.getAirports);
airportRouter.get('/:id',AirportController.getAirportByOne);
airportRouter.delete('/:id',AirportController.deleteAirport);
// airportRouter.patch(':/id',AirportController.updateAirplane);
airportRouter.patch('/:id', AirportController.updateAirport);

module.exports = airportRouter;
