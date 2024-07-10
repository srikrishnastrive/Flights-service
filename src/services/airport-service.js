// class AirplaneService{
//     constructor(){

//     }
// }

const {AirportRepository} = require('../repositories');
const {StatusCodes} = require('http-status-codes');
const AppError = require('../utils/Errors/app-error');

const airportRepository = new AirportRepository();

async function createAirport(data){
    try{
        const airport = await airportRepository.create(data);
        return airport;
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
        throw new AppError('cannot fetch data of all the airports ',StatusCodes.INTERNAL_SERVER_ERROR);
    }
    

}

async function getAirports(){
    try {
        const airports = await airportRepository.getAll();
        return airports;
    }
    catch(error){
        throw new AppError('cannot get  Airplanes ',StatusCodes.INTERNAL_SERVER_ERROR);

    }
}

async function getSingleAirport(id){
    try {
        const airport = await airportRepository.getByOne(id);
        return airport;
    }
    catch(error){
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError('The airport you requested to get is not present ', error.statusCode);
        }
        throw new AppError('Cannot fetch data of all the airports',StatusCodes.INTERNAL_SERVER_ERROR);

    }
}

async function deleteSingleAirport(id){
    try {
        const deletedAirport = await airportRepository.destroy(id);
        return deletedAirport;
    }
    catch(error){
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError('The airport you requested to delete is not present', error.statusCode);
        }
        throw new AppError('Cannot fetch data of all the airports',StatusCodes.INTERNAL_SERVER_ERROR);

    }

}

async function updateAirport(id, data) {
    try {
        const updatedAirport = await airportRepository.update(id, data);
        return updatedAirport;
    } catch (error) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError('The airport you requested to update is not present', error.statusCode);
        }
        throw new AppError('Cannot update the airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getSingleAirplane,
    deleteSinglePlane,
    updateAirplane
}