(function(global) {

    fileListCache = {};

    global.FileList = ({
        element: document.getElementById('bucketObjects'),

        init: function() {
            return this;
        },

        getByCache: function(key, dir) {
            if ( key in fileListCache ) {
                return ( dir in fileListCache[key] ) ? fileListCache[key][dir] : null;
            }
            return null;
        },

        purgeCache: function(key, dir) {
            if ( key in fileListCache ) {
                if ( dir ) {
                    if ( dir in fileListCache[key] ) {
                        delete fileListCache[key][dir];
                    }
                } else {
                    delete fileListCache[key];
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

                if ( ! (item instanceof FileItem) ) {
                    element.appendChild(item.getElement());
                    cache.push(new FileItem(item));
                } else  {
                    element.appendChild(item.getElement());
                    cache.push(item);
                }
            });

            if ( ! (fileListCache[Main.currentBucket]) ) {
                fileListCache[Main.currentBucket] = {};
            }
            fileListCache[Main.currentBucket][dir] = cache;
        }
    }).init();


    function FileItem(node) {
        this.obj      = node.obj;
        this.element  = node.element;
        this.itemType = node.itemType;
        
        Item.prototype.getElement.call(this);
        this.initialize();
    }

    FileItem.prototype.getElement = function() {
        return this.element;
    };
    FileItem.prototype.initialize = function() {
        console.log('Initialize');
        console.log(this.element);
        this.element.addEventListener('click', this);
    };
    FileItem.prototype.handleEvent = function(evt) {
        console.log('Clicked');
    };

})(this);
