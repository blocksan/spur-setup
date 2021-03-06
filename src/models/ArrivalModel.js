'use strict';
const ejson = require('mongodb-extjson');

module.exports=(Mongoose,MongooseSchema,MongooseModel)=> {
    return new class ArrivalModel extends MongooseModel {
        constructor() {
            super();
            super.model = this.createModel();
        }

        createModel() {
            var ArrivalSchema = new MongooseSchema({
                CheckoutDate: Date,
                GuestId: Number,
                GuestRemarks: String,
                RoomCharge: Number,
                RoomId: Number,
                creation_date: Date,
                balance: Number,
                misc: Number,
                deposit: Number,
                RoomRate: Number,
                CheckInDate: Date,
                CGST: Number,
                NumberofGuests: Number,
                SGST: Number,
                CVV: Number,
                taxExemption: Number,
                oldroom: Number,
                expiredate: Number,
                ModeofPaymentId: Number,
                transferredroom: String,
                NumberofDays: Number,
                cardnumber: Number
            }, {
                timestamps: true,
            });
            ArrivalSchema.pre('aggregate', function () {
                let pipeline = this.pipeline();
                pipeline.forEach(stage => {
                  let topLevelKey = Object.keys(stage)[0];
                  let json = ejson.stringify(stage[topLevelKey]);
                  stage[topLevelKey] = ejson.parse(json);
                });
              });
            return Mongoose.model('Arrival', ArrivalSchema);
        }
    }
};
