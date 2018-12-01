const spur           = require("spur-ioc");
const localInjector  = require("../../src/injector");

const Mongoose = require('mongoose').Mongoose;

module.exports = function () {
    const ioc = spur.create("spurtest");

    const mongoose = new Mongoose();

    ioc.merge(localInjector());
    ioc.registerDependencies({
        'Mongoose' : mongoose
    });
    return ioc;
};
