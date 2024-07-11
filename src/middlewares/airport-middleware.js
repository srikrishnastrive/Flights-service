const {StatusCodes} = require('http-status-codes');
const {ErrorResponse} = require('../utils/common');

function validateCreateRequest(req,res,next){
    if(!req.body.name){
        ErrorResponse.message = "Something went wrong while creating airport";
        ErrorResponse.error = "name  not found in the incoming request in the correct form";
        return res.status(StatusCodes.BAD_REQUEST).json({ErrorResponse});
    }
    if(!req.body.code){
        ErrorResponse.message = "Something went wrong while creating airport";
        ErrorResponse.error = "code  not found in the incoming request in the correct form";
        return res.status(StatusCodes.BAD_REQUEST).json({ErrorResponse});
    }
    if(!req.body.address){
        ErrorResponse.message = "Something went wrong while creating airport";
        ErrorResponse.error = "address  not found in the incoming request in the correct form";
        return res.status(StatusCodes.BAD_REQUEST).json({ErrorResponse});
    }
    if(!req.body.cityId){
        ErrorResponse.message = "Something went wrong while creating airport";
        ErrorResponse.error = "cityId not found in the incoming request in the correct form";
        return res.status(StatusCodes.BAD_REQUEST).json({ErrorResponse});
    }
    next();
}

module.exports = {
    validateCreateRequest
}