// Listing 11-1. Private function comments
/**
 * Builds the SVG element that will contain the chart
 * @param  {HTMLElement} container  DOM element that will work as the container of the graph
 * @private
 */
function buildSVG(container){
    if (!svg) {
        svg = d3.select(container)
          .append('svg')
            .classed('bar-chart', true);

        buildContainerGroups();
    }
    svg
        .attr('width', width)
        .attr('height', height);
}

// Listing 11-2. Public accessor function comments
/**
 * Gets or Sets the height of the chart
 * @param  {Number} [_x=500]    Desired height for the chart
 * @return {Number | Module}    Current height or Chart module to chain calls
 * @public
 */
exports.height = function(_x) {
    if (!arguments.length) {
        return height;
    }
    height = _x;

    return this;
};


// Listing 11-3. Comments for the bar chart module.
/**
 * Bar Chart Reusable API component that renders a
 * simple and configurable bar chart.
 *
 * @module Bar
 * @tutorial bar
 * @requires d3
 *
 * @example
 * const barChart = bar();
 *
 * barChart
 *     .height(500)
 *     .width(800);
 *
 * d3Selection.select('.css-selector')
 *     .datum(dataset)
 *     .call(barChart);
 *
 */
function bar() {
  //...
}

// Listing 11-4. Defining a complex data type.
/**
 * @typedef BarData
 * @type {Object[]}
 * @property {String} letter        Name of the letter (required)
 * @property {Number} frequency     Value of its frequency (required)
 *
 * @example
 * [
 *     {
 *         letter: 'A',
 *         frequency: 0.08167
 *     },
 *     {
 *         letter: 'B',
 *         frequency: 0.01492
 *     }
 * ]
 */

 // Listing 11-5. JSDoc-to-markdown output excerpt
 ## Bar
 Bar Chart Reusable API component that renders a
 simple and configurable bar chart.

 **Requires**: <code>module:d3</code>
 **Example**
 ```js
 const barChart = bar();

 barChart
     .height(500)
     .width(800);

 d3Selection.select('.css-selector')
     .datum(dataset)
     .call(barChart);
 ```
 * [Bar](#module_Bar)
     * [exports(_selection, _data)](#exp_module_Bar--exports)
         * [.height([_x])](#module_Bar--exports.height) ⇒ <code>Number</code> \| <code>Module</code>
         * [.margin(_x)](#module_Bar--exports.margin) ⇒ <code>Object</code> \| <code>Module</code>
         * [.on()](#module_Bar--exports.on) ⇒ <code>Module</code>
         * [.width([_x])](#module_Bar--exports.width) ⇒ <code>Number</code> \| <code>Module</code>

 <a name="exp_module_Bar--exports"></a>

 ### exports(_selection, _data) ⏏
 This function creates the chart using the selection as container

 **Kind**: Exported function

 | Param | Type | Description |
 | --- | --- | --- |
 | _selection | <code>D3Selection</code> | A d3 selection that represents                                      the container(s) where the chart(s) will be rendered |
 | _data | [<code>BarData</code>](#BarData) | The data to attach and generate the chart |

 <a name="module_Bar--exports.height"></a>

 #### exports.height([_x]) ⇒ <code>Number</code> \| <code>Module</code>
 Gets or Sets the height of the chart

 **Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)
 **Returns**: <code>Number</code> \| <code>Module</code> - Current height or Chart module to chain calls
 **Access**: public

 | Param | Type | Default | Description |
 | --- | --- | --- | --- |
 | [_x] | <code>Number</code> | <code>500</code> | Desired height for the chart |

// Listing 11-6. documentation.yml configuration with grouped sections and Readme
toc:
  - name: Homepage
    file: README.md
  - name: Charts
    children:
  - Bar
  - name: Data Schemas
    children:
      - bar

// Listing 11-7. Calling Documentation.js with a configuration file
"docs:serve": "documentation serve src/charts/** -f html --config documentation.yml",

// Listing 11-8. Calling Documentation.js with a theme
"docs:serve": "documentation serve src/charts/** -f html --config documentation.yml --theme src/docs/theme",

// Listing 11-9. The ESLint loader
exports.ESLintLoader = () => ({
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                include: /src/,
                exclude: /node_modules/,
                use: ['eslint-loader'],
                options: {
                    failOnError: true
                }
            }
        ]
    }
});

// Listing 11-10. ESLint configuration on package.json
"eslintConfig": {
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 8,
    "sourceType": "module"
  },
  "plugins": [
    "jsdoc"
  ],
  "env": {
    "browser": true,
    "es6": true
  },
  "rules": {
    "jsdoc/require-jsdoc": ["error"],
    "jsdoc/require-param": ["error"],
    "jsdoc/require-param-name": ["error"],
    "jsdoc/require-param-description": ["error"]
  }
},
