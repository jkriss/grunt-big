module.exports = function(grunt) {

  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({

   markdown: {
      all: {
        files: [
          {
            expand: true,
            src: '*.md',
            dest: './public',
            ext: '.html'
          }
        ],
        options : {
          template : 'templates/big.jst',
          postCompile : function(src, context) {
            var slides = src.split("<hr>");
            return slides.map(function(slide) {
              return '<div>' + slide.replace(/^\s+|\s+$/,'').replace(/<p>|<\/p>/g, '') + '</div>\n\n';
            }).join("\n");
          }
        }
      }
    },

    watch: {
      scripts: {
        files: ['**/*.md'],
        tasks: ['default'],
        options: {
          spawn: false,
          livereload: true
        },
      },
    },

    connect: {
      server: {
        options: {
          port: 9000,
          hostname: "0.0.0.0",
          base: [__dirname+'/public/'],
          livereload: true
        }
      }
    }

  });

  // Default task(s).
  grunt.registerTask('default', ['markdown']);
  grunt.registerTask('server', ['default', 'connect', 'watch']);
};