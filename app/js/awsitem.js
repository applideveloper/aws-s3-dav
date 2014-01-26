(function(DAV) {

    var Path = require('path');

    DAV.Item = Item;

    /**
     * Constructor
     */
    function Item(obj) {
        this.obj      = obj;
        this.element  = null;
        this.itemType = this._detectItemType(obj.Key);
    }

    Item.prototype.getName = function() {
        return this.obj.Key;
    };

    Item.prototype.getElement = function() {
        var txt;

        if ( ! this.element ) {
            this.element = doc.createElement('div');
            this.element.classList.add('icon-' + this.itemType);
            txt = doc.createElement('p');
            txt.appendChild(doc.createTextNode(this.obj.Key.replace(/\/$/, '')));
            this.element.appendChild(txt);
        }

        return this.element;
    };

    Item.prototype._detectItemType = function(name) {
        var types = {
            'directory': /.+\/$/,
            'image': /.+\.(gif|jpe?g|png)$/,
            'file': /.*/
        }, type;

        Object.keys(types).forEach(function(key) {
            if ( ! type && types[key].test(name) ) {
                type = key;
            }
        });

        return type;
    };
})(DAV);
