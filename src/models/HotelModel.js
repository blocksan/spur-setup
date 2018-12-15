'use strict';

module.exports=(Mongoose,MongooseSchema,MongooseModel)=> {
    return new class HotelModel extends MongooseModel {
        constructor() {
            super();
            super.model = this.createModel();
        }

        createModel() {
            var HotelSchema = new MongooseSchema({
                hotelName: String,
                hotelId: Number,
                user: String
            }, {
                timestamps: true,
            });
            return Mongoose.model('Hotel', HotelSchema);
        }
    }
};
