// Listing 10-1. Running npm init in our demo project
$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (pro-d3-building)
version: (1.0.0)
description: Demo package for the package building chapter on Pro D3.js
entry point: (index.js)
test command: yarn test
git repository: (https://github.com/Golodhros/pro-d3-building.git)
keywords: d3.js, build, package, npm
author: Marcos Iglesias Valle
license: (ISC)
About to write to /Users/miglesias/Sites/a-d3/pro-d3-building/package.json:

{
  "name": "pro-d3-building",
  "version": "1.0.0",
  "description": "Demo package for the package building chapter on Pro D3.js",
  "main": "index.js",
  "scripts": {
    "test": "yarn test"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Golodhros/pro-d3-building.git"
  },
  "keywords": [
    "d3.js",
    "build",
    "package",
    "npm"
  ],
  "author": "Marcos Iglesias Valle",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/Golodhros/pro-d3-building/issues"
  },
  "homepage": "https://github.com/Golodhros/pro-d3-building#readme"
}

Is this OK? (yes)

// Listing 10-2. The initial scripts object in our package.json
"scripts": {
  "test": "yarn test",
  "build": "webpack --config webpack.config.js"
},

// Listing 10-3. A CSS loader example
module: {
    rules: [
        {
            test:/\.scss$/,
            use: [
                'style-loader',
                'css-loader',
            ],
            exclude: /node_modules/,
        },
    ],
},

// Listing 10-4. Adding plugins to the bundling pipeline
plugins: [
    new DashboardPlugin(),
    new BundleAnalyzerPlugin({
        analyzerPort: 123
    }),
],

// Listing 10-5. Production bundle Webpack configuration
const path = require('path');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');
const constants = require('./webpack.constants');

const prodBundleConfig = merge([
    {
        mode: 'production',
        devtool: 'source-map',
        entry: {
            proD3Building: constants.PATHS.bundleIndex
        },
        output: {
            path: path.resolve(__dirname, 'dist/'),
            filename: 'proD3Building.min.js',
            library: ['proD3Building'],
            libraryTarget: 'umd'
        },
    },
    parts.babelLoader(),
    parts.cssLoader(),
    parts.externals(),
]);

module.exports = (env) => {
    if (env === 'production') {
        return prodBundleConfig;
    }
};

// Listing 10-5. Index file
export {default as bar} from './charts/barChart.js';


// Listing 10-6. Webpack parts file with externals
exports.externals = () => ({
    externals: {
        commonjs: 'd3',
        amd: 'd3',
        root: 'd3'
    },
});

// Loaders
exports.cssLoader = () => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
        ],
    },
});
exports.babelLoader = () => ({});

// Listing 10-7. Our first run log of 'yarn build'
$ yarn build
yarn run v1.16.0
$ webpack --config webpack.config.js --env=production
Hash: 5977d9e3a04ecd337815
Version: webpack 4.35.2
Time: 5256ms
Built at: 07/07/2019 2:18:20 PM
                   Asset     Size  Chunks             Chunk Names
    proD3Building.min.js  137 KiB       0  [emitted]  proD3Building
proD3Building.min.js.map  617 KiB       0  [emitted]  proD3Building
Entrypoint proD3Building = proD3Building.min.js proD3Building.min.js.map
[0] ./src/charts/barChart.css 1.08 KiB {0} [built]
[1] ./node_modules/css-loader/dist/cjs.js!./src/charts/barChart.css 292 bytes {0} [built]
[5] ./src/index.js + 517 modules 536 KiB {0} [built]
    | ./src/index.js 53 bytes [built]
    | ./src/charts/barChart.js 4.4 KiB [built]
    |     + 516 hidden modules
    + 3 hidden modules
✨  Done in 6.99s.

// Listing 10-8. Development configuration
const path = require('path');
const merge = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const parts = require('./webpack.parts');
const constants = require('./webpack.constants');

//... Production Configuration

const devConfig = merge([
    {
        mode: 'development',
        devtool: 'cheap-eval-source-map',
        entry: constants.DEMOS,
        output: {
            path: path.resolve(__dirname, 'demos/build'),
            filename: '[name].js'
        },
        devServer: {
            contentBase: './demos/build',
            port: 8001,
            inline: true,
            hot: true,
            open: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Development',
                template: 'src/demos/index.html'
            })
        ],
    },
    parts.cssLoader(),
    parts.babelLoader(),
]);

module.exports = (env) => {

    if (env === 'dev') {
        return devConfig;
    }

    if (env === 'production') {
        return prodBundleConfig;
    }
};

