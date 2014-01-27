(function(DAV) {

    DAV.FileDetail = ({
        node: doc.getElementById('fileDetail'),

        init: function() {
            return this;
        },

        show: function(fileData) {
            var i        = 0,
                fileName = doc.createElement('p'),
                fileSize = doc.createElement('p'),
                download = doc.createElement('a');
            
            // Remove child nodes
            while ( this.node.firstChild ) {
                this.node.removeChild(this.node.firstChild);
            }
            
            // And create new detail data
            fileName.appendChild(doc.createTextNode('FileName: ' + fileData.name));
            fileSize.appendChild(doc.createTextNode('FileSize: ' + fileData.size));
            download.setAttribute('href', fileData.downloadURL);
            download.setAttribute('downoad', fileData.name);
            download.setAttribute('class', 'btn btn-success');
            download.appendChild(doc.createTextNode('Download'));

            this.node.appendChild(fileName);
            this.node.appendChild(fileSize);
            this.node.appendChild(download);

            this.node.classList.add('active');
        },

        hide: function() {
            this.node.classList.remove('active');      
        }
    
    }).init();

})(DAV);
