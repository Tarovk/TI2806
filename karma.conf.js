// Karma configuration
// Generated on Tue May 31 2016 10:31:05 GMT+0200 (W. Europe Daylight Time)

module.exports = function (config) {

    var cfg = {
        // base path that will be used to resolve all patterns (eg. files, exclude)
        baseUrl: '/base',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'requirejs'],


        // list of files / patterns to load in the browser
        files: [
          { pattern: 'libs/**/*.js', included: false },
          { pattern: 'src/**/*.js', included: false },
          { pattern: 'spec/**/*.js', included: false },
          
          'test/test-main.js'
        ],


        // list of files to exclude
        exclude: [
            'src/main.js'
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/**/*.js': ['coverage']
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        coverageReporter: {
            includeAllSources: true,
            type: 'lcov',
            dir: 'coverage/'
        },

        plugins: [
            'karma-coverage',
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-requirejs'
        ]
    };

    if (process.env.TRAVIS) {
        cfg.browsers = ['Chrome_travis_ci'];
    }

    config.set(cfg);
}

