'use strict';

module.exports = (_, AppmainModel, HotelModel, ArrivalModel, LookupstatusModel, RoomModel, QueryBuilder, UserModel) => {
    return new class ReportService {

        constructor() {

        }

        async getTestAppMain(req, res) {
            try {
                let result = await AppmainModel.find({})
                res.status(200).send({ status : true, data: result })
            } catch (err) {
                res.status(400).send({status: false, error: err.message})
            }
        }

        /**
         * function which returns all the hotels with room occupied and can be of a user if present userId
         * @param {Object} req 
         * @param {Object} res 
         * @return hotels
         */

        async getAllHotels(req, res) {
            try {

            } catch (err) {
                return err
            }
        }

        /**
         * function to send the filter options for the user i.e hotel list and room number list -- add 'all' in the room list as well at frontend 
         * and delete the 'RoomNo' key from the url query if 'all' is selected
         * @param {Object} req 
         * @param {Object} res 
         * @returns {Array} rooms
         */
        async filterForUser(req, res){
            try{
                
                if(req.query.hotelId){
                    let rooms = await RoomModel.find({hotelId : parseInt(req.query.hotelId)}).lean().exec()
                    if(rooms.length){
                        rooms.push({"room_display": "All", room_no: null, _id : null })
                        let formattedObj = {
                            "rooms" : rooms,
                            "dates" : [ { label: "Today", key : "today" }, { label : "Last 7 days", key: "last7days"}, { label : "Last 90 days", key : "last90days" }, {label : "All", key : "all"}]
                        }
                        return res.status(200).send({status:true, data: formattedObj });
                    }else{
                        throw Error("No Room found for the user")
                    }
                }
                throw new Error("Error in fetching the filter list")
                
            }catch(err){
                return res.status(400).send({ status : false, error : err.message })
            }
        }

        


        /**
         * function to return hotels of user with their data
         * @param {Object} req 
         * @param {Object} res 
         * @returns {Array} result
         */
        async getHotelsByUser(req, res) {
            try {
                let userId;
                if (req.user.username) {
                    try{
                        let user = await UserModel.findOne({username:req.user.username}).lean().exec()
                        userId = user.id
                    }catch(err){
                        throw Error("user not found")
                    }
                }else{
                    throw Error("user not found")
                }

                //dummy query
                // var hotelIds = [1];
                // db.getCollection('rooms').aggregate([{
                //         $match: {
                //             hotelId: {
                //                 $in: hotelIds
                //             }
                //         }
                //     },
                //     {
                //         $group: {
                //             '_id': {
                //                 'hotel': '$hotelId',
                //                 'status': '$status'
                //             },
                //             'status': {
                //                 $sum: 1
                //             }
                //         }
                //     },
                //     {
                //         $project: {
                //             'hotelId': '$_id.hotel',
                //             'status': '$_id.status',
                //             'statusCount': '$status',
                //             'hotel': 1
                //         }

                //     }
                // ])

                let hotels = await HotelModel.find({
                    user: userId
                }).lean().exec();
                let result = []
                if (hotels) {
                    let hotelIds = hotels.map((hotel) => hotel.hotelId)
                    let aggregate = [];
                    let match = {
                        $match: {
                            $and: [
                                {
                                    hotelId: {
                                        $in: hotelIds
                                    }
                                }]      
                        }
                    }
                   
                    let group = {
                        $group: {
                            '_id': {
                                'hotel': '$hotelId',
                                'status': '$status'
                            },
                            'status': {
                                $sum: 1
                            }
                        }
                    }
                    let project = {
                        $project: {
                            'hotelId': '$_id.hotel',
                            'status': '$_id.status',
                            'statusCount': '$status',
                            'hotel': 1
                        }
                    }
                    aggregate.push(match);
                    aggregate.push(group);
                    aggregate.push(project);

                    let rooms = await RoomModel.aggregate(aggregate);
                    let statuses = await LookupstatusModel.find({}).lean().exec();
                    _.forEach(rooms, (room) => {
                        let resultObj = {
                            "Vacant": 0,
                            "Rented": 0,
                            "Dirty": 0,
                            "Repair": 0,
                            "total": 0,
                            "user": userId
                        }
                        let resultIndex = _.findIndex(result, {
                            hotelId: room.hotelId
                        })
                        let statusIndex = _.findIndex(statuses, {
                            Id: room.status
                        })
                        if (resultIndex < 0) {
                            let hotelIndex = _.findIndex(hotels, {
                                hotelId: room.hotelId
                            })
                            resultObj['hotelName'] = hotels[hotelIndex].hotelName
                            resultObj['hotelId'] = room.hotelId
                            resultObj[statuses[statusIndex].name] = room.statusCount
                            resultObj['total'] += room.statusCount
                            result.push(resultObj)
                        } else {
                            result[resultIndex]["total"] += room.statusCount
                            result[resultIndex][statuses[statusIndex].name] = room.statusCount
                        }
                        
                    })
                    res.status(200).send({status: true , data : result })
                }

            } catch (err) {
                console.log('Error in querying for the hotels for the user ', err)
                res.status(400).send({status: false, error: err.message})
            }
        }

        /**
         * function which returns rooms and can also return the rooms of a user if present
         * @param {Object} req 
         * @param {Object} res 
         * @return rooms
         */
        async getAllRooms(req, res) {
            try {

            } catch (err) {

            }
        }


        /**
         * function to give the counts of occupied rooms in a given time range -- no room filter in ui
         * @param {Object} req 
         * @param {Object} res 
         */
        async hotelWithFilledStatus(req, res) {
            try {
                // req.query.today = "today"
                
                let queryParam = {}
                if(req.query.dateType=="custom" || !req.query.dateType){
                    queryParam['startDate'] = new Date(req.query.startDate)
                    queryParam['endDate'] = new Date(req.query.endDate)
                }else{
                    let dateQuery = QueryBuilder.dateFilterFormat(req);
                    if(dateQuery){
                        queryParam['startDate'] = dateQuery.startDate
                        queryParam['endDate'] = dateQuery.endDate
                    }
                }

                queryParam['hotelId'] = parseInt(req.query.hotelId)
                
                let query = ReportService.reportQuery(queryParam);

                let result = await ArrivalModel.aggregate(query);
                let extraInfo = {
                    totalFilledRooms:0
                };
                if(result.length){
                    result.forEach( (d) => {
                        extraInfo.totalFilledRooms += d.count
                    })
                }

                res.status(200).send({ status : true, data :{data:result , extraInfo:extraInfo} })
            } catch (err) {
                console.log('Error in getting room count ', err)
                res.status(400).send({ status: false, error: err.message })
            }
        }

        /**
         * function which returns the room charge (income) reports of a user (manager)
         * @param {Object} req 
         * @param {Object} res 
         * @return normalReport
         */
        async incomeReports(req, res) {
            try {
                // req.query.today = "today"
                
                let queryParam = {}
                if(req.query.dateType=="custom" || !req.query.dateType){
                    queryParam['startDate'] = new Date(req.query.startDate)
                    queryParam['endDate'] = new Date(req.query.endDate)
                }else{
                    let dateQuery = QueryBuilder.dateFilterFormat(req);
                    if(dateQuery){
                        queryParam['startDate'] = dateQuery.startDate
                        queryParam['endDate'] = dateQuery.endDate
                    }
                }

                if(req.query.roomNo){
                    queryParam['roomNo'] = req.query.roomNo
                }
                queryParam['hotelId'] = parseInt(req.query.hotelId)

                let query = ReportService.reportQuery(queryParam);

                let result = await ArrivalModel.aggregate(query);
                
                let extraInfo = {
                    totalIncome : 0
                };
                if(result.length){
                    result.forEach( (d) => {
                        extraInfo.totalIncome += d.RoomCharge
                    })
                }

                res.status(200).send({ status: true, data: {data:result , extraInfo:extraInfo} })
            } catch (err) {
                console.log('Error in getting normal reports ', err)
                res.status(400).send({status: false, error : err.message})
            }
        }

        /**
         * function which returns the tax reports of a user (manager)
         * @param {Object} req 
         * @param {Object} res 
         * @return incomeReport
         */
        async taxReports(req, res) {
            try {
                // req.query.today = "today"
                
                let queryParam = {}
                if(req.query.dateType=="custom" || !req.query.dateType){
                    queryParam['startDate'] = new Date(req.query.startDate)
                    queryParam['endDate'] = new Date(req.query.endDate)
                }else{
                    let dateQuery = QueryBuilder.dateFilterFormat(req);
                    if(dateQuery){
                        queryParam['startDate'] = dateQuery.startDate
                        queryParam['endDate'] = dateQuery.endDate
                    }
                }

                if(req.query.roomNo){
                    queryParam['roomNo'] = req.query.roomNo
                }
                queryParam['hotelId'] = parseInt(req.query.hotelId)
                
                let query = ReportService.reportQuery(queryParam);

                let result = await ArrivalModel.aggregate(query);
                let extraInfo = {
                    CentralGST : 0,
                    StateGST : 0,
                    CSTGST:0
                };
                if(result.length){
                    result.forEach( (d) => {
                        extraInfo.CentralGST +=d.CentralGST
                        extraInfo.StateGST += d.StateGST
                        extraInfo.CSTGST += d.CSTGST
                    })
                }

                res.status(200).send({ status : true, data : {data:result , extraInfo:extraInfo}})
            } catch (err) {
                console.log('Error in getting normal reports ', err)
                res.status(400).send({ status: false, error: err.message})
            }

        }

        static reportQuery(param) {
            let aggregate = []
            let lookup = {
                $lookup: {
                    from: "rooms",
                    localField: "RoomId",
                    foreignField: "id",
                    as: "room"
                }
            }
            let unwind = {
                $unwind: {
                    path: "$room"
                }
            }
            let projectionFirst = {
                $project: {
                    'RoomNumber': '$room.room_no',
                    "Hotel": '$room.hotelId',
                    creation_date: 1,
                    taxExemption: 1,
                    CGST: 1,
                    SGST: 1,
                    RoomId: 1,
                    RoomCharge: 1,
                    deposit: 1,
                    CheckInDate: 1,
                    misc: 1,
                }
            }
            let match= {
                $match: {
                    $and: []
                }
            }
            let CheckInDate = {
                CheckInDate: {
                    $gt: param.startDate ? param.startDate: new Date(),
                    $lt: param.endDate ? param.endDate : new Date(),
                }
            }
            let hotel = {
                "Hotel": parseInt(param.hotelId)
            }
            
            if(param.startDate){
                match.$match.$and.push(CheckInDate)
            }
            if(param.roomNo){
                let room = {
                    'RoomNumber' : {
                        $in : [parseInt(param.roomNo)]
                    }
                }
                match.$match.$and.push(room)
            }
            match.$match.$and.push(hotel)

            let gId = {
                "CheckInDate": "$CheckInDate"
            };
            if(param.roomNo){
                gId["RoomNumber"]= "$RoomNumber"
            }

            let  group = {
                $group: {
                    _id:gId,
                    count: {
                        $sum: 1
                    },
                    'CentralGST': {
                        $sum: "$CGST"
                    },
                    'StateGST': {
                        $sum: '$SGST'
                    },
                    'RoomCharge': {
                        $sum: '$RoomCharge'
                    },
                    'CSTGST': {
                        $sum: {
                            $add: ["$CGST", "$SGST"]
                        }
                    },
                }
            }

            let addField = {
                $addFields: {
                    RoomRevenue: {
                        $subtract: ["$CGSTSGSTSum", "$TaxExemption"]
                    }
                }
            }

            let projectSecond = {
                $project: {
                    'RoomNumber': '$_id.RoomNumber',
                    "CheckInDate": '$_id.CheckInDate',
                    count: 1,
                    RoomRevenue: 1,
                    TaxExemption: 1,
                    CSTGST: 1,
                    CGSTSGSTSum: 1,
                    CentralGST: 1,
                    StateGST: 1,
                    RoomCharge: 1,
                    Deposits: 1,
                    misc: 1
                }
            }

            aggregate.push(lookup)
            aggregate.push(unwind)
            aggregate.push(projectionFirst)
            aggregate.push(match)
            aggregate.push(group)
            aggregate.push(addField)
            aggregate.push(projectSecond)

            return aggregate

        }
    }
}