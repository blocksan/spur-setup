'use strict';
const ejson = require('mongodb-extjson');

module.exports=(Mongoose,MongooseSchema,MongooseModel)=> {
    return new class ArrivalModel extends MongooseModel {
        constructor() {
            super();
            super.model = this.createModel();
        }

        createModel() {
            const AttendanceSchema = new MongooseSchema({
                userId: {type: MongooseSchema.Types.ObjectId, ref: 'User'},
                checkInDate: Date,
                status:{
                    type: String
                },
                timestamp: Date,
                totalTime: String,
                overTime: String,
                actionBy: {type:MongooseSchema.Types.ObjectId, ref:'User'},
                todaysLog:{
                    lastCheckedIn: Date,
                    lastCheckedOut: Date
                },
                locationEnabled:{
                    enabled: Boolean,
                    comment: String
                }
            }, {
                timestamps: true,
            });
            return Mongoose.model('Attendance', AttendanceSchema);
        }
    }
};
