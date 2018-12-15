'use strict';

module.exports = (AppmainModel, QueryBuilder) => {
    return new class ReportService{
        
        constructor(){
            
        }
        
        async getTestAppMain(req, res){
            try{
                let result = await AppmainModel.find({})
                res.status(200).send(result)
            }catch(err){
                res.status(400).send(err)
            }
        }

        /**
         * function which returns all the hotels with room occupied and can be of a user if present userId
         * @param {Object} req 
         * @param {Object} res 
         * @return hotels
         */

        async getAllHotels(req, res){
            try{

            }catch(err){
                return err
            }
        }

        /**
         * function returns the hotels of a user with room occupied
         * @param {Number} userId 
         * @return hotels
         */
        async getHotelsUser( userId ){
            try{

            }catch(err){
                throw err;
            }
        }

        /**
         * function which returns rooms and can also return the rooms of a user if present
         * @param {Object} req 
         * @param {Object} res 
         * @return rooms
         */
        async getAllRooms(req, res){
            try{

            }catch(err){

            }
        }


        async hotelWithFilledStatus(req, res){
            try{

            }catch(err){

            }
        }

        /**
         * function which returns the normal reports of a user (manager)
         * @param {Object} req 
         * @param {Object} res 
         * @return normalReport
         */
        async normalReports(req, res){
            try{
                let query = QueryBuilder.getReportFilterQuery();
                

            }catch(err){

            }
        }

        /**
         * function which returns the income reports of a user (manager)
         * @param {Object} req 
         * @param {Object} res 
         * @return incomeReport
         */
        async incomeReports(req, res){
            try{

            }catch(err){

            }
        }

        /**
         * function which returns the tax reports of a user (manager)
         * @param {Object} req 
         * @param {Object} res 
         * @return taxReport
         */
        async taxReports(req, res){
            try{

            }catch(err){

            }
        }

    }
}