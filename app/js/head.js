var aws    = require('aws-sdk');
var when   = require('when');

aws.util.isBrowser = function() { return false; };
var s3 = new aws.S3(config);
