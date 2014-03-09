module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                banner: '/* <%= pkg.name %>.js - version <%= pkg.version %>, <%= grunt.template.today("yyyy-mmm-dd HH:MM") %>, license <%= pkg.license %>, copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %> */\n'
            },
            tab: {
                src: 'src/<%= pkg.name %>.js',
                dest: '<%= pkg.name %>.js'
            },
        }, 
        uglify: {
            options: {
                banner: '/* <%= pkg.name %>.js - version <%= pkg.version %>, <%= grunt.template.today("yyyy-mmm-dd HH:MM") %>, license <%= pkg.license %>, copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %> */\n',
                report: "gzip"
            },
            tab_min: {
                src: 'src/<%= pkg.name %>.js',
                dest: '<%= pkg.name %>.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default tasks.
    grunt.registerTask('default', ['concat', 'uglify']);
};