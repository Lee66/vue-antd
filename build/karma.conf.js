module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    reporters: ['spec', 'coverage'],
    // this is the entry file for all our tests.
    files: [
      '../test/unit/lib/jquery.js',
      '../test/unit/specs/index.js'
    ],
    // we will pass the entry file to webpack for bundling.
    preprocessors: {
      '../test/unit/specs/index.js': ['webpack', 'sourcemap']
    },
    webpack: {
      devtool: '#inline-source-map',
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /test|node_modules|vue\/dist/,
            loader: 'babel'
          }
        ],
        postLoaders: [
          {
            test: /\.js$/,
            exclude: /test|node_modules|vue\/dist|lib\//,
            loader: 'istanbul-instrumenter'
          }
        ]
      }
    },
    webpackMiddleware: {
      noInfo: true
    },
    singleRun: true,
    coverageReporter: {
      reporters: [
        { type: 'lcov', dir: '../coverage', subdir: '.' },
        { type: 'text-summary', dir: '../coverage', subdir: '.' }
      ]
    }
  })
}