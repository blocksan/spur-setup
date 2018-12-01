'use strict';


module.exports=(Mongoose,MongooseSchema, MongooseModel, MongoosePaginate)=>{
return new class AppmainModel extends MongooseModel {
  constructor() {
    super()
    super.model = this.createModel();
  }
  createModel() {
    var AppmainSchema = new MongooseSchema({
      id : String,
      address : String,
      name : String,
      displayname : String
    }, {
        timestamps: true,
    });

    let indexFields = [ ];
    indexFields.forEach(function (field) {
        let fields = {};
        fields[field] = 1;
        AppmainSchema.index(fields, {background: true});
    });

    AppmainSchema.plugin(MongoosePaginate);

    return Mongoose.model('Appmain', AppmainSchema);
  }
}
}
