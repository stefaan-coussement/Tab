/* globals module: false, process: false */

module.exports = function(grunt) {
	'use strict';

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		version: '<%= pkg.version %>'.split('+')[0],
		build: process.env.TRAVIS_BUILD_NUMBER || 'x',

		concat: {
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
					'source/<%= pkg.name %>.js',
					'source/<%= pkg.name %>-basics.js',
					'source/<%= pkg.name %>-scheduling.js',
					'source/<%= pkg.name %>-extending.js',
					'source/function-polyfill.js'
				],
				dest: '<%= pkg.name %>.js'
			}
		},

		copy: {
			// docs
			readme: {
				src: 'docs/project.md',
				dest: 'README.md'
			},

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
			// local testing
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
			// code
			test: [ 'test/test-build-qunit.html' ]
		},

		replace: {
			// docs
			links: {
				options: {
					patterns: [
						{
							match: /(<!-- ##### start of links ##### -->[\s\S]*|$)/,
							replacement: function() {
try {
grunt.log.writeln([">>>>> grunt.file.read"]);
								return grunt.file.read('docs/_links.md');
}
catch (e) {
grunt.log.writeln([">>>>> grunt.file.read failed"]);
}
							}
						}
					],
					force: true
				},
				src: [ 'docs/**/*.md', '!docs/**/_*.md' ],
				dest: './'
			},
			badges: {
				options: {
					patterns: [
						// semver badge
						{
							match: /\[Version\]\([^\)]*\)/g,
							replacement: function () {
								// in badges, we need to replace the '-' in versions by '--'
								var fullVersion = grunt.config.process('<%= version %>+<%= build %>');
								var parts = fullVersion.split('-'), i, n;
								var escapedVersion;

								escapedVersion = parts[0];
								for (i = 1, n = parts.length; i < n; i += 1) {
									escapedVersion += '--' + parts[i];
								}

								return '[Version](https://img.shields.io/badge/semver-' + escapedVersion + '-blue.svg)';
							}
						},
						// stability badge
						{
							match: /\[Stability\]\([^\)]*\)/g,
							replacement: function () {
								var stability = grunt.config.process('<%= pkg.stability %>');
								var colorMap = {
									'deprecated': 'red',
									'experimental': 'orange',
									'unstable': 'yellow',
									'stable': 'green',
									'frozen': 'green',
									'locked': 'blue'
								};

								return '[Stability](https://img.shields.io/badge/stability-' + stability + '-' + colorMap[stability] + '.svg)';
							}
						}
					]
				},
				src: 'docs/project.md',
				dest: 'docs/project.md'
			}
		},

		uglify: {
			// code
			tab: {
				options: {
					banner: '/* <%= pkg.name %>.js - version <%= version %>+<%= build %>, <%= grunt.template.today("yyyy-mmm-dd HH:MM") %>, license <%= pkg.license %>, copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %> */\n',
					report: 'gzip'
				},
				src: '<%= pkg.name %>.js',
				dest: '<%= pkg.name %>.min.js'
			}
		},

		clean: [ '<%= concat.license.dest %>' ],

		connect: {
			// local testing
			test: {
				options: {
					port: 9999,
					base: 'test'
				}
			}
		},

		watch: {
			// local testing
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
				tasks: 'replace:links'
			},
			project: {
				files: 'docs/project.md',
				tasks: 'copy:readme'
			},
			badges: {
				files: [ 'package.json', 'tab.js' ],
				tasks: [ 'replace:badges', 'copy:readme' ]
			},

			// code
			build: {
				files: 'source/<%= pkg.name %>-*.js',
				tasks: [ 'concat:license', 'concat:build', 'copy:testBuild', 'jshint', 'qunit', 'uglify', 'clean' ]
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
	grunt.loadNpmTasks('grunt-replace');

	grunt.registerTask('default', [ 'watch' ]);

	grunt.registerTask('docs', [ 'replace:links', 'replace:badges', 'copy:readme' ]);
	grunt.registerTask('test', [ 'copy:testCode', 'exec:serve', 'exec:ie', 'exec:ff', 'watch:reload' ]);
	grunt.registerTask('build', [ 'concat:license', 'concat:build', 'copy:testBuild', 'jshint', 'qunit', 'uglify', 'clean' ]);
	grunt.registerTask('travis', [ 'docs', 'build' ]);
};