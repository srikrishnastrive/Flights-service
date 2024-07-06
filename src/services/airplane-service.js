// class AirplaneService{
//     constructor(){

//     }
// }

const {AirplaneRepository} = require('../repositories');

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data){
    try{
        const airplane = await airplaneRepository.creat(data);
        return airplane;
    }
    catch(error){
        throw error;
    }
    

}

module.exports = {
    createAirplane
}