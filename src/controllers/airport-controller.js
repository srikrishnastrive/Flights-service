
const {AirportService} = require('../services');
const {StatusCodes} = require('http-status-codes');
const {ErrorResponse,SuccessResponse} = require('../utils/common');


async function createAirport(req,res){
    try {
        const airport = await AirportService.createAirport({
            name:req.body.name,
            code: req.body.code,
            address:req.body.address,
            cityId: req.body.cityId

        });
        // SuccessResponse.message = "Successfully create a airport";
        SuccessResponse.data = airport;
        return res.status(StatusCodes.CREATED).json({SuccessResponse});
    }
    catch(error){
        //ErrorResponse.message = 'Something went wrong while creating airport';
        //ErrorResponse.error = new AppError('Model Number not found in the onComing Req',StatusCodes.BAD_REQUEST);
        ErrorResponse.error = error;
        return  res.status(error.statusCode).json({ErrorResponse});
    }

}

async function getAirports(req,res){
    try{
        const airports = await AirportService.getAirports();
        SuccessResponse.data = airports;
        return res.status(StatusCodes.CREATED).json({SuccessResponse});

    }
    catch(error){
        ErrorResponse.error = error;
        return  res.status(error.statusCode).json({ErrorResponse});
    }
}

async function getAirportByOne(req,res){
    try{
        const airport = await AirportService.getSingleAirport(req.params.id);
        SuccessResponse.data = airport;
        return res.status(StatusCodes.CREATED).json({SuccessResponse});

    }
    catch(error){
        ErrorResponse.error = error;
        return  res.status(error.statusCode).json({ErrorResponse});
    }
}

async function deleteAirport(req,res){
    try {
        const deletedAirplane= await AirportService.deleteSingleAirport(req.params.id);
        SuccessResponse.data = deletedAirplane;
        return res.status(StatusCodes.OK).json({SuccessResponse});
    }
    catch(error){
        ErrorResponse.error = error;
        return res.status(error.statusCode).json({ErrorResponse});
        
    }
}



async function updateAirport(req, res) {
    try {
        const updatedAirplane = await AirportService.updateAirport(req.params.id, req.body);
        SuccessResponse.data = updatedAirplane;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = {
            statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
            explanation: error.message || 'Internal Server Error'
        };
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

module.exports = {
    createAirport,
    getAirports,
    getAirportByOne,
    deleteAirport,
    updateAirport
}