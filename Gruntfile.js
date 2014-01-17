module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

   markdown: {
      all: {
        files: [
          {
            expand: true,
            src: '*.md',
            dest: './',
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
        },
      },
    },

  });

  grunt.loadNpmTasks('grunt-markdown');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['markdown']);
  grunt.registerTask('live', ['default', 'watch']);
};