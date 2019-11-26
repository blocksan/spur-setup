'use strict';
const ejson = require('mongodb-extjson');

module.exports=(Mongoose,MongooseSchema,MongooseModel)=> {
    return new class RadiusConfigModel extends MongooseModel {
        constructor() {
            super();
            super.model = this.createModel();
        }

        createModel() {
            const RadiusConfigSchema = new MongooseSchema({
                latitude: String,
                longitude:String,
                allowedRadius: Number,
                organizationId: {type:MongooseSchema.Types.ObjectId, ref:'Organization'},
                distanceUnitId: {type:MongooseSchema.Types.ObjectId, ref:'DistanceUnit'},
                actionBy: {type:MongooseSchema.Types.ObjectId, ref:'User'}
            }, {
                timestamps: true,
            });
            return Mongoose.model('RadiusConfig', RadiusConfigSchema);
        }
    }
};
