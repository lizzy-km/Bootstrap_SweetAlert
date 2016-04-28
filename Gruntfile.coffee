module.exports = (grunt) ->
  require('load-grunt-tasks') grunt

  grunt.initConfig
    browserify:
      dist:
        options:
          transform: [
            ['babelify', { "presets": ["es2015"] }]
          ]
        files:
          'dist/sweet-alert.js': ['lib/sweet-alert.js']

    less:
      dist:
        files:
          'dist/sweet-alert.css': 'lib/sweet-alert-combine.less'

    wrap:
      basic:
        src: ['dist/sweet-alert.js']
        dest: '.'
        options:
          wrapper: [';(function(window, document, undefined) {\n"use strict";\n', '\n})(window, document);']

    uglify:
      dist:
        files:
          'dist/sweet-alert.min.js': 'dist/output.js'

    watch:
      lib:
        options:
          livereload: 32123
        files: ['**/*.{less,html,css}', 'lib/sweet-alert.js']
        tasks: ['compile']

    open:
      example:
        path: 'http://localhost:7777/'

    connect:
      server:
        options:
          port: 7777
          hostname: '*'
          base: '.'

  grunt.registerTask 'compile', ['less', 'browserify', 'wrap', 'uglify']
  grunt.registerTask 'default', ['compile', 'connect', 'open', 'watch']
