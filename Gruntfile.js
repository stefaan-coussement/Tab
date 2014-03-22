/* globals module: true */

module.exports = function(grunt) {
    "use strict";
    //jshint quotmark: true

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        version: '<%= pkg.version %>'.split('+')[0],

        concat: {
            // docs
            readme: {
                src: 'docs/project.md',
                dest: 'README.md'
            },

            // code
            license: {
                options: {
                    banner: '/*\n',
                    footer: '*/\n'
                },
                src: 'LICENSE',
                dest: '_license.js'
            },
            build: {
                src: [
                    '<%= concat.license.dest %>',
                    'source/<%= pkg.name %>-core.js',
                    'source/<%= pkg.name %>-callbacks.js'
                ],
                dest: '<%= pkg.name %>.js'
            }
        },

        copy: {
            // code
            testCode: {
                src: 'source/*.js',
                dest: 'test/'
            },
            testBuild: {
                src: '<%= concat.build.dest %>',
                dest: 'test/'
            }
        },

        exec: {
            // docs
            docs: {
                cmd: 'cmd /C call add-links-all.bat',
                cwd: 'build'
            }
        },

        jshint: {
            // code
            options: {
                jshintrc: true
            },
            test: [ 'test/<%= pkg.name %>.js', 'test/test-qunit/*.js' ]
        },

        qunit: [ 'test/test-build-qunit.html' ],

        uglify: {
            // code
            tab: {
                options: {
                    banner: '/* <%= pkg.name %>.js - version <%= version %>, <%= grunt.template.today("yyyy-mmm-dd HH:MM") %>, license <%= pkg.license %>, copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %> */\n',
                    report: 'gzip'
                },
                src: '<%= pkg.name %>.js',
                dest: '<%= pkg.name %>.min.js'
            }
        },

        clean: [ '<%= concat.license.dest %>' ],

        watch: {
            // docs
            links: {
                files: 'docs/_links.md',
                tasks: 'exec:docs'
            },
            readme: {
                files: 'docs/project.md',
                tasks: 'concat:readme'
            },

            // code
            build: {
                files: 'source/<%= pkg.name %>-*.js',
                tasks: 'build'
            },

            // reload
            reload: {
                options: {
                    livereload: true
                },
                files: [ 'source/test/test-qunit*.html', 'source/test/test-qunit/*.js' ]
            },
            reload2: {
                options: {
                    livereload: true
                },
                files: [ 'source/<%= pkg.name %>-*.js' ],
                tasks: 'test'
            }
        }
    });

    // Tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('default', [ 'watch' ]);

    grunt.registerTask('docs', [ 'exec:docs', 'concat:readme' ]);
    grunt.registerTask('test', [ 'copy:testCode' ]);
    grunt.registerTask('build', [ 'concat:license', 'concat:build', 'copy:testBuild', 'jshint', 'qunit', 'uglify', 'clean' ]);
};