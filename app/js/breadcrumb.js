(function(global) {

    global.Breadcrumb = ({

        node: document.querySelector('.breadcrumb'),
        items: null,
        active: null,

        init: function() {
            this.items = this.node.getElementsByTagName('a');

            return this;
        },

        getCurrentDirectory: function() {
            var paths = [];

            [].forEach.call(this.items, function(item) {
                paths.push(item.getAttribute('href').slice(1));
            });

            return ( paths.length > 0 ) ? paths.join('/') + '/' : '';
        },

        append: function(pathName) {
            var li = document.createElement(li),
                a  = document.createElement(a);
            
            if ( this.active ) {
                this.active.classList.remove('active');
            }

            li.classList.add('active');
            a.setAttribute('href', '#' + pathName);

            li.appendChild(a);
            this.node.appendChild(li);
        },

        remove: function(pathName) {
            var finded = false,
                node   = this.node;

            [].forEach.call(this.items, function(item) {
                if ( finded === true || item.getAttribute('href').slice(1) === pathName ) {
                    finded = true;
                    node.removeChild(item.parentNode);
                }
            });

            if ( this.items.length > 0 ) {
                this.items[this.items.length - 1].parentNode.classList.add('active');
            }
        }
        
    }).init();




    
})(this);
