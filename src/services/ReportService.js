'use strict';

module.exports = (_, AppmainModel) => {
    return new class ReportService {

        constructor() {

        }

        async getTestAppMain(req, res) {
            try {
                let result = await AppmainModel.find({})
                res.status(200).send({ status : true, data: result })
            } catch (err) {
                res.status(400).send({status: false, error: err.message})
            }
        }
    }
}