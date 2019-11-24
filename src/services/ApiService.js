module.exports = (AppmainModel,UserModel) =>{

    return new class ApiService{
        constructor(){

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
                
        handlerError(res, err){
           return res.status(400).send(err)
        }

    }

}