// Listing 10-9. The tests.webpack.js file
const context = require.context('./charts', true, /\.test\.js$/);

context.keys().forEach(context);

// Listing 10-10. The test configuration
//... Dependencies imports
//... Production and Development configurations

const testConfig = merge([
    {
        mode: 'development',
        devtool: 'inline-source-map',
        resolve: {
            modules: [
                path.resolve(__dirname, 'src/charts'),
                'node_modules',
            ],
        },
    },
    parts.cssLoader(),
    parts.babelLoader(),
]);

module.exports = (env) => {
    if (env === 'dev') {
        return devConfig;
    }
    if (env === 'test') {
        return testConfig;
    }
    if (env === 'production') {
        return prodBundleConfig;
    }
};

// Listing 10-11. The karma.conf.js file
// Karma configuration
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
        'src/tests.webpack.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'src/tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },

    webpack: webpackConfig('test'),

    //... Code ommitted for brevity
  })
}

// Listing 10-12. Our tests running
$ yarn test
yarn run v1.16.0
$ karma start --env=test
// ...
07 07 2019 20:48:17.068:WARN [karma]: No captured browser, open http://localhost:9876/
07 07 2019 20:48:17.075:INFO [karma-server]: Karma v4.1.0 server started at http://0.0.0.0:9876/
07 07 2019 20:48:17.076:INFO [launcher]: Launching browsers Chrome with concurrency unlimited
07 07 2019 20:48:17.091:INFO [launcher]: Starting browser Chrome
07 07 2019 20:48:18.692:INFO [Chrome 75.0.3770 (Mac OS X 10.12.6)]: Connected on socket RXE75EE2UAkJ98GwAAAA with id 94795783
.......................
Chrome 75.0.3770 (Mac OS X 10.12.6): Executed 23 of 23 SUCCESS (0.164 secs / 0.124 secs)

// Listing 10-13. The Istanbul code coverage loader
exports.istanbulLoader = () => ({
    module: {
        rules: [
            {
                test: /\.js?$/,
                include: /src/,
                exclude: /(node_modules|tests.webpack.js)/,
                use: [{
                    loader: 'istanbul-instrumenter-loader',
                    query: {
                        esModules: true
                    }
                }],
            }
        ]
    }
});

// Listing 10-14. Code coverage report in the command line
.......................
Chrome 75.0.3770 (Mac OS X 10.12.6): Executed 23 of 23 SUCCESS (0.155 secs / 0.121 secs)
-------------------|----------|----------|----------|----------|----------------|
File               |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
-------------------|----------|----------|----------|----------|----------------|
 charts/           |      100 |      100 |    98.51 |      100 |                |
  barChart.js      |      100 |      100 |      100 |      100 |                |
  barChart.test.js |      100 |      100 |    97.78 |      100 |                |
-------------------|----------|----------|----------|----------|----------------|
All files          |      100 |      100 |    98.51 |      100 |                |
-------------------|----------|----------|----------|----------|----------------|

// Listing 10-15. Our babel configuration in package.json
...
"browserslist": "defaults, IE 10",
"babel": {
    "presets": [
            ["@babel/preset-env", {
                    "debug":true
            }]
    ]
}

// Listing 10-16. Babel Loader in webpack.parts.js
exports.babelLoader = () => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
});

// Listing 10-17. npm publish log
npm publish
npm notice
npm notice 📦  pro-d3-building@1.0.0
npm notice === Tarball Contents ===
npm notice 1.5kB   package.json
npm notice 763B    README.md
npm notice 141.3kB dist/proD3Building.min.js
npm notice 631.7kB dist/proD3Building.min.js.map
npm notice 137B    src/charts/barChart.css
npm notice 4.5kB   src/charts/barChart.js
npm notice 12.5kB  src/charts/barChart.test.js
npm notice 1.6kB   src/demos/demo-bar.js
npm notice 453B    src/demos/index.html
npm notice 53B     src/index.js
npm notice 269B    src/tests.webpack.js
npm notice === Tarball Details ===
npm notice name:          pro-d3-building
npm notice version:       1.0.0
npm notice package size:  207.7 kB
npm notice unpacked size: 794.9 kB
npm notice shasum:        30529ff408379bfafcc6c04f8484bb17c5fcfba0
npm notice integrity:     sha512-gpj5lhvMOW7BV[...]k2oJszEWwdPew==
npm notice total files:   11
npm notice
+ pro-d3-building@1.0.0
