'use strict';
const ejson = require('mongodb-extjson');

module.exports=(Mongoose,MongooseSchema,MongooseModel)=> {
    return new class DistanceUnitModel extends MongooseModel {
        constructor() {
            super();
            super.model = this.createModel();
        }

        createModel() {
            const DistanceUnitSchema = new MongooseSchema({
                unitName:String,
                unitAlias:String
            }, {
                timestamps: true,
            });
            return Mongoose.model('DistanceUnit', DistanceUnitSchema);
        }
    }
};
