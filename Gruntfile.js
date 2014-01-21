module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: ['app/js/head.js', 'app/js/aws.js'],
                dest: 'asset/js/app.min.js'
            }
        },
        
        uglify: {
            dist: {
                files: {
                    'asset/js/app.min.js': ['asset/js/app.min.js']
                }
            }
        },

        nw: {
            binaries: {
            
            },
            options: {
                dist: '/Applications/node-webkit.app',
            },
            targets: ['mac'],
            src: ['node_modules/*', 'index.html', 'package.json', 'asset/*']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-node-webkit');

    grunt.registerTask('default', ['concat', 'nw']);
    grunt.registerTask('deploy', ['concat', 'uglify', 'nw']);

};
