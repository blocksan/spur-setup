'use strict';

module.exports = (AppmainModel) => {
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

    }
}