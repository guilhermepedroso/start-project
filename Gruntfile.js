module.exports = function(grunt) {

    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        // Project paths
        paths: {
            js:         'js/',
            sass:       'scss/',
            css:        'css/',
            image:      'img/',

            urlPageres: 'http://www.walmart.com.br/',
            screenshot: 'screenshots'
        },

        pkg: {

        },

        // Watch: Tasks to watch
        watch: {
            options: {
                nospawn: true
            },

            sass: {
                files: ['<%= paths.sass %>**/*.{scss,sass}'],
                tasks: ['sass'] //, 'notify:printa'
            },

            js: {
                files: ['<%= paths.js %>**/*.js']
            }
        },

        // Sass: Compiles SCSS files
        sass: {
            options: {
                noCache: true,
                style: 'expanded'
            },
            files: {
                expand: true,
                cwd: '<%= paths.sass %>',
                src: ['**/*.scss'],
                dest: '<%= paths.css %>',
                ext: '.css',
            }
        },

        // Prefixer: Prefixer to old's browsers
        // autoprefixer: {
        //     options: {
        //         browsers: [
        //           'Android 2.3',
        //           'Android >= 4',
        //           'Chrome >= 20',
        //           'Firefox >= 24', // Firefox 24 is the latest ESR
        //           'Explorer >= 8',
        //           'iOS >= 6',
        //           'Opera >= 12',
        //           'Safari >= 6'
        //         ]},
        //     dev: {
        //         src: '<%= paths.css %>*.css',
        //         dest: 'dest/css/'
        //     }
        // },

        // autoprefixer: {
        //     dev: {
        //       options: {
        //         browsers: ['last 2 version', 'ie 8', 'ie 9']
        //       },
        //       src: 'css/main.css',
        //       dest: 'dist/css/main.css'
        //     },
        // },

        // BrowserSybc: Live reload
        browserSync: {
            files: {
                src : [
                    '**/*.css',
                    '*.html',
                    '*.php'
                ],
            },
            options: {
                host: 'http://127.0.0.1',
                server: {
                    baseDir: "."
                },
                watchTask: true,

                ghostMode: {
                    scroll: true,
                    links: true,
                    forms: true,
                    clicks: true
                },
            }
        },

        // Pageres: Generate print screen
        pageres: {
            dist: {
                options: {
                    url: '<%= paths.urlPageres %>',
                    crop: true,
                    dest: '<%= paths.screenshot %>',
                    sizes: [
                        '320x480',     // 320x480   - iPhone (portrait)
                        '480x240',     // 480x240   - iPhone (landscape)
                        '320x568',     // 320x568   - Android
                        '768x1024',    // 768x1024  - iPad (portrait)
                        '1024x768',    // 1024x768  - iPad (landscape) e Desktops
                        '1280x800',    // 1280x800  - Common Desktops
                        '1440x900',    // 1440x900  - Desktops mais recentes
                        '1660x1050'    // 1660x1050 - Tela grande
                    ]

                }
            }
        },

        // Nofity: Notify actions on desktop.
        notify: {
            screenshots: {
                options: {
                    title: 'Screenshots',
                    message: 'Screenshots gerados com sucesso!'
                }
            },
            compressimage: {
                options: {
                    title: 'Imagemin',
                    message: 'Imagens otimizadas com sucesso!'
                }
            },
            buildprod: {
                options: {
                    title: 'Build Prod',
                    message: 'Todas as tarefas executadas!'
                }
            }
        },

        // CMQ: Combine Media Queries
        cmq: {
            prod: {
                files: {
                    '<%= paths.css %>' : 'css/*.css'
                }
            }
        },

        imagemin: {
            prod: {
                options: {
                    optimizationLevel: 7,
                    progressive: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= paths.image %>',
                    src: ['**/*.{png,jpg,gif}'],
                    cwd: '<%= paths.image %>'
                }]
            }
        }
    });

    // Tasks

    // Screenshot website
    grunt.registerTask('screenshot', [
        'pageres',
        'notify:screenshots'
    ]);

    // Screenshot website
    grunt.registerTask('compressimages', [
        'imagemin',
        'notify:compressimage'
    ]);

    // Build
    grunt.registerTask('build', [
        'cmq:prod',
        'imagemin',
        'notify:buildprod'
    ]);

    // Watch
    grunt.registerTask('w', ['watch']);

    // BrowserSync with Watch (Default)
    grunt.registerTask('default', [
        'browserSync',
        'watch'
    ]);
};