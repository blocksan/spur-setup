const spurIoc = require('spur-ioc');
const spurCommon = require('spur-common');
const registerConfig = require('spur-common/registerConfig');
const path = require('path');
const spurWeb = require('spur-web');
const winston = require('winston');
const express = require('express');

module.exports = function(){
  // define a  new injector
  const ioc = spurIoc.create('blotel');


    // Register configuration
    // registerConfig(ioc, path.join(__dirname, './config'));

  //register external dependencies or globals
  ioc.registerDependencies({
    '_'           : require('lodash'),
    'path'        : path,
    'nodeProcess' : require('process'),
    'express'     : express,
    'winston'     : winston,
    'router'      : express.Router(),
    'async'       : require('async'),
    'bodyParser'  : require('body-parser'),
    'cookieParser': require('cookie-parser'),
    'morgan'      : require('morgan'),
    'mongoose'    : require('mongoose'),
    'mongoosePaginate' : require('mongoose-paginate'),
    'errorHanlder': require('errorhandler')
  });

  registerConfig(ioc, path.join(__dirname, './config'));
  ioc.merge(spurCommon());
  ioc.merge(spurWeb());

  // register folders in your project to be auto-injected
  ioc.registerFolders(__dirname, [
    'controllers',
    'services',
    'runtime',
  ]);


  return ioc;
}