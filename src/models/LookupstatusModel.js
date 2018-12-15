'use strict';

module.exports=(Mongoose,MongooseSchema,MongooseModel)=> {
    return new class LookupstatusModel extends MongooseModel {
        constructor() {
            super();
            super.model = this.createModel();
        }

        createModel() {
            var LookupstatusSchema = new MongooseSchema({
                Id: Number,
                description: String,
                name: String
            }, {
                timestamps: true,
            });
            return Mongoose.model('Lookupstatus', LookupstatusSchema);
        }
    }
};
