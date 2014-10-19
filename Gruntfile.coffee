module.exports = (grunt) ->
  require('load-grunt-tasks') grunt
  path = require 'path'

  config =
    connect_port: 7777
    livereload_port: 32123
    lib: 'lib'
    example: 'example'

  grunt.initConfig
    config: config

    less:
      lib:
        files:
          '<%= config.lib %>/sweet-alert.css': '<%= config.lib %>/sweet-alert.less'


    watch:
      lib:
        options:
          livereload: config.livereload_port
        files: ['<%= config.lib %>/*.{less,html,js}', '<%= config.example %>/*']
        tasks: ['less:lib']


    open:
      dev:
        path: "http://localhost:#{config.connect_port}/"


    connect:
      server:
        options:
          port: config.connect_port
          hostname: '*'
          base: '.'

  grunt.registerTask 'default', ['less:lib', 'connect', 'open', 'watch']
