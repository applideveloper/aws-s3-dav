(function(global) {

    global.ItemList = ItemList;

    /**
     * Constructor
     */
    function ItemList(listObjects) {
        this.items = listObjects.map(function(item) {
            return new Item(item);
        });
    }

    ItemList.prototype.getFilteredItems = function() {
        var currentDir = Breadcrumb.getCurrentDirectory(),
            that       = this;

        return this.items.filter(function(item) {
            return that.compareDirectoryPath(item, currentDir);
        });
    };

    ItemList.prototype.compareDirectoryPath = function(item, currentDir) {
        var path = item.getName().replace(currentDir, '').replace(/\/$/, '');

        return  ( path.indexOf('/') === -1 );
        //return !( path.indexOf('/') !== -1 || ( path === '' && item.itemType === 'directory' ) );
    };

    ItemList.prototype.getItems = function() {
        return this.getFilteredItems();
    };

    ItemList.prototype.getItemElements = function() {
        var list = [];

        this.getFilteredItems().forEach(function(item) {
            list.push(item.getElement());
        });

        return list;
    };
})(this);
