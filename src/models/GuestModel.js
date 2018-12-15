'use strict';

module.exports=(Mongoose,MongooseSchema,MongooseModel)=> {
    return new class GuestModel extends MongooseModel {
        constructor() {
            super();
            super.model = this.createModel();
        }

        createModel() {
            var GuestSchema = new MongooseSchema({
                state: String,
                CarModel: String,
                DateOfBirth: Date,
                Id: Number,
                purposeofvisit: String,
                IdProofId: Number,
                phonenumber: Number,
                IdProofNumber: String,
                company: String, 
                FullName: String,
                zipcode: Number,
                MoreIds: String,
                Address: String,
                RTGNum: String,
                city: String,
                emailid: String,
                gender: String
            }, {
                timestamps: true,
            });
            return Mongoose.model('Guest', GuestSchema);
        }
    }
};
