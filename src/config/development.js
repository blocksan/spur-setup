'use strict';

// Development specific configuration
// ==================================
var ip= 'localhost',
    port= '27017',
    uname = '',
    pwd = '',
    db = 'test';
module.exports = function(){
    this.extends('default');
    return this.properties({
        // MongoDB connection options
        mongo: {
            ip: ip,
            port: port,
            uname: uname,
            pwd: pwd,
            db : db,
            uri: 'mongodb://' + ip + '/'+ db
        //  uri: 'mongodb://'+uname+':'+pwd+'@'+ ip + '/'+ db
        },

        host:'localhost',
        domain:'http://localhost:9000',
        
        Port : 9000,
        relativeUploadsPath: '../uploads',
    });
}