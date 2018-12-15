module.exports = (AppmainModel, ArrivalModel, FloorModel, GuestModel, HotelModel, LookupproofModel, LookuproomtypeModel, LookupstatusModel, ModesofpaymentModel, RoomModel, ShiftModel, UserModel) =>{

    return new class ApiService{
        constructor(){

        }

        getIncome(req,res){
            res.status(200).json({"message" : "api service page"})
        }

        /**
         * function to return the Appmain
         * @param {*} req 
         * @param {*} res 
         */
        async appmains(req, res){
            try{    
                let appmains = await AppmainModel.find({}).lean().exec();
                res.status(200).send(appmains);
            }catch(err){
                this.handlerError(res, err);
            }
        }

        /**
         * function to return arrival data
         * @param {*} req 
         * @param {*} res 
         */
        async arrivals(req, res){
            try{    
                let arrivals = await ArrivalModel.find({}).lean().exec();
                res.status(200).send(arrivals);
            }catch(err){
                this.handlerError(res, err);
            }
        }

        /**
         * function to return floor data
         * @param {*} req 
         * @param {*} res 
         */
        async floors(req, res){
            try{    
                let floors = FloorModel.find({}).lean().exec();
                res.status(200).send(floors);
            }catch(err){
                handlerError(res, err);
            }
        }

        /**
         * function to return hotel data
         * @param {*} req 
         * @param {*} res 
         */
        async hotels(req, res){
            try{    
                let hotels = HotelModel.find({}).lean().exec();
                res.status(200).send(hotels);
            }catch(err){
                this.handlerError(res, err);
            }
        }

        /**
         * function to return lookupproof data
         * @param {*} req 
         * @param {*} res 
         */
        async lookupproofs(req, res){
            try{    
                let lookupproofs = LookupproofModel.find({}).lean().exec();
                res.status(200).send(lookupproofs);
            }catch(err){
                this.handlerError(res, err);
            }
        }

        /**
         * function to return lookuproomtypes data
         * @param {*} req 
         * @param {*} res 
         */
        async lookuproomtypes(req, res){
            try{    
                let lookuproomtypes = LookuproomtypeModel.find({}).lean().exec();
                res.status(200).send(lookuproomtypes);
            }catch(err){
                this.handlerError(res, err);
            }
        }

        /**
         * function to return lookupstatus data
         * @param {*} req 
         * @param {*} res 
         */
        async lookupstatus(req, res){
            try{    
                let lookupstatus = LookupstatusModel.find({}).lean().exec();
                res.status(200).send(lookupstatus);
            }catch(err){
                this.handlerError(res, err);
            }
        }

        /**
         * function to return modesofpayments data
         * @param {*} req 
         * @param {*} res 
         */
        async modesofpayments(req, res){
            try{    
                let modesofpayments = ModesofpaymentModel.find({}).lean().exec();
                res.status(200).send(modesofpayments);
            }catch(err){
                this.handlerError(res, err);
            }
        }

        /**
         * function to return rooms data
         * @param {*} req 
         * @param {*} res 
         */
        async rooms(req, res){
            try{    
                let rooms = RoomModel.find({}).lean().exec();
                res.status(200).send(rooms);
            }catch(err){
                this.handlerError(res, err);
            }
        }

        /**
         * function to return shifts data
         * @param {*} req 
         * @param {*} res 
         */
        async shifts(req, res){
            try{    
                let shifts = ShiftModel.find({}).lean().exec();
                res.status(200).send(shifts);
            }catch(err){
                this.handlerError(res, err);
            }
        }


        /**
         * function to return users data
         * @param {*} req 
         * @param {*} res 
         */
        async users(req, res){
            try{    
                let users = UserModel.find({}).lean().exec();
                res.status(200).send(users);
            }catch(err){
                this.handlerError(res, err);
            }
        }


        
        handlerError(res, err){
           return res.status(400).send(err)
        }

    }

}