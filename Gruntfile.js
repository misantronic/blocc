module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		uglify: {
			options: {
				mangle: true
			},

			all: {
				files: {
					'dist/core.min.js' : ['js/core.js'],
					'dist/world.min.js' : ['js/world-1.js']
				}
			}
		}
	});

	// load tasks
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// tasks
	grunt.registerTask('default', ['uglify']);
};