'use strict';

module.exports=(Mongoose,MongooseSchema,MongooseModel)=> {
    return new class ModesofpaymentModel extends MongooseModel {
        constructor() {
            super();
            super.model = this.createModel();
        }

        createModel() {
            var ModesofpaymentSchema = new MongooseSchema({
                id: Number,
                description: String,
                code: String
            }, {
                timestamps: true,
            });
            return Mongoose.model('Modesofpayment', ModesofpaymentSchema);
        }
    }
};
