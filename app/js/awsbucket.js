(function(global) {

    global.Bucket = Bucket;

    /**
     * Constructor
     * @param AWS.S3 instance
     */
    function Bucket(aws) {
        this.aws = aws;
        this.bucketCahce = [];
        this.objectCache = {};
    }

    /**
     * Get Bucket list
     * @return deferred
     */
    Bucket.prototype.getList = function() {
        var deferred = when.defer(),
            that     = this;

        if ( this.bucketCache.length > 0 ) {
            deferred.resolve(this.bucketCahce);
        } else {
            this.aws.listBuckets({}, function(err, data) {
                if ( err ) {
                    deferred.reject(err);
                } else {
                    that.bucketCahce = data.Buckets;
                    deferred.resolve(data.Buckets);
                }
            });
        }

        return deferred;
    };

    Bucket.prototype.getItems = function(bucketName) {
        var deferred = when.defer(),
            that     = this,
            contents = [];

        if ( bucketName in this.objectCache ) {
            deferred.resolve(this.objectCache[bucketName]);
        } else {
            this.aws.listObjects({"Bucket": buckketName}, function(err, data) {
                if ( err ) {
                    deferred.reject(err);
                } else {
                    data.Contents.forEach(function(obj) {
                        contents.push(new Item(obj));
                    });
                    that.objectCache[bucketName] = contents;
                    deferred.resolve(contents);
                }
            });
        }

        return deferred;
    };
})(this);
