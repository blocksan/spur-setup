module.exports = () =>{

    return new class ApiService{
        constructor(){

        }

        getIncome(req,res){
            res.status(200).json({"message" : "api service page"})
        }
    }

}