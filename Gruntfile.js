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
                    'source/<%= pkg.name %>-callbacks.js',
                    'source/<%= pkg.name %>-polyfill.js'
                ],
                dest: '<%= pkg.name %>.js'
            }
        },

        copy: {
            // code
            testCode: {
                expand: true,
                cwd: 'source/',
                src: '*.js',
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
            },

            // code
            serve: {
                cmd: 'start /min grunt connect:test:keepalive'
            },
            ie: {
                cmd: 'start C:/"Program Files"/"Internet Explorer"/iexplore.exe http://localhost:9999/test-qunit-blanket.html'
            },
            ff: {
                cmd: 'start C:/"Program Files"/"Mozilla Firefox"/firefox.exe http://localhost:9999/test-qunit-blanket.html'
            },
            chrome: {
                cmd: 'start C:/Users/Stefaan/AppData/Local/Google/Chrome/Application/chrome.exe http://localhost:9999/test-qunit-blanket.html'
            },
            safari: {
                cmd: 'start C:/"Program Files"/Safari/safari.exe http://localhost:9999/test-qunit-blanket.html'
            },
            opera: {
                cmd: 'start C:/"Program Files"/Opera/opera.exe http://localhost:9999/test-qunit-blanket.html'
            }
        },

        jshint: {
            // code
            options: {
                jshintrc: true
            },
            test: [ 'test/<%= pkg.name %>.js', 'test/test-qunit/*.js' ]
        },

        qunit: {
            test: [ 'test/test-build-qunit.html' ]
        },

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

        connect: {
            test: {
                options: {
                    port: 9999,
                    base: 'test'
                }
            }
        },

        watch: {
            // reload
            reload: {
                options: {
                    livereload: true
                },
                files: [ 'source/<%= pkg.name %>-*.js', 'test/test-qunit*.html', 'test/test-qunit/*.js' ],
                tasks: 'test'
            },

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
            }
        }
    });

    // Tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('default', [ 'watch' ]);

    grunt.registerTask('docs', [ 'exec:docs', 'concat:readme' ]);
    grunt.registerTask('test', [ 'copy:testCode', 'exec:serve', 'exec:ie', 'exec:ff', 'watch:reload' ]);
    grunt.registerTask('build', [ 'concat:license', 'concat:build', 'copy:testBuild', 'jshint', 'qunit', 'uglify', 'clean' ]);
};