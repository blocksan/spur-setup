'use strict';

module.exports=(Mongoose,MongooseSchema,MongooseModel)=> {
    return new class LookupproofModel extends MongooseModel {
        constructor() {
            super();
            super.model = this.createModel();
        }

        createModel() {
            var LookupproofSchema = new MongooseSchema({
                Id: Number,
                description: String,
                code: String
            }, {
                timestamps: true,
            });
            return Mongoose.model('Lookupproof', LookupproofSchema);
        }
    }
};
