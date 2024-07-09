// class AirplaneService{
//     constructor(){

//     }
// }

const {AirplaneRepository} = require('../repositories');
const {StatusCodes} = require('http-status-codes');
const AppError = require('../utils/Errors/app-error');

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data){
    try{
        const airplane = await airplaneRepository.create(data);
        return airplane;
    }
    catch(error){
        console.log(error);
        if(error.name == "SequelizeValidationError"){
            let explanation = [];
            error.errors.forEach((err)=>{
                explanation.push(err.message)
            })
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('cannot fetch data of all the airplanes ',StatusCodes.INTERNAL_SERVER_ERROR);
    }
    

}

async function getAirplanes(){
    try {
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
    }
    catch(error){
        throw new AppError('cannot get  Airplanes ',StatusCodes.INTERNAL_SERVER_ERROR);

    }
}

async function getSingleAirplane(id){
    try {
        const airplane = await airplaneRepository.getByOne(id);
        return airplane;
    }
    catch(error){
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError('The airplane you requested to get is not present ', error.statusCode);
        }
        throw new AppError('Cannot fetch data of all the airplanes',StatusCodes.INTERNAL_SERVER_ERROR);

    }
}

async function deleteSinglePlane(id){
    try {
        const deletedAirPlane = await airplaneRepository.destroy(id);
        return deletedAirPlane;
    }
    catch(error){
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError('The airplane you requested to delete is not present', error.statusCode);
        }
        throw new AppError('Cannot fetch data of all the airplanes',StatusCodes.INTERNAL_SERVER_ERROR);

    }

}

async function updateAirplane(id, data) {
    try {
        const updatedPlane = await airplaneRepository.update(id, data);
        return updatedPlane;
    } catch (error) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError('The airplane you requested to update is not present', error.statusCode);
        }
        throw new AppError('Cannot update the airplane', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getSingleAirplane,
    deleteSinglePlane,
    updateAirplane
}