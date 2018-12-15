const spurIoc = require('spur-ioc');
const spurCommon = require('spur-common');
const registerConfig = require('spur-common/registerConfig');
const path = require('path');
const spurWeb = require('spur-web');
const winston = require('winston');
const express = require('express');
const bluebird = require('bluebird');
const compression = require('compression');

module.exports = function(){
  // define a  new injector
  const ioc = spurIoc.create('blotel');
    // Register configuration
    // registerConfig(ioc, path.join(__dirname, './config'));

  //register external dependencies or globals
  ioc.registerDependencies({
    '_'           : require('lodash'),
    'http'        : require('http'),
    'path'        : path,
    'nodeProcess' : require('process'),
    'Promise'     : bluebird,
    'express'     : express,
    'winston'     : winston,
    'compression' : compression,
    'methodOverride' : require('method-override'),
    'router'      : express.Router(),
    'async'       : require('async'),
    'bodyParser'  : require('body-parser'),
    'cookieParser': require('cookie-parser'),
    'morgan'      : require('morgan'),
    'Mongoose'    : require('mongoose'),
    'MongooseSchema' : require('mongoose').Schema,
    'MongoosePaginate' : require('mongoose-paginate'),
    'errorHanlder': require('errorhandler')
  });

  registerConfig(ioc, path.join(__dirname, './config'));
  ioc.merge(spurCommon());
  ioc.merge(spurWeb());

  // register folders in your project to be auto-injected
  ioc.registerFolders(__dirname, [
    'apicontrollers',
    'services',
    'helperfunctions',
    'models',
    'runtime',
  ]);


  return ioc;
}