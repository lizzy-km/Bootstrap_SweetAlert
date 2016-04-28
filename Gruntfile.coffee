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

    uglify:
      dist:
        files:
          'dist/sweet-alert.min.js': 'dist/sweet-alert.js'

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

  grunt.registerTask 'compile', ['less', 'browserify', 'uglify']

  grunt.registerTask 'default', ['compile', 'connect', 'open', 'watch']
