(function(global) {

    var layer  = document.getElementById('layer');
    var notify = layer.querySelector('p');
    var relations = [];

    global.Layer = ({
        init: function() {
            layer.addEventListener('click', this.hide, false);

            return this;
        },

        show: function(isLoading, msg) {
            layer.style.display = 'block';
            if ( msg ) {
                notify.textContent = msg;
            }
            if ( !!isLoading ) {
                layer.classList.add('loading');
            }
        },

        addRelationElement: function() {
            relations = [].slice.call(arguments);
        },

        hide: function() {
            layer.style.display = 'none';
            layer.classList.remove('loading');
            notify.textContent = '';

            if ( relations.length > 0 ) {
                relations.forEach(function(node) {
                    node.style.display = 'none';
                });
                relations.length = 0;
            }
        },

        notify: function(msg) {
            notify.textContent = msg;
        }
    }).init();
})(this);
