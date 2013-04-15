/*jshint camelcase: false */
/*global module:false */
// Generated on 2013-04-02 using generator-webapp 0.1.5
'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    //grunt.loadNpmTasks('grunt-neuter');

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            application_code: {
                files: ['<%= yeoman.app %>/components/ember/ember.js', '<%= yeoman.app %>/scripts/**/*.js'],
                tasks: ['neuter', 'livereload']
            },
            ember_templates: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.hbs'],
                tasks: ['ember_templates', 'livereload']
            },
            compass: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass']
            },
            livereload: {
                files: [
                    '<%= yeoman.app %>/*.html',
                    '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,webp}'
                ],
                tasks: ['livereload']
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: '<%= yeoman.app %>/lib'
                }
            //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
            }
        },
        neuter: {
            options: {
                includeSourceURL: true
            },
            'app/scripts/application.js': 'app/scripts/app.js'
        },
        ember_templates: {
            compile: {
                options: {
                    templateName: function (sourceFile) {
                        return sourceFile.replace(/app\/scripts\/templates\//, '');
                    }
                },
                files: {
                    'app/scripts/templates.js': 'app/scripts/templates/**/*.hbs'
                }
            }
        },
        /*
        Runs all .html files found in the test/ directory through PhantomJS.
        Prints the report in your terminal.
        */
        qunit: {
            all: ['test/**/*.html'],
            runner: ['test/runner.html']
        },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'app')
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, 'dist')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: ['.tmp', '<%= yeoman.dist %>/*'],
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%= yeoman.app %>/scripts/application.js',
                '!<%= yeoman.app %>/scripts/templates.js',
                '!<%= yeoman.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                importPath: 'app/components',
                relativeAssets: true
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        // not used since Uglify task does concat,
        // but still available if needed
        /*concat: {
            dist: {}
        },*/
        //uglify: {
        //    dist: {
        //        files: {
        //            '<%= yeoman.dist %>/scripts/main.js': [
        //                '<%= yeoman.app %>/scripts/{,*/}*.js'
        //            ],
        //        }
        //    }
        //},
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%= yeoman.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,txt}',
                        '.htaccess'
                    ]
                }]
            }
        },
        build_test_runner_file: {
            all: ['test/**/*test.js']
        },
        shell: {
            startLocalAPI: {
                command: '"C:\\Program Files\\IIS Express\\iisexpress" /site:OccupOSAPI',
                options: {
                    stdout: true,
                    stderr: true
                }
            }
        }
    });

    grunt.event.on('qunit.testDone', function (name, failed, passed, total) {
        grunt.log.ok('Finished test: ' + name + ', failed: ' + failed + ', passed: ' + passed + ', total: ' + total);
    });

    grunt.renameTask('regarde', 'watch');

    /*
     A task to build the test runner html file that get place in
     /test so it will be picked up by the qunit task. Will
     place a single <script> tag into the body for every file passed to
     its coniguration above in the grunt.initConfig above.
     */
    grunt.registerMultiTask('build_test_runner_file', 'Creates a test runner file.', function () {
        var tmpl = grunt.file.read('test/lib/runner.html.tmpl');
        var renderingContext = {
            data: {
                files: this.filesSrc.map(function (fileSrc) {
                    return fileSrc.replace('test/', '');
                })
            }
        };
        grunt.file.write('test/runner.html', grunt.template.process(tmpl, renderingContext));
    });

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'jshint',
            'bower',
            'ember_templates',
            'neuter',
            'clean:server',
            'compass:server',
            'livereload-start',
            'connect:livereload',
            'open',
            'watch'

        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'connect:test',
        'jshint',
        'ember_templates',
        'neuter',
        'build_test_runner_file',
        'qunit:runner'
    ]);

    grunt.registerTask('build', [
        'jshint',
        'clean:dist',
        'compass:dist',
        'useminPrepare',
        'imagemin',
        'htmlmin',
        'concat',
        'cssmin',
        //'uglify',
        'copy',
        'usemin',
        'neuter'
    ]);

    grunt.registerTask('default', [
        'neuter',
        'jshint',
        'test',
        'build'
    ]);

    // Travis CI task.
    grunt.registerTask('travis', function () {
        grunt.task.run([
            'bower',
            'test'
        ]);
    });

};
