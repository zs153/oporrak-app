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
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'src/public/css/styles.css': ['src/public/css/estilos.css', 'src/public/css/navbar.css', 'src/public/css/nav.css', 'src/public/css/tabs.css', 'src/public/css/fonts.css']
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      js: {
        files: {
          // bin
          'dist/bin/www.js': ['./dist/bin/www.js'],
          // config
          'dist/config/settings.js': ['./dist/config/settings.js'],
          // controllers
          'dist/controllers/admin/calendario.controller.js':['./dist/controllers/admin/calendario.controller.js'],
          'dist/controllers/admin/curso.controller.js':     ['./dist/controllers/admin/curso.controller.js'],
          'dist/controllers/admin/festivo.controller.js':   ['./dist/controllers/admin/festivo.controller.js'],
          'dist/controllers/admin/historico.controller.js': ['./dist/controllers/admin/historico.controller.js'],
          'dist/controllers/admin/oficina.controller.js':   ['./dist/controllers/admin/oficina.controller.js'],
          'dist/controllers/admin/traspaso.controller.js':  ['./dist/controllers/admin/traspaso.controller.js'],
          'dist/controllers/admin/usuario.controller.js':   ['./dist/controllers/admin/usuario.controller.js'],
          //
          'dist/controllers/user/calendario.controller.js':['./dist/controllers/user/calendario.controller.js'],
          'dist/controllers/user/estado.controller.js':    ['./dist/controllers/user/estado.controller.js'],
          'dist/controllers/user/formacion.controller.js': ['./dist/controllers/user/formacion.controller.js'],
          'dist/controllers/user/usuario.controller.js':   ['./dist/controllers/user/usuario.controller.js'],
          //
          'dist/controllers/main.controller.js': ['./dist/controllers/main.controller.js'],
          // middleware
          'dist/middleware/auth.js': ['./dist/middleware/auth.js'],
          // public-js
          'dist/public/js/addEditCursos.min.js': ['./dist/public/js/addEditCursos.min.js'],
          'dist/public/js/addEditMatriculas.min.js': ['./dist/public/js/addEditMatriculas.min.js'],
          'dist/public/js/addEditOficinas.min.js': ['./dist/public/js/addEditOficinas.min.js'],
          'dist/public/js/addEditTurnos.min.js': ['./dist/public/js/addEditTurnos.min.js'],
          'dist/public/js/addEditUsuarios.min.js': ['./dist/public/js/addEditUsuarios.min.js'],
          'dist/public/js/addUsuariosCurso.min.js': ['./dist/public/js/addUsuariosCurso.min.js'],
          'dist/public/js/addUsuariosTurno.min.js': ['./dist/public/js/addUsuariosTurno.min.js'],
          'dist/public/js/ayuda.min.js': ['./dist/public/js/ayuda.min.js'],
          'dist/public/js/calendarioFestivos.min.js': ['./dist/public/js/calendarioFestivos.min.js'],
          'dist/public/js/calendariosAdmin.min.js': ['./dist/public/js/calendariosAdmin.min.js'],
          'dist/public/js/calendarioTraspasos.min.js': ['./dist/public/js/calendarioTraspasos.min.js'],
          'dist/public/js/calendarioUsuario.min.js': ['./dist/public/js/calendarioUsuario.min.js'],
          'dist/public/js/editHistoricos.min.js': ['./dist/public/js/editHistoricos.min.js'],
          'dist/public/js/enumeraciones.js': ['./dist/public/js/enumeraciones.js'],
          'dist/public/js/indexCalendariosAdmin.min.js': ['./dist/public/js/indexCalendariosAdmin.min.js'],
          'dist/public/js/indexCursos.min.js': ['./dist/public/js/indexCursos.min.js'],
          'dist/public/js/indexEstados.min.js': ['./dist/public/js/indexEstados.min.js'],
          'dist/public/js/indexFestivos.min.js': ['./dist/public/js/indexFestivos.min.js'],
          'dist/public/js/indexHistoricos.min.js': ['./dist/public/js/indexHistoricos.min.js'],
          'dist/public/js/indexMatriculas.min.js': ['./dist/public/js/indexMatriculas.min.js'],
          'dist/public/js/indexOficinas.min.js': ['./dist/public/js/indexOficinas.min.js'],
          'dist/public/js/indexTraspasos.min.js': ['./dist/public/js/indexTraspasos.min.js'],
          'dist/public/js/indexTurnos.min.js': ['./dist/public/js/indexTurnos.min.js'],
          'dist/public/js/indexUsuarios.min.js': ['./dist/public/js/indexUsuarios.min.js'],
          'dist/public/js/indexUsuariosCurso.min.js': ['./dist/public/js/indexUsuariosCurso.min.js'],
          'dist/public/js/indexUsuariosMatricula.min.js': ['./dist/public/js/indexUsuariosMatricula.min.js'],
          'dist/public/js/indexUsuariosTurno.min.js': ['./dist/public/js/indexUsuariosTurno.min.js'],
          'dist/public/js/js-year-calendar.min.js': ['./dist/public/js/js-year-calendar.min.js'],
          'dist/public/js/mensual.min.js': ['./dist/public/js/mensual.min.js'],
          'dist/public/js/perfil.min.js': ['./dist/public/js/perfil.min.js'],
          'dist/public/js/semanal.min.js': ['./dist/public/js/semanal.min.js'],
          // routes
          'dist/routes/admin.router.js': ['./dist/routes/admin.router.js'],
          'dist/routes/curso.router.js': ['./dist/routes/curso.router.js'],
          'dist/routes/main.router.js': ['./dist/routes/main.router.js'],
          'dist/routes/user.router.js':['./dist/routes/user.router.js'],
          // app
          'dist/app.js': ['./dist/app.js'],
        }
        // src: ['./dist/controllers/user/curso.controller.js'],
        // dest: './dist/controllers/user/curso.controller.js'
        // src: ['./src/views/user/estados/semanal.js'],
        // dest: './src/public/js/semanal.min.js'
      },
    },
  });
  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task.
  grunt.registerTask('concat-js', ['concat:js']);
  grunt.registerTask('default-js', ['uglify:js']);
  grunt.registerTask('default-css', ['uglify:css']);
  grunt.registerTask('concat-css', ['concat:css']);
  grunt.registerTask('css-min', ['cssmin']);
};
