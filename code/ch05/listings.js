// Listing 5-3. Declarting variables
let margin = {
    top: 20,
    bottom: 40,
    left: 40,
    right: 20
};
let width = 600;
let height = 400;


// Listing 5-4. Setting height and width
...
let chartWidth;
let chartHeight;

function exports(_selection) {
    _selection.each(function(_data) {
        data = _data;
        chartHeight = height - margin.bottom - margin.top;
        chartWidth = width - margin.left - margin.right;

        // Main sequence here
        buildSVG(this);
    });
}
...


// Listing 5-5. Building the root SVG
function buildSVG(container){
    if (!svg) {
        svg = d3.select(container)
            .append('svg')
            .classed('bar-chart', true)
              .append('g')
                .attr(
                    'transform',
                    `translate(${margin.left},${margin.top})`
                );
    }

    svg
        .attr('width', width)
        .attr('height', height);
}

// Listing 5-7. Building containers
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

// Listing 5-8. Scales and axes
function buildScales(){
    xScale = d3.scaleBand()
        .rangeRound([0, chartWidth])
        .padding(0.1)
        .domain(data.map(getLetter));

    yScale = d3.scaleLinear()
        .rangeRound([chartHeight, 0])
        .domain([0, d3.max(data, getFrequency)]);
}

// Listing 5-9. Extractor functions
const getFrequency = ({frequency}) => frequency;
const getLetter = ({letter}) => letter;

// Listing 5-10. Scales and Axes
function buildAxes(){
    xAxis = d3.axisBottom(xScale);

    yAxis = d3.axisLeft(yScale)
        .ticks(10, '%');
}

// Listing 5-11. Scales and Axes
function exports(_selection) {
    _selection.each(function(_data) {
        data = _data;
        chartHeight = height - margin.bottom - margin.top;
        chartWidth = width - margin.left - margin.right;

        // Main sequence here
        buildScales();
        buildAxes();
        buildSVG(this);
    });
}

// Listing 5-12. Scales and axes
function drawAxes(){
    svg.select('.x-axis-group.axis')
        .attr('transform', `translate(0,${chartHeight})`)
        .call(xAxis);

    svg.select('.y-axis-group.axis')
        .call(yAxis)
          .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '0.71em')
            .attr('text-anchor', 'end')
            .text('Frequency');
}

// Listing 5-13. Bars and accessors
function drawBars(){
    // Select the bars, and bind the data to the .bar elements
    let bars = svg.select('.chart-group').selectAll('.bar')
        .data(data);

    // Enter
    // Create bars for the new elements
    bars.enter()
      .append('rect')
        .classed('bar', true)
        .attr('x', ({letter}) => xScale(letter))
        .attr('y', ({frequency}) => yScale(frequency))
        .attr('width', xScale.bandwidth())
        .attr('height', ({frequency}) => chartHeight - yScale(frequency));

    // Exit
    // Remove old elements by first fading them
    bars.exit()
        .style('opacity', 0)
        .remove();
}

// Listing 5-14. Bars and accessors
exports.height = function(_x) {
    if (!arguments.length) {
        return height;
    }
    height = _x;

    return this;
};

// Listing 5-16. Events
// Dispatcher object that broadcast the 'customMouseOver' event
const dispatcher = d3.dispatch('customMouseOver');

// Listing 5-17. Wiring events
function drawBars(){
    // Select the bars, and bind the data to the .bar elements
    let bars = svg.select('.chart-group').selectAll('.bar')
        .data(data);

    // Enter
    // Create bars for the new elements
    bars.enter()
      .append('rect')
        .classed('bar', true)
        .attr('x', ({letter}) => xScale(letter))
        .attr('y', ({frequency}) => yScale(frequency))
        .attr('width', xScale.bandwidth())
        .attr('height', ({frequency}) => chartHeight - yScale(frequency))
        .on('mouseover', function(d) {
            dispatcher.call('customMouseOver', this, d);
        });

    // Exit
    // Remove old elements by first fading them
    bars.exit()
        .style('opacity', 0)
        .remove();
}

// Listing 5-18. Events
exports.on = function() {
    let value = dispatcher.on.apply(dispatcher, arguments);

    return value === dispatcher ? exports : value;
};


// Listing 5-19. Events
barChart.on('customMouseOver', function(event, data) {
    console.log('data', data);
});
