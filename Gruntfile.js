'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    // Task configuration.
    clean: {
      src: ['dist']
    },
    concat: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      css: {
        src: ['src/public/css/estilos.css', 'src/public/css/navbar.css'],
        dest: 'src/public/css/concat.css'
      },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      js: {
        src: ['./src/views/admin/cursos/usuarios/addUsuariosCurso.js'],
        dest: './src/public/js/addUsuariosCurso.min.js'
      },
      css: {
        src:  'src/public/css/concat.css',
        dest: 'src/public/css/card-stamp.min.css'
      },
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task.
  grunt.registerTask('concat-js', ['concat:js']);
  grunt.registerTask('default-js', ['uglify:js']);
  grunt.registerTask('default-css', ['concat:css', 'uglify:css']);
  grunt.registerTask('concat-css', ['concat:css']);
  grunt.registerTask('default-uglify-css', ['uglify:css'])
};