var request;
var activeBucket;

Layer.show(true, 'Bucket情報を取得中...');

request = Bucket.getBucketList();
request.done(function(buckets) {
    var menu = document.querySelector('.buckets > ul');

    buckets.forEach(function(bucket, index) {
        var item = document.createElement('li'),
            a    = document.createElement('a');

        if ( index === 1 ) {
            item.setAttribute('class', 'active');
            activeBucket = bucket;
        }
        
        a.appendChild(document.createTextNode(bucket.getName()));
        item.appendChild(a);
        item.setAttribute('data-bucketname', bucket.getName());
        menu.appendChild(item);
    });

    Layer.notify(activeBucket.getName() + 'のファイル一覧を取得中...');

    request = activeBucket.getItems();
    request.done(function(items) {
        console.log(items);
        var area = document.getElementById('bucketObjects');
        console.log(items.getItemElements());

        area.appendChild(items.getItemElements());
        Layer.hide();
    });
});
