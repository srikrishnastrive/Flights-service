// class citieservice{
//     constructor(){

//     }
// }

const {CityRepository} = require('../repositories');
const {StatusCodes} = require('http-status-codes');
const AppError = require('../utils/Errors/app-error');

const cityRepository = new CityRepository();

async function createCity(data){
    try{
        const city = await cityRepository.create(data);
        return city;
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
        throw new AppError('cannot crate city',StatusCodes.INTERNAL_SERVER_ERROR);
    }
    

}

async function getCities(){
    try {
        const cities = await cityRepository.getAll();
        return cities;
    }
    catch(error){
        throw new AppError('cannot get  cities ',StatusCodes.INTERNAL_SERVER_ERROR);

    }
}

async function getSingleCity(id){
    try {
        const city = await cityRepository.getByOne(id);
        return city;
    }
    catch(error){
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError('The city you requested to get is not present ', error.statusCode);
        }
        throw new AppError('Cannot fetch data of all the cities',StatusCodes.INTERNAL_SERVER_ERROR);

    }
}

async function deleteSingleCity(id){
    try {
        const deletedcity = await cityRepository.destroy(id);
        return deletedcity;
    }
    catch(error){
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError('The city you requested to delete is not present', error.statusCode);
        }
        throw new AppError('Cannot fetch data of all the cities',StatusCodes.INTERNAL_SERVER_ERROR);

    }

}

async function updateCity(id, data) {
    try {
        const updatedPlane = await cityRepository.update(id, data);
        return updatedPlane;
    } catch (error) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError('The city you requested to update is not present', error.statusCode);
        }
        throw new AppError('Cannot update the city', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createCity,
    getCities,
    getSingleCity,
    deleteSingleCity,
    updateCity
}