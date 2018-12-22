'use strict';

// Development specific configuration
// ==================================
// var ip= 'localhost';
var ip = '208.68.39.149',
    port= '27017',
    uname = '',
    pwd = '',
    db = 'HMS';
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