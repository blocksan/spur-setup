module.exports=()=> {
    return class MongooseModel {
        constructor() {
            this.model = null;
            this.collection = null;
        }

        find(conditions, projection, options) {
            return this.model.find(conditions, projection, options)
        }

        findById(id, projection, options) {
            return this.model.findById(id, projection, options)
        }

        findOne(conditions, projection, options) {
            return this.model.findOne(conditions, projection, options)
        }

        findOneAndUpdate(conditions, update, options) {
            return this.model.findOneAndUpdate(conditions, update, options)
        }

        findOneAndUpdateUpsert(conditions, update, options) {
            if (options) {
                options['upsert'] = true;
            }
            else {
                options = {upsert: true}
            }
            return this.model.findOneAndUpdate(conditions, update, options)
        }

        insertMany(entities) {
            return this.model.insertMany(entities)
        }

        remove(conditions) {
            return this.model.remove(conditions);
        }

        distinct(conditions){
            return this.model.distinct(conditions);
        }

        createOne(entity) {
            return this.model.create(entity);
        }

        saveOne(entity) {
            return entity.save();
        }

        update(conditions, doc, options) {
            return this.model.update(conditions, doc, options);
        }

        updateOrInsert(conditions, doc, options) {
            if (options) {
                options['upsert'] = true;
            }
            else {
                options = {upsert: true}
            }
            return this.model.update(conditions, doc, options);
        }

        populate(docs, paths) {
            return this.model.populate(docs, paths);
        }

        aggregate(params) {
            return this.model.aggregate(params);
        }

        mapReduce(object) {
            return this.model.mapReduce(object);
        }

        getBulkOrderedObject() {
            return this.model.collection.initializeOrderedBulkOp();
        }

        getBulkUnorderedObject() {
            return this.model.collection.initializeUnorderedBulkOp();
        }

        bulkFindAndUpdate(bulkObject, findParam, updateParam, updateOptions) {
            return bulkObject.find(findParam).update(updateParam, updateOptions);
        }

        bulkFindAndUpsert(bulkObject, findParam, updateParam, updateOptions) {
            return bulkObject.find(findParam).upsert().update(updateParam, updateOptions);
        }

        bulkFindAndRemove(bulkObject, findParam) {
            return bulkObject.find(findParam).remove();
        }

        bulkInsert(bulkObject, params) {
            return bulkObject.insert(params)
        }

        bulkRemove(bulkObject, params) {
            return bulkObject.remove(params)
        }

        bulkExecute(bulkObject) {
            return bulkObject.execute()
        }

        increment(name) {
            return this.model.collection.findAndModify({name: name}, [], {$inc: {count: 1}}, {new: true, upsert: true});
        }
        paginate(param1, param2) {
            return this.model.paginate(param1, param2);
        }
        count(conditions) {
            return this.model.count(conditions);
        }

    }
};
