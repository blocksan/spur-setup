'use strict';

module.exports=(Mongoose,MongooseSchema,MongooseModel)=> {
    return new class UserModel extends MongooseModel {
        constructor() {
            super();
            super.model = this.createModel();
        }

        createModel() {
            var UserSchema = new MongooseSchema({
                username: String,
                id: Number,
                password: String,
                RoleId: String,
                fullname: String
            }, {
                timestamps: true,
            });
            return Mongoose.model('User', UserSchema);
        }
    }
};
