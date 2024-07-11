const express = require('express');

const { InfoController } = require('../../controllers');
const airplaneRouter = require('./airpalne-routes');
const cityRouter = require('./city-routes');
const airportRouter = require('./airport-routes');


const router = express.Router();

router.use('/airplanes',airplaneRouter);
router.use('/cities',cityRouter);
router.use('/airport',airportRouter)

router.get('/info', InfoController.info);

module.exports = router;