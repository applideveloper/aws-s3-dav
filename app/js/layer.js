(function(DAV) {

    DAV.Layer = ({
        layer       : doc.getElementById('layer'),
        notification: layer.querySelector('p'),
        relations   : [],

        init: function() {
            this.layer.addEventListener('click', this.hide, false);

            return this;
        },

        show: function(isLoading, msg) {
            this.layer.style.display = 'block';
            if ( msg ) {
                this.notification.textContent = msg;
            }
            if ( !!isLoading ) {
                this.layer.classList.add('loading');
            }
        },

        addRelationElement: function() {
            this.relations = [].slice.call(arguments);
        },

        hide: function() {
            this.layer.style.display = 'none';
            this.layer.classList.remove('loading');
            this.notification.textContent = '';

            if ( this.relations.length > 0 ) {
                this.relations.forEach(function(node) {
                    node.style.display = 'none';
                });
                this.relations.length = 0;
            }
        },

        notify: function(msg) {
            this.notification.textContent = msg;
        }
    }).init();
})(DAV);
