'use strict';

module.exports=(Mongoose,MongooseSchema,MongooseModel)=> {
    return new class LookuproomtypeModel extends MongooseModel {
        constructor() {
            super();
            super.model = this.createModel();
        }

        createModel() {
            var LookuproomtypeSchema = new MongooseSchema({
                Id: Number,
                description: String,
                code: String
            }, {
                timestamps: true,
            });
            return Mongoose.model('Lookuproomtype', LookuproomtypeSchema);
        }
    }
};
