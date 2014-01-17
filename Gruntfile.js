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
            // if it has an image, make that the background
            // return "<div>" + src.replace(/<hr>/g, '</div><div>');
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

    express: {
      all: {
        options: {
          port: 9000,
          hostname: "0.0.0.0",
          bases: [__dirname+'/public'], // Replace with the directory you want the files served from
                              // Make sure you don't use `.` or `..` in the path as Express
                              // is likely to return 403 Forbidden responses if you do
                              // http://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error
          livereload: true
        }
      }
    }

  });

  // Default task(s).
  grunt.registerTask('default', ['markdown']);
  grunt.registerTask('server', ['default', 'express', 'watch']);
};