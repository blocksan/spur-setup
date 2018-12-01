const path              = require("path");

global.chai             = require('chai');
global.sinon            = require('sinon');
global.nock             = require('nock');
global.expect           = global.chai.expect;
global.assert           = global.chai.assert;
require('sinon-mongoose');

global.srcDir           = path.resolve(__dirname, "../src");
global.injector         = require('./injector.js');

global.chai.use(require('sinon-chai'));
process.setMaxListeners(1000);
