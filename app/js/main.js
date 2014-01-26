
var Main = {
    buckets: {},
    currentBucket: null,

    init: function() {
        var that     = this,
            selected = localStorage.getItem('selectedBucket');

        Layer.show(true, 'Bucket情報を取得中...');

        Bucket.getBucketList()
        .done(function(buckets) {
            var menu = document.querySelector('.buckets > ul');

            if ( buckets.length === 0 ) {
                return alert('Buckets not found.\nPlease create bucket on AWS management console.');
            }
    
            buckets.forEach(function(bucket, index) {
                var item     = document.createElement('li'),
                    a        = document.createElement('a'),
                    name     = bucket.getName(),
                    isActive = false;
    
                if ( selected === name ) {
                    item.setAttribute('class', 'active');
                    isActive = true;
                    that.currentBucket = name;
                    SideMenu.setActiveElement(item);
                }
                
                a.appendChild(document.createTextNode(name));
                a.setAttribute('href', name);
                item.appendChild(a);
                item.setAttribute('data-bucketname', name);
                menu.appendChild(item, isActive);
                that.buckets[name] = bucket;
            });

            if ( ! that.currentBucket ) {
                that.currentBucket = buckets[0].getName();
                SideMenu.setActiveElement(menu.firstElementChild);
            }
            
            that.loadObjects(that.currentBucket, '/');
            Breadcrumb.append('/');
        });
    },

    loadObjects: function(bucketName, dir) {
        var bucket = this.buckets[bucketName],
            cache;

        if ( ! bucket ) {
            return alert('Error: bucket "' + bucketName + '" not found');
        }

        Layer.show(true, bucket.getName() + 'のファイル一覧を取得中...');
    
        cache = FileList.getByCache(bucketName, dir);
        if ( cache !== null ) {
            console.log('Loaded from cache' + bucketName + '/dir');
            FileList.reload(cache, dir);
            Layer.hide();
        } else {
            bucket.getItems(dir)
            .done(function(items) {
                FileList.reload(items.getItems(), dir);
                Layer.hide();
            });
        }
    }
};

var config = Setting.getConfigObject();

if ( config === null ) {
    Setting.show(Main.init);
} else {
    s3.config.update(config);
    Main.init();
}
