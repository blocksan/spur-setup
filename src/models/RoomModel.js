'use strict';

module.exports=(Mongoose,MongooseSchema,MongooseModel)=> {
    return new class RoomModel extends MongooseModel {
        constructor() {
            super();
            super.model = this.createModel();
        }

        createModel() {
            var RoomSchema = new MongooseSchema({
                status: Number,
                id: Number,
                room_no: Number,
                room_display: Number,
                ROOM_TYPE: Number,
                floor_id: Number,
                hotelId: Number,
            }, {
                timestamps: true,
            });
            return Mongoose.model('Room', RoomSchema);
        }
    }
};
