var request;
var activeBucket;

request = Bucket.getBucketList();
request.done(function(buckets) {
    console.log(buckets);
    var menu = document.querySelector('.buckets > ul');
    buckets.forEach(function(bucket, index) {
        var item = document.createElement('li'),
            a    = document.createElement('a');

        if ( index === 0 ) {
            item.setAttribute('class', 'active');
        }
        console.log(bucket.getName());
        
        a.appendChild(document.createTextNode(bucket.getName()));
        item.appendChild(a);
        item.setAttribute('data-bucketname', bucket.getName());
        menu.appendChild(item);
    });
});

//s3.listBuckets({}, function(err, data) {
//    console.log(data);
//});
