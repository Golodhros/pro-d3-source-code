// Listing 1-1. D3.js Selections
const svg = d3.select('body')
    .append('svg')
    .attr('width', 400)
    .attr('height', 200)
    .style('background-color', 'purple');


// Listing 1-2. ES2015 destructuring and default parameters
// Before
function (object) {
    var radiant = object.radiant || '',
        luminous = object.luminous || '';

    // Use values
}

// With ES2015
function ({radiant = '', luminous = ''}) {
    // Use values
}


// Listing 1-3. Simpler code with ES2015 arrow functions
// Before
someArray.map(function(value) {
    return value + 1;
});

// With ES2015
someArray.map((value) => value + 1);


// Listing 1-4. String concatenation with ES2015 template literals
// Before
var newLight = 'The new luminosity is ' + light;

// With ES2015
let newLight = `The new luminosity is ${light}`;


// Listing 1-5. Simple array and object combinations with the spread operator
// Before
var lightArray = [ 'radiant', 'vivid' ];
var newLightArray = lightArray.concat([ 'shiny' ]);

var baseLightObject = {
        a: 'radiant',
        b: 'vivid'
    };
var extraObject = { b: 'silvery' };
var merged = _.extend({}, baseLightObject, extraObject);
// using underscore.js or lodash
var merged = $.extend({}, baseLightObject, extraObject);
// using jquery


// With ES2015
let newLightArray = [ ...lightArray, 'shiny' ];

let merged = { ...baseLightObject, ...extraObject };


// Listing 1-6. No variable re-assignments with const
const light = 'radiant';

light = 'silvery';
// Throws TypeError: Assignment to constant variable.


// Listing 1-7. ES2015 destructuring on function signature
// Before
function (object) {
    var vivid = object.vivid,
        luminous = object.luminous;

    // Use values
}

// With ES2015
function ({vivid, luminous}) {
    // Use values
}

// Listing 1-8. ES2015 rest parameters avoid the use of arguments
// Before
function (a, b) {
    // Transform it into a real array
    var arrayOfArguments = [].slice.call(arguments);

    // Use arguments
}

// With ES2015
function (...args) {
    // Use args
}

// Listing 1-9. ES2015 block scoped variables
// Before
function wrapperFunction(light) {
    // The var declaration gets hoisted at this level

    if (light) {
        var newLight = light;

        return newLight;
    } else {
        // newLight here is 'undefined'

        return 'vivid';
    }
    // newLight here is 'undefined' too!
}

// With ES2015
function wrapperFunction(light) {
    // newLight doesn't exist here

    if (light) {
        let newLight = light;
        // or
        const newLight = light;

        return newLight;
    } else {
        // newLight doesn't exist here either

        return 'vivid';
    }
    // newLight doesn't exist here
}