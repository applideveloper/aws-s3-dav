var config = require('../config/config.js');
var aws    = require('aws-sdk');

var s3 = new aws.S3(config);

s3.listBuckets({}, function(err, data) {

    console.log(arguments);

    data.Buckets.forEach(function(bucket) {
        console.log(bucket);
    });
});

s3.listObjects({"Bucket": "sugimoto"}, function(err, data) {
    data.Contents.forEach(function(object) {
        console.log(object);
    });
});
