'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['src/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      },
    },
    karma: {
        unit: {
            configFile: 'karma.conf.js'
        }
    },
    coveralls: {
      options: {
        debug: true,
        coverageDir: './coverage',
        dryRun: false,
        force: true,
        recursive: true
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-karma-coveralls');

  // Default task.=
  grunt.registerTask('default', ['jshint', 'karma']);
  grunt.registerTask('travis', ['jshint', 'karma', 'coveralls']);

};
