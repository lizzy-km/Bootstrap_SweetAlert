module.exports = (grunt) ->
  require('load-grunt-tasks') grunt

  grunt.initConfig
    less:
      lib:
        files:
          'lib/sweet-alert.css': 'lib/sweet-alert.less'


    watch:
      lib:
        options:
          livereload: 32123
        files: ['lib/*.{less,html,js}', 'example/*']
        tasks: ['less']


    open:
      example:
        path: 'http://localhost:7777/example/'


    connect:
      server:
        options:
          port: 7777
          hostname: '*'
          base: '.'

  grunt.registerTask 'default', ['less', 'connect', 'open', 'watch']
