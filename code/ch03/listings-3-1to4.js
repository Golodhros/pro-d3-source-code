// Listing 3-1. Object Oriented Programming Example
let chart = new Chart({ type: ‘Bar’, color: ‘blue’, data: […]});
chart.render();

// Listing 3-2. Declarative Programming Example
let chart = Chart.create({
    type: 'Bar',
    container: '.container',
    bar: {
        color: 'blue',
        padding: 5
    },
    data: [...]
});


// Listing 3-3. Functional Programming Example
let dimensions = {width: '400', height: '300'};
let xAxis = Library.categoricalDataAxis(x, dimensions, data);
let yAxis = Library.numericalDataAxis(y, dimensions, data);
let representation = Library.bars(dimensions, data);

let chart = Library.compose(xAxis, yAxis, representation);


// Listing 3-4. Chained Example
d3.selectAll('p')
    .attr('class', 'graf')
    .style('color', 'red');

// equivalent to
var p = d3.selectAll('p');
p.attr('class', 'graf');
p.style('color', 'red');