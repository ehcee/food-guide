module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		clean: {
			dist: ['dist']
		},

		uglify: {
			options: {
				banner: '/*!\n * [Project name] / [Nom du project]\n' +
				' * @license https://github.com/ServiceCanada/[project-name]/?tab=MIT-1-ov-file\n' +
				' * v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n*/'
			},

			dist: {
				files: {
					'dist/main.min.js': ['src/main.js']
				}
			}
		},

		cssmin: {
			dist: {
				files: {
					'dist/main.min.css': ['src/main.css']
				}
			}
		},

		usebanner: {
			taskName: {
				options: {
					position: 'top',
					banner: '/*!\n * [Project name] / [Nom du projet]\n' +
					' * @license https://github.com/ServiceCanada/[project-name]/?tab=MIT-1-ov-file\n' +
					' * v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n*/',
					linebreak: true
				},
				files: {
					src: [ 'dist/main.min.css' ]
				}
			}
		},

		htmllint: {
			all: {
				src: ['*.html']
			},

			options: {
				"attr-name-style": "dash",
				"attr-quote-style": false,
				"id-class-style": "dash",
				"indent-style": "tabs",
				"indent-width": 4,
				"line-end-style": "lf",
				"attr-no-unsafe-char": false
			}
		},

		jshint: {
			all: {
				options: {
					esversion: 11,
					'-W067': true	// To ignore Unorthodox function invocation
				},
				src: ['Gruntfile.js', 'src/main.js']
			}
		},

		eslint: {
			options: {
				overrideConfigFile: ".eslintrc.json",
				quiet: true
			},
			target: ['Gruntfile.js', 'src/main.js']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-banner');
	grunt.loadNpmTasks('grunt-htmllint');
	grunt.loadNpmTasks('grunt-eslint');

	// Task to fix line endings after minification
	grunt.registerTask('fixLineEndings', function () {
		let content = grunt.file.read('dist/main.min.css');
		content = content.replace(/\r\n?/g, '\n');
		grunt.file.write('dist/main.min.css', content);
	});

	grunt.registerTask('default', ['clean', 'htmllint', 'jshint', 'eslint', 'uglify', 'cssmin', 'usebanner', 'fixLineEndings']);
};
