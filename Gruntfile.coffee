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
          'dist/sweet-alert.js': ['dev/sweetalert.es6.js']

    less:
      dist:
        files:
          'dist/sweet-alert.css': 'lib/sweet-alert-combine.less'

    wrap:
      basic:
        src: ['dist/sweet-alert.js']
        dest: '.'
        options:
          wrapper: [
            ';(function(window, document, undefined) {\n"use strict";\n',
            '
  /*
   * Use SweetAlert with RequireJS
   */
  
  if (typeof define === \'function\' && define.amd) {
    define(function () {
      return sweetAlert;
    });
  } else if (typeof module !== \'undefined\' && module.exports) {
    module.exports = sweetAlert;
  }

})(window, document);\n'
          ]

    uglify:
      dist:
        files:
          'dist/sweet-alert.min.js': 'dist/sweet-alert.js'

    watch:
      lib:
        options:
          livereload: 32123
        files: ['**/*.{less,html,css}', 'dev/**/*.js']
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
