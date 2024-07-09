const { where } = require('sequelize');
const {Logger} = require('../config');
const AppError = require('../utils/Errors/app-error');
const { StatusCodes } = require('http-status-codes');



class CrudRepository {
    constructor(model){
        this.model = model;
    }

    async create(data){
        const response = await this.model.create(data);
        return response;
    }

    async destroy(data){
            const response = await this.model.destroy({
                where : {
                    id: data
                }
            });
            if(!response){
                throw new AppError("Not able to find the resource",StatusCodes.NOT_FOUND)
            }
            return response
    }

    async getAll(){
        const response = await this.model.findAll();
        if(!response){
            throw new AppError("Not able to find the resource",StatusCodes.NOT_FOUND)
        }
        return response;
        
    }

    async getByOne(id){
        const response = await this.model.findByPk(id);
        if(!response){
            throw new AppError("Not able to find the resource",StatusCodes.NOT_FOUND)
        }
        return response;
    }

    async update(id, data) {
        const [updatedRowsCount, updatedRows] = await this.model.update(data, {
            where: { id },
            returning: true,
            plain: true
        });

        if (updatedRowsCount === 0) {
            throw new AppError("Not able to find the resource", StatusCodes.NOT_FOUND);
        }

        return updatedRows;
    }
}

module.exports = CrudRepository;