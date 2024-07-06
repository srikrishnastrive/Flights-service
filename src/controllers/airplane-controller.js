const { error } = require('winston');
const {AirplaneService} = require('../services');
const {StatusCodes} = require('http-status-codes');
const {ErrorResponse,SuccessResponse} = require('../utils/common');

async function createAirplane(req,res){
    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber:req.body.modelNumber,
            capacity: req.body.capacity
        });
        SuccessResponse.message = "Successfully create a airplane";
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.CREATED).json({SuccessResponse});
    }
    catch(error){
        ErrorResponse.message = 'Something went wrong while creating airplane';
        ErrorResponse.error = error;
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ErrorResponse});
    }

}

module.exports = {
    createAirplane
}