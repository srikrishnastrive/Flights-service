const { error } = require('winston');
const {CityService} = require('../services');
const {StatusCodes} = require('http-status-codes');
const {ErrorResponse,SuccessResponse} = require('../utils/common');


async function createCity(req,res){
    try {
        const city = await CityService.createCity({
            name:req.body.name,
           
        });
        // SuccessResponse.message = "Successfully create a city";
        SuccessResponse.data = city;
        return res.status(StatusCodes.CREATED).json({SuccessResponse});
    }
    catch(error){
        //ErrorResponse.message = 'Something went wrong while creating city';
        //ErrorResponse.error = new AppError('Model Number not found in the onComing Req',StatusCodes.BAD_REQUEST);
        ErrorResponse.error = error;
        return  res.status(error.statusCode).json({ErrorResponse});
    }

}

async function getCities(req,res){
    try{
        const cities = await CityService.getCities();
        SuccessResponse.data = cities;
        return res.status(StatusCodes.CREATED).json({SuccessResponse});

    }
    catch(error){
        ErrorResponse.error = error;
        return  res.status(error.statusCode).json({ErrorResponse});
    }
}

async function getcityByOne(req,res){
    try{
        const city = await CityService.getSingleCity(req.params.id);
        SuccessResponse.data = city;
        return res.status(StatusCodes.CREATED).json({SuccessResponse});

    }
    catch(error){
        ErrorResponse.error = error;
        return  res.status(error.statusCode).json({ErrorResponse});
    }
}

async function deleteCity(req,res){
    try {
        const deletedcity= await CityService.deleteSingleCity(req.params.id);
        SuccessResponse.data = deletedcity;
        return res.status(StatusCodes.OK).json({SuccessResponse});
    }
    catch(error){
        ErrorResponse.error = error;
        return res.status(error.statusCode).json({ErrorResponse});
        
    }
}



async function updateCity(req, res) {
    try {
        const updatedcity = await CityService.updateCity(req.params.id, req.body);
        SuccessResponse.data = updatedcity;
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
    createCity,
    getCities,
    getcityByOne,
    deleteCity,
    updateCity
}