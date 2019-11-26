'use strict';
const ejson = require('mongodb-extjson');

module.exports=(Mongoose,MongooseSchema,MongooseModel)=> {
    return new class OrganizationModel extends MongooseModel {
        constructor() {
            super();
            super.model = this.createModel();
        }

        createModel() {
            const OrganizationSchema = new MongooseSchema({
                orgName: String,
                orgCode: String
            }, {
                timestamps: true,
            });
            return Mongoose.model('Organization', OrganizationSchema);
        }
    }
};
