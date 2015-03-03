'use strict';

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            file: 'benatespina.com',
            banner: '/* <%= meta.file %> v<%= pkg.version %> - '              +
              '<%= grunt.template.today("yyyy/m/d") %>\n'                     +
              '<%= grunt.template.today("yyyy") %> <%= pkg.author.name %>'    +
              '- Licensed <%= _.pluck(pkg.license, "type").join(", ") %> */\n'
        },
        watch: {
            options: {
                livereload: true
            },
            compass: {
                files: 'assets/scss/**/*.scss',
                tasks: ['compass', 'cssmin']
            },
            jade: {
                files: 'views/**/*.jade'
            }
        },
        compass: {
            compile: {
                options: {
                    sassDir: 'assets/scss',
                    cssDir : 'public/css'
                }
            }
        },
        cssmin: {
            minify: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'public/css/',
                        src: '*.css',
                        dest: 'public/',
                        ext: '.min.css'
                    }
                ]
            }
        },
        clean: {
            dev: ['public'],
            prod: ['public/css']
        },
        copy: {
            img: {
                files: [
                    {
                        expand: true,
                        cwd: 'assets/img',
                        src: '**/*',
                        dest: 'public/img',
                        filter: 'isFile'
                    }
                ]
            },
            media: {
                files: [
                    {
                        expand: true,
                        cwd: 'assets/media',
                        src: '**/*',
                        dest: 'public',
                        filter: 'isFile'
                    }
                ]
            },
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: 'assets/fonts',
                        src: '**/*',
                        dest: 'public/fonts',
                        filter: 'isFile'
                    }
                ]
            },
            css: {
                files: [
                    {
                        expand: true,
                        cwd: 'assets/css',
                        src: '**/*',
                        dest: 'public',
                        filter: 'isFile'
                    }
                ]
            }
        },
        concat: {
            js: {
                src: ['assets/js/*.js'],
                dest: 'public/js/main.js',
            },
        },
        uglify: {
            options: {
                mangle: false
            },
            target: {
                files: {
                    'public/main.min.js': ['public/js/main.js']
                }
            }
        },
        uncss: {
            dist: {
                files: {
                    'assets/scss/NEW.css': ['views/index.html']
                }
            }
        },
    });
    grunt.registerTask('default', 'Main Grunt. Executes all tasks.', [
        'clean', 'copy', 'stylesheets', 'javascript'
    ]);
    grunt.registerTask('prod', 'Grunt for production environment.',  [
        'clean', 'copy', 'stylesheets', 'clean:prod'
    ]);
    grunt.registerTask('stylesheets', 'Compiles the stylesheets.',   [
        'compass', 'cssmin'
    ]);
    grunt.registerTask('javascript', 'Compiles the javascripts.',    [
        'concat', 'uglify'
    ]);
};
