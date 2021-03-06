'use strict';

module.exports=(Mongoose,MongooseSchema,MongooseModel)=> {
    return new class FloorModel extends MongooseModel {
        constructor() {
            super();
            super.model = this.createModel();
        }

        createModel() {
            var FloorSchema = new MongooseSchema({
                id: Number,
                floor_name: String
            }, {
                timestamps: true,
            });
            return Mongoose.model('Floor', FloorSchema);
        }
    }
};
