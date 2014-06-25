
/* jshint node: true */
module.exports = function(grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  RegExp.quote = function (string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Metadata.
    meta: {
      distPath:       'dist/'
    },

    banner: '/*!\n' +
            ' * =====================================================\n' +
            ' * Foxui v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license %> (https://github.com/foxui/fox-actionsheet/blob/master/LICENSE)\n' +
            ' *\n' +
            ' * v<%= pkg.version %> designed by @fex-team.\n' +
            ' * =====================================================\n' +
            ' */\n',

    clean: {
      dist: ['<%= meta.distPath %>']
    },

    sass: {
      options: {
        banner: '<%= banner %>',
        style: 'expanded',
        unixNewlines: true
      },
      dist: {
        files: {
          '<%= meta.distPath %>css/<%= pkg.name %>.css': 'sass/fox-actionsheet.scss'
        }
      }
    },

    copy: {
      css: {
        expand: true,
        cwd: 'src/',
        src: 'css/*.css',
        dest: '<%= meta.distPath %>'
      },
      tags: {
        expand: true,
        cwd: 'src/',
        src: '*.html',
        dest: '<%= meta.distPath %>'
      }
    },

    cssmin: {
      options: {
        banner: '', // set to empty; see bellow
        keepSpecialComments: '*' // set to '*' because we already add the banner in sass
      },
      foxui: {
        src: '<%= meta.distPath %>/css/<%= pkg.name %>.css',
        dest: '<%= meta.distPath %>/css/<%= pkg.name %>.min.css'
      }
    },

    watch: {
      scripts: {
        files: [
          'sass/*.scss',
          'src/*.html'
        ],
        tasks: ['dist']
      }
    },

    qunit: {
      files: ['test/test.html']
    }
  });

  // Load the plugins
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
  require('time-grunt')(grunt);

  // Default task(s).
  grunt.registerTask('dist-css', ['sass', 'cssmin']);
  grunt.registerTask('dist', ['clean','copy', 'dist-css' ]);
  grunt.registerTask('build', ['dist']);
  grunt.registerTask('default', ['dist']);
  grunt.registerTask('test', ['dist', 'qunit']);

};
