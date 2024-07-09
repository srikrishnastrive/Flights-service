const express = require('express');
const cityRouter = express.Router();
const {CityController} = require('../../controllers');
const {CityMiddleWare} = require('../../middlewares');


// /api/v1/airplanes POST
cityRouter.post('/',CityMiddleWare.validateCreateRequest,CityController.createCity);
cityRouter.get('/',CityController.getCities);
cityRouter.get('/:id',CityController.getcityByOne);
cityRouter.delete('/:id',CityController.deleteCity);
// cityRouter.patch(':/id',CityController.updateAirplane);
cityRouter.patch('/:id', CityController.updateCity);

module.exports = cityRouter;
