DAV.buckets       = {};
DAV.currentBucket = null;

DAV.init = function() {
    var selected = localStorage.getItem('selectedBucket');

    DAV.Layer.show(true, 'Bucket情報を取得中...');
    DAV.Bucket.getBucketList()
    .done(function(buckets) {
        var menu = doc.querySelector('.buckets > ul');

        if ( buckets.length === 0 ) {
            return alert('Buckets not found.\nPlease create bucket on AWS management console.');
        }

        buckets.forEach(function(bucket, index) {
            var item     = doc.createElement('li'),
                a        = doc.createElement('a'),
                name     = bucket.getName(),
                isActive = false;

            if ( selected === name ) {
                item.setAttribute('class', 'active');
                DAV.SideMenu.setActiveElement(item);
                isActive           = true;
                DAV.currentBucket = name;
            }
            
            a.appendChild(doc.createTextNode(name));
            a.setAttribute('href', name);
            item.appendChild(a);
            item.setAttribute('data-bucketname', name);
            menu.appendChild(item, isActive);
            DAV.buckets[name] = bucket;
        });

        if ( ! DAV.currentBucket ) {
            DAV.currentBucket = buckets[0].getName();
            DAV.SideMenu.setActiveElement(menu.firstElementChild);
        }
        
        DAV.loadObjects(DAV.currentBucket, '/');
    });
};

DAV.loadObjects = function(bucketName, dir) {
    var bucket = DAV.buckets[bucketName],
        cache;

    console.log(arguments);
    if ( ! bucket ) {
        return alert('Error: bucket "' + bucketName + '" not found');
    }

    DAV.Layer.show(true, bucket.getName() + 'のファイル一覧を取得中...');

    cache = DAV.FileList.getByCache(bucketName, dir);
    if ( cache !== null ) {
        console.log('Loaded from cache' + bucketName + '/dir');
        DAV.FileList.reload(cache, dir);
        DAV.Layer.hide();
    } else {
        bucket.getItems(dir)
        .done(function(items) {
            DAV.FileList.reload(items.getItems(), dir);
            DAV.Layer.hide();
        });
    }
};

var config = DAV.Setting.getConfigObject();

if ( config === null ) {
    DAV.Setting.show(Main.init);
} else {
    DAV.Server.config.update(config);
    DAV.init();
}
