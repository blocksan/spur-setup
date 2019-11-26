'use strict';
const ejson = require('mongodb-extjson');

module.exports=(Mongoose, MongooseSchema, MongooseModel)=> {
    return new class AttendanceHistoryModel extends MongooseModel {
        constructor() {
            super();
            super.model = this.createModel();
        }

        createModel() {
            const AttendanceHistorySchema = new MongooseSchema({
                userId: {type: MongooseSchema.Types.ObjectId, ref: 'User'},
                checkInDate: Date,
                status:{
                    type: Enum
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
            let indexFields = [ ];
            indexFields.forEach(function (field) {
                let fields = {};
                fields[field] = 1;
                AppmainSchema.index(fields, {background: true});
            });
        
            AppmainSchema.plugin(MongoosePaginate);
            return Mongoose.model('AttendanceHistory', AttendanceHistorySchema);
        }
    }
};
