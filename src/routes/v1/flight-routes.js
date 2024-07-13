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

// /api/v1/flights/1
flightRouter.get('/:id', 
    FlightController.getAirplaneByOne);    


// /api/v1/flights/:id/seats   PATCH

flightRouter.patch('/:id/seats',
    FlightMiddleware.validateUpdateSeatsRequest,
    FlightController.updateFlighSeats);    

module.exports = flightRouter;
