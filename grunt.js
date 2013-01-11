module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '// <%= pkg.name %> v<%= pkg.version %>\n' +
              '//\n' +
              '// Copyright (c) 2013 <%= pkg.author %>\n' +
              '// Distributed under the <%= pkg.license %> license'
    },
    lint: {
      grunt: 'grunt.js',
      src:   'src/**/!(intro|outro).js',
      dist:  'dist/<%= pkg.name %>.js'
    },
    mocha: {
      src:  'test/index.html',
      dist: 'test/dist.html'
    },
    concat: {
      dist: {
        src: [
          '<banner>',
          'src/intro.js',
          'src/ext.js',
          'src/view.js', 'src/views/row.js', 'src/views/pagination.js',
          'src/helpers/*.js',
          'src/outro.js'
        ],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    min: {
      dist: {
        src: ['<banner>', 'dist/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    }
  });

  // Grunt plugins.
  grunt.loadNpmTasks('grunt-mocha');

  // Default task and aliases.
  grunt.registerTask('test', 'lint:grunt lint:src mocha:src');
  grunt.registerTask('dist', 'concat lint:dist min mocha:dist');
  grunt.registerTask('default', 'test dist');
};
