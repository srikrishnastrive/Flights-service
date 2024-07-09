const { error } = require('winston');
const {AirplaneService} = require('../services');
const {StatusCodes} = require('http-status-codes');
const {ErrorResponse,SuccessResponse} = require('../utils/common');
const AppError = require('../utils/Errors/app-error');

async function createAirplane(req,res){
    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber:req.body.modelNumber,
            capacity: req.body.capacity
        });
        // SuccessResponse.message = "Successfully create a airplane";
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.CREATED).json({SuccessResponse});
    }
    catch(error){
        //ErrorResponse.message = 'Something went wrong while creating airplane';
        //ErrorResponse.error = new AppError('Model Number not found in the onComing Req',StatusCodes.BAD_REQUEST);
        ErrorResponse.error = error;
        return  res.status(error.statusCode).json({ErrorResponse});
    }

}

async function getAirplanes(req,res){
    try{
        const airplanes = await AirplaneService.getAirplanes();
        SuccessResponse.data = airplanes;
        return res.status(StatusCodes.CREATED).json({SuccessResponse});

    }
    catch(error){
        ErrorResponse.error = error;
        return  res.status(error.statusCode).json({ErrorResponse});
    }
}

async function getAirplaneByOne(req,res){
    try{
        const airplane = await AirplaneService.getSingleAirplane(req.params.id);
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.CREATED).json({SuccessResponse});

    }
    catch(error){
        ErrorResponse.error = error;
        return  res.status(error.statusCode).json({ErrorResponse});
    }
}

async function deleteAirplane(req,res){
    try {
        const deletedAirplane= await AirplaneService.deleteSinglePlane(req.params.id);
        SuccessResponse.data = deletedAirplane;
        return res.status(StatusCodes.OK).json({SuccessResponse});
    }
    catch(error){
        ErrorResponse.error = error;
        return res.status(error.statusCode).json({ErrorResponse});
        
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplaneByOne,
    deleteAirplane
}