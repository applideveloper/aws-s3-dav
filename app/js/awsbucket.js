(function(aws, global) {

    global.Bucket = Bucket;

    var bucketCache = [];

    /**
     * Constructor
     * @param AWS.S3 instance
     */
    function Bucket(bucketObject) {
        this._bucket  = bucketObject;
        this._objects = null;
    }

    /**
     * Get Bucket list
     * @access static
     * @return deferred
     */
    Bucket.getBucketList = function() {
        var deferred = when.defer(),
            buckets  = [];

        if ( bucketCache.length > 0 ) {
            deferred.resolve(bucketCahce);
        } else {
            aws.listBuckets({}, function(err, data) {
                if ( err ) {
                    deferred.reject(err);
                } else {
                    data.Buckets.forEach(function(bucket) {
                        buckets.push(new Bucket(bucket));
                    });
                    bucketCache = buckets;
                    deferred.resolve(bucketCache);
                }
            });
        }

        return deferred.promise;
    };

    /**
     * Get bucket name
     * @return string
     */
    Bucket.prototype.getName = function() {
        return this._bucket.Name || "";
    };

    /**
     * Get Objects in this bucket
     * @param String dir
     * @return Array<Item>
     */
    Bucket.prototype.getItems = function(dir) {
        var deferred = when.defer(),
            that     = this,
            name     = this.getName(),
            contents = [],
            marker   = (dir || '/').replace(/^\//, '');

        if ( this._objects ) {
            deferred.resolve(this._objects);
        } else {
            aws.listObjects({"Bucket": name, "Marker": marker}, function(err, data) {
                if ( err ) {
                    deferred.reject(err);
                } else {
                    that._objects = new ItemList(data.Contents);
                    deferred.resolve(that._objects);
                }
            });
        }

        return deferred.promise;
    };
})(s3, this);
