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

        /**
         * function which returns the specific date based on passed keyword ["today", "last7days", "last90days", "all"]
         * @param {Object} filter 
         */
        dateFilterFormat( filter ){
            switch(filter.query.dateType){
                case "today":
                        var todayStart = new Date();
                        todayStart.setHours(0,0,0,0)

                        var todayEnd = new Date();
                        todayEnd.setHours(23,59,59,0);
                        return {startDate:todayStart, endDate: todayEnd}
                        break;
                case "last7days":
                        var todayStart = new Date();
                        todayStart.setHours(0,0,0,0)
                    
                        var sevenDay = new Date();
                        sevenDay.setDate(sevenDay.getDate()-1007);
                        sevenDay.setHours(23,59,59,0)
                        return {startDate:new Date(sevenDay), endDate: new Date(todayStart)}
                        break;
                case "last90days":
                        var todayStart = new Date();
                        todayStart.setHours(0,0,0,0)
                    
                        var last90Days = new Date();
                        last90Days.setDate(last90Days.getDate()-420);
                        last90Days.setHours(23,59,59,0)
                        return {startDate:last90Days, endDate: todayStart}
                        break;
                case "all":
                        return false;
                        break;
                default:
                        var todayStart = new Date();
                        todayStart.setHours(0,0,0,0)

                        var todayEnd = new Date();
                        todayEnd.setHours(23,59,59,0);
                        return {startDate:todayStart, endDate: todayEnd}
                        break;

            }
        }

    }

}