const express = require('express');
const flightRouter = express.Router();
const {FlightController} = require('../../controllers');
const {FlightMiddleware} = require('../../middlewares');


// /api/v1/flights POST
flightRouter.post('/', 
    FlightMiddleware.validateCreateRequest,
    FlightController.createFlight

);

// /api/v1/flights?trips=MUM-DEL GET
flightRouter.get('/', 
    FlightController.getAllFlights);


module.exports = flightRouter;
