'use strict';

module.exports=(Mongoose,MongooseSchema,MongooseModel)=> {
    return new class ShiftModel extends MongooseModel {
        constructor() {
            super();
            super.model = this.createModel();
        }

        createModel() {
            var ShiftSchema = new MongooseSchema({
                userid: String,
                shiftname: String,
                logindate: Date,
                logoutdate: Date
            }, {
                timestamps: true,
            });
            return Mongoose.model('Shift', ShiftSchema);
        }
    }
};
