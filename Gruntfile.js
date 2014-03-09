/* globals module: true */

module.exports = function(grunt) {
    "use strict";
    //jshint quotmark: true

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        version: '<%= pkg.version %>'.split('+')[0],
        concat: {
            license: {
                options: {
                    banner: '/*\n',
                    footer: '*/\n'
                },
                src: 'LICENSE',
                dest: '_license.js'
            },
            test: {
                src: [ '<%= concat.license.dest %>', 'src/<%= pkg.name %>-core.js', 'src/<%= pkg.name %>-callbacks.js' ],
                dest: 'src/test/<%= pkg.name %>.js'
            },
            tab: {
                src: [ '<%= concat.test.dest %>' ],
                dest: '<%= pkg.name %>.js'
            }
        },
        jshint: {
            options: {
                jshintrc: true
            },
            test: [ '<%= concat.test.dest %>', 'src/test/qunit/*.js' ]
        },
        qunit: [ 'src/test/test-qunit.html' ],
        uglify: {
            options: {
                banner: '/* <%= pkg.name %>.js - version <%= version %>, <%= grunt.template.today("yyyy-mmm-dd HH:MM") %>, license <%= pkg.license %>, copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %> */\n',
                report: 'gzip'
            },
            tab: {
                src: '<%= pkg.name %>.js',
                dest: '<%= pkg.name %>.min.js'
            }
        },

        watch: {
            test: {
                files: [ 'src/<%= pkg.name %>-*.js' ],
                tasks: [ 'concat:license', 'concat:test', 'clean' ]
            },
            reload: {
                options: {
                    livereload: true
                },
                files: [ 'src/test/test-qunit-blanket.html', 'src/test/<%= pkg.name %>.js', 'src/test/qunit/*.js' ],
                tasks: [ 'clean' ]
            }
        },

        clean: [ '<%= concat.license.dest %>' ]
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Tasks.
    grunt.registerTask('default', [ 'watch' ]);
    grunt.registerTask('_', [ 'watch' ]);

    grunt.registerTask('build', [ 'concat:license', 'concat:test', 'jshint', 'qunit', 'concat:tab', 'uglify', 'clean' ]);
};