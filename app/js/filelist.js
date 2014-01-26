(function(DAV) {

    DAV.fileListCache = {};

    DAV.FileList = ({
        element: doc.getElementById('bucketObjects'),

        init: function() {
            return this;
        },

        getByCache: function(key, dir) {
            if ( key in DAV.fileListCache ) {
                return ( dir in DAV.fileListCache[key] ) ? DAV.fileListCache[key][dir] : null;
            }
            return null;
        },

        purgeCache: function(key, dir) {
            if ( key in DAV.fileListCache ) {
                if ( dir ) {
                    if ( dir in DAV.fileListCache[key] ) {
                        delete DAV.fileListCache[key][dir];
                    }
                } else {
                    delete DAV.fileListCache[key];
                }
            }
        },

        reload: function(list, dir) {
            var element = this.element,
                cache   = [];

            while ( element.firstChild ) {
                element.removeChild(element.firstChild);
            }

            list.forEach(function(item) {
                var instance;

                element.appendChild(item.getElement());
                if ( ! (item instanceof FileItem) ) {
                    cache.push(new FileItem(item));
                } else  {
                    cache.push(item);
                }
            });

            if ( ! (DAV.fileListCache[DAV.currentBucket]) ) {
                DAV.fileListCache[DAV.currentBucket] = {};
            }
            DAV.fileListCache[DAV.currentBucket][dir] = cache;
        }
    }).init();


    function FileItem(node) {
        this.obj      = node.obj;
        this.element  = node.element;
        this.itemType = node.itemType;
        
        DAV.Item.prototype.getElement.call(this);
        this.initialize();
    }

    FileItem.prototype.getElement = function() {
        return this.element;
    };
    FileItem.prototype.initialize = function() {
        this.element.addEventListener('click', this);
    };
    FileItem.prototype.handleEvent = function(evt) {
        // TODO: click handler
    };

})(DAV);
