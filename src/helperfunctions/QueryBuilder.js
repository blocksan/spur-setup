module.exports = () =>{

    return new class QueryBuilder{
        constructor(){

        }

        /**
         * function which returns the mongo query based on filter passed
         * @param {Object} filter 
         * @return {Object} query
         */
        getReportFilterQuery( filter ){
            try{
                if(filter){

                }else{
                    return {}
                }
            }catch(err){
                throw err
            }
        }
    }

}