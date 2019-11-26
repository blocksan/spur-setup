'use strict';
let self;
module.exports = (_, AttendanceModel,UserModel, RadiusConfigModel, DistanceCalculator, ipInfo) => {
    return new class AttendanceService {

        constructor() {
            self = this;
        }
        
        /**
         * handles the check-in for the user
         * @param {*} req 
         * @param {*} res 
         */
        async checkIn(req, res){
            try{
                const userId = req.user._id
                //dubai
                const lat1 = 25.0657
                const long1 = 55.1713
                //hds center
                const lat2 = 25.064425
                const long2 = 55.138040
                const user = await UserModel.find({_id:userId},{userCode:1, userOrg:1, organizationId:1});
                if(!user){
                    throw new Error("user not found")
                }
                const organizationId = Mongoose.ObjectId("5ddbe6bd9a46f8c26be5f58a");
                const radiusConfig = await RadiusConfigModel.find({organizationId}).populate({ path: 'organizationId', select: 'unitName unitAlias' }).lean().exec()
                if(!radiusConfig){
                    throw new Error("radius configuration not found")
                }
                const result = DistanceCalculator.getDistance(lat1, long1, lat2, long2,radiusConfig.organizationId.unitAlias );

                if(result >= radiusConfig.allowedRadius){
                    //can check in
                }else{
                    throw new Error("Please be in range of the location defined by the admin")
                }

                res.status(200).send({result});
            }catch(err){
                return self.handlerError(res, err);
            }
        }

        /**
         * handles the check-out for the user
         * @param {*} req 
         * @param {*} res 
         */
        checkOut(req, res){

        }

        /**
         * returns the check-in status for the user
         * @param {*} req 
         * @param {*} res 
         */
        checkInStatus(req, res){

        }

        /**
         * returns the list of attendance for the user
         * @param {*} req 
         * @param {*} res 
         */
        getAttendanceList(req, res){

        }

        /**
         * returns the history detail
         * @param {*} req 
         * @param {*} res 
         */
        attendanceHistoryDetail(req, res){

        }

        /**
         * common utility function which handles the api level error
         * @param {*} res 
         * @param {*} err 
         */
        handlerError(res, err){
            console.log(err)
            return res.status(400).send({
                status: false, 
                error:{
                message:err
            }})
        }
    }
}