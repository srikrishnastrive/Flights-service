const { Sequelize } = require('sequelize');

const CrudRepository = require('./crud-repository');
const { Flight, Airplane, Airport, City } = require('../models');
const db = require('../models');
const { addRowLockOnFlights } = require('./queries');



class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getAllFlights(filter, sort) {
        const response = await Flight.findAll({
            where: filter,
            order: sort,
            include : [
                {
                    model : Airplane,
                    required : true,
                    as : 'airplaneDetail'
                },
                {
                    model: Airport,
                    required : true,
                    as : 'departureAirport',
                    on : {
                        col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"),"=", Sequelize.col("departureAirport.code")),
                        //col2: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"),"=", Sequelize.col("Airport.code"))
                    },
                    include :{
                        model: City,
                        required : true
                    }
                },
                {
                    model: Airport,
                    required : true,
                    as : 'arrivalAirport',
                    on : {
                        col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"),"=", Sequelize.col("arrivalAirport.code")),
                        //col2: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"),"=", Sequelize.col("Airport.code"))
                    },
                    include : {
                        model: City,
                        required : true
                    }
                }


        ]
           
        });
        return response;
    }

    async updateRemainingSeats(flightId,seats,dec= true){
        const transaction = await db.sequelize.transaction();

        try {
            await db.sequelize.query(addRowLockOnFlights(flightId));
            //obj.decrement
            const flight = await Flight.findByPk(flightId);
            //coercisoin -- +dec ==> Number(true) ==> 1
            if(+dec){
                await flight.decrement('totalSeats',{by:seats},{transaction : transaction});
            }
            //0
            else {
                await flight.increment('totalSeats',{by:seats}, {transaction : transaction});
                
            }
            await transaction.commit();
            return flight;
        } catch (error) {
            console.log(error);
            await transaction.rollback();
            throw error;
        }
       
    }

   
}

module.exports = FlightRepository;