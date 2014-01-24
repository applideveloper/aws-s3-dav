(function(global) {

    var layer  = document.getElementById('layer');
    var notify = layer.querySelector('p');

    global.Layer = ({
        init: function() { return this; },

        show: function(isLoading, msg) {
            layer.style.display = 'block';
            if ( msg ) {
                notify.textContent = msg;
            }
            if ( !!isLoading ) {
                layer.classList.add('loading');
            }
        },

        hide: function() {
            layer.style.display = 'none';
            layer.classList.remove('loading');
            notify.textContent = '';
        },

        notify: function(msg) {
            notify.textContent = msg;
        }
    }).init();
})(this);
