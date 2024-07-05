const express = require('express');

const { InfoController } = require('../../controllers');
const airplaneRouter = require('./airpalne-routes');


const router = express.Router();

router.use('/airplanes',airplaneRouter);

router.get('/info', InfoController.info);

module.exports = router;