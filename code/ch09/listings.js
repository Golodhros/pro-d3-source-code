// Listing 9-1. Test script in package.json
"scripts": {
    "test": "karmatic"
}

// Listing 9-2. Dumb test to make sure testing works
describe('Dumb Test', () => {
    it('should pass', () => {
        expect(true).toEqual(true);
    });
});

// Listing 9-3. Running the dumb test in the command line

  Dumb Test
    ✓ should pass
Executed 1 of 1 SUCCESS (0.002 secs / 0.002 secs)


=============================== Coverage summary ===============================
Statements   : 100% ( 0/0 )
Branches     : 100% ( 0/0 )
Functions    : 100% ( 0/0 )
Lines        : 100% ( 0/0 )
================================================================================
✨  Done in 4.50s.

// Listing 9-4. DOM fixture with Karmatic
const data = [
  {
    "letter": "A",
    "frequency": 0.08167
  },
  ...
];

describe('Bar Chart', () => {
    let barChart;
    let container;

    beforeEach(() => {
        const fixture = '<div id="fixture"><div class="container"></div></div>';

        // adds an html fixture to the DOM
        document.body.insertAdjacentHTML('afterbegin', fixture);
    });

    // remove the html fixture from the DOM
    afterEach(function() {
        document.body.removeChild(document.getElementById('fixture'));
    });
});

// Listing 9-5. Render describe clause
describe('Render', () => {

    beforeEach(() => {
        barChart = bar();
        container = d3.select('.container');

        container.datum(data).call(barChart);
    });

    afterEach(() => {
        container.remove();
    });
});

// Listing 9-6. Test for the root element existence
it('should render a basic bar chart', () => {
    const expected = 1;
    const actual = container.select('.bar-chart').size();

    expect(actual).toEqual(expected);
});

// Listing 9-7. Creating the container
import * as d3 from 'd3';

function bar() {
    // Variable creation

    function exports(_selection){
        _selection.each(function(_data){
            data = _data;
            chartHeight = height - margin.top - margin.bottom;
            chartWidth = width - margin.left - margin.right;

            buildSVG(this);
        });
    }

    function buildSVG(container){
        if (!svg) {
            svg = d3.select(container)
              .append('svg')
                .classed('bar-chart', true);
        }
        svg
            .attr('width', width)
            .attr('height', height);
    }

    return exports;
};

export default bar;

// Listing 9-8. Container group tests
describe('groups', () => {

    it('should create a container-group', () => {
        const expected = 1;
        const actual = container.select('g.container-group').size();

        expect(actual).toEqual(expected);
    });

    it('should create a chart-group', () => {
        const expected = 1;
        const actual = container.select('g.chart-group').size();

        expect(actual).toEqual(expected);
    });

    it('should create a x-axis-group', () => {
        const expected = 1;
        const actual = container.select('g.x-axis-group').size();

        expect(actual).toEqual(expected);
    });

    it('should create a y-axis-group', () => {
        const expected = 1;
        const actual = container.select('g.y-axis-group').size();

        expect(actual).toEqual(expected);
    });
});

// Listing 9-9. Rendering the container groups
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

function buildContainerGroups(){
    let container = svg
      .append('g')
        .classed('container-group', true)
        .attr(
            'transform',
            `translate(${margin.left},${margin.top})`
        );

    container
      .append('g')
        .classed('chart-group', true);
    container
      .append('g')
        .classed('x-axis-group axis', true);
    container
      .append('g')
        .classed('y-axis-group axis', true);
}

// Listing 9-10. Testing the axes drawing
describe('axis', () => {
    it('should draw an X axis', () => {
        const expected = 1;
        const actual = container.select('.x-axis-group.axis').size();

        expect(actual).toEqual(expected);
    });

    it('should draw an Y axis', () => {
        const expected = 1;
        const actual = container.select('.y-axis-group.axis').size();

        expect(actual).toEqual(expected);
    });
});

// Listing 9-11. Code to draw the axes
const getFrequency = ({frequency}) => frequency;
const getLetter = ({letter}) => letter;

function exports(_selection){
    _selection.each(function(_data){
        data = _data;
        chartHeight = height - margin.top - margin.bottom;
        chartWidth = width - margin.left - margin.right;

        buildScales();
        buildAxes();
        buildSVG(this);
        drawAxes();
    });
}

function buildAxes(){
    xAxis = d3.axisBottom(xScale);

    yAxis = d3.axisLeft(yScale)
        .ticks(10, '%');
}

function buildScales(){
    xScale = d3.scaleBand()
        .rangeRound([0, chartWidth])
        .padding(0.1)
        .domain(data.map(getLetter));

    yScale = d3.scaleLinear()
        .rangeRound([chartHeight, 0])
        .domain([0, d3.max(data, getFrequency)]);
}

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

// Listing 9-12. Test for the bars
it('should draw a bar for each data entry', () => {
    const expected = data.length;
    const actual = container.selectAll('.bar').size();

    expect(actual).toEqual(expected);
});

// Listing 9-13. Code for drawing the bars
function exports(_selection){
    _selection.each(function(_data){
        data = _data;
        chartHeight = height - margin.top - margin.bottom;
        chartWidth = width - margin.left - margin.right;

        buildScales();
        buildAxes();
        buildSVG(this);
        drawAxes();
        drawBars();
    });
}

function drawBars(){
    let bars = svg.select('.chart-group').selectAll('.bar')
        .data(data);

    // Enter
    bars.enter()
      .append('rect')
        .classed('bar', true)
        .attr('x', ({letter}) => xScale(letter))
        .attr('y', ({frequency}) => yScale(frequency))
        .attr('width', xScale.bandwidth())
        .attr('height', ({frequency}) => chartHeight - yScale(frequency));

    // Exit
    bars.exit()
        .style('opacity', 0)
        .remove();
}

// Listing 9-14. Checking for data reload
describe('when reloading with a different dataset', () => {

    it('should render in the same svg', () => {
        const expected = 1;
        const newDataset = alternativeData;
        let actual;

        container.datum(newDataset).call(barChart);
        actual = container.selectAll('.bar-chart').size();

        expect(actual).toEqual(expected);
    });

    it('should render six bars', () => {
        const expected = 6;
        const newDataset = alternativeData;
        let actual;

        container.datum(newDataset).call(barChart);
        actual = container.selectAll('.bar-chart .bar').size();

        expect(actual).toEqual(expected);
    });
});

// Listing 9-15. Testing the mouse over event
describe('Lifecycle', () => {

    beforeEach(() => {
        barChart = bar();
        container = d3.select('.container');

        container.datum(data).call(barChart);
    });

    afterEach(() => {
        container.remove();
    });

    describe('when hovering a bar', () => {

        it('should trigger a callback once on mouse over', () => {
            const expected = 1;
            const firstBar = container.selectAll('.bar:nth-child(1)');
            const callbackSpy = jasmine.createSpy('callback');
            let actual;

            barChart.on('customMouseOver', callbackSpy);
            firstBar.dispatch('mouseover');
            actual = callbackSpy.calls.count();

            expect(actual).toEqual(expected);
        });
    });
});

// Listing 9-16. Enabling event triggering on the bar chart
const dispatcher = d3.dispatch('customMouseOver');

//...

function drawBars(){
    let bars = svg.select('.chart-group').selectAll('.bar')
        .data(data);

    // Enter
    bars.enter()
      .append('rect')
        .classed('bar', true)
        .attr('x', ({letter}) => xScale(letter))
        .attr('y', ({frequency}) => yScale(frequency))
        .attr('width', xScale.bandwidth())
        .attr('height', ({frequency}) => chartHeight - yScale(frequency))
        .on('mouseover', function(d) {
            dispatcher.call('customMouseOver', this);
        });

    // Exit
    bars.exit()
        .style('opacity', 0)
        .remove();
}

//...

exports.on = function() {
    let value = dispatcher.on.apply(dispatcher, arguments);

    return value === dispatcher ? exports : value;
};

// Listing 9-17. Test looking for the datapoint information
it('should trigger the callback with the data entry as argument', () => {
    const expected = data[0];
    const firstBar = container.selectAll('.bar:nth-child(1)');
    const callbackSpy = jasmine.createSpy('callback');
    let actual;

    barChart.on('customMouseOver', callbackSpy);
    firstBar.dispatch('mouseover');
    actual = callbackSpy.calls.first().args[0];

    expect(actual).toEqual(expected);
});

// Listing 9-18. Passing down the data entry
//...
// Enter
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

// Listing 9-19. Tests for mouse over, out and click events
describe('when moving over a bar', () => {

    it('should trigger a callback once on mouse over', () => {
        const expected = 1;
        const firstBar = container.selectAll('.bar:nth-child(1)');
        const callbackSpy = jasmine.createSpy('callback');
        let actual;

        barChart.on('customMouseMove', callbackSpy);
        firstBar.dispatch('mousemove');
        actual = callbackSpy.calls.count();

        expect(actual).toEqual(expected);
    });

    it('should trigger the callback with the data entry as argument', () => {
        const expected = data[0];
        const firstBar = container.selectAll('.bar:nth-child(1)');
        const callbackSpy = jasmine.createSpy('callback');
        let actual;

        barChart.on('customMouseMove', callbackSpy);
        firstBar.dispatch('mousemove');
        actual = callbackSpy.calls.first().args[0];

        expect(actual).toEqual(expected);
    });
});

describe('when moving out of a bar', () => {

    it('should trigger a callback once on mouse out', () => {
        const expected = 1;
        const firstBar = container.selectAll('.bar:nth-child(1)');
        const callbackSpy = jasmine.createSpy('callback');
        let actual;

        barChart.on('customMouseOut', callbackSpy);
        firstBar.dispatch('mouseout');
        actual = callbackSpy.calls.count();

        expect(actual).toEqual(expected);
    });

    it('should trigger the callback with the data entry as argument', () => {
        const expected = data[0];
        const firstBar = container.selectAll('.bar:nth-child(1)');
        const callbackSpy = jasmine.createSpy('callback');
        let actual;

        barChart.on('customMouseOut', callbackSpy);
        firstBar.dispatch('mouseout');
        actual = callbackSpy.calls.first().args[0];

        expect(actual).toEqual(expected);
    });
});

describe('when clicking a bar', () => {

    it('should trigger a callback once on mouse click', () => {
        const expected = 1;
        const firstBar = container.selectAll('.bar:nth-child(1)');
        const callbackSpy = jasmine.createSpy('callback');
        let actual;

        barChart.on('customMouseClick', callbackSpy);
        firstBar.dispatch('click');
        actual = callbackSpy.calls.count();

        expect(actual).toEqual(expected);
    });

    it('should trigger the callback with the data entry as argument', () => {
        const expected = data[0];
        const firstBar = container.selectAll('.bar:nth-child(1)');
        const callbackSpy = jasmine.createSpy('callback');
        let actual;

        barChart.on('customMouseClick', callbackSpy);
        firstBar.dispatch('click');
        actual = callbackSpy.calls.first().args[0];

        expect(actual).toEqual(expected);
    });
});

// Listing 9-20. Code for the rest of events
//...
const dispatcher = d3.dispatch('customMouseOver', 'customMouseMove', 'customMouseOut', 'customMouseClick');
//...
// Enter
bars.enter()
  .append('rect')
    .classed('bar', true)
    .attr('x', ({letter}) => xScale(letter))
    .attr('y', ({frequency}) => yScale(frequency))
    .attr('width', xScale.bandwidth())
    .attr('height', ({frequency}) => chartHeight - yScale(frequency))
    .on('mouseover', function(d) {
        dispatcher.call('customMouseOver', this, d);
    })
    .on('mousemove', function(d) {
        dispatcher.call('customMouseMove', this, d);
    })
    .on('mouseout', function(d) {
        dispatcher.call('customMouseOut', this, d);
    })
    .on('click', function(d) {
        dispatcher.call('customMouseClick', this, d);
    });

// Listing 9-21. Test for the height accessor
describe('API', () => {

    beforeEach(() => {
        barChart = bar();
        container = d3.select('.container');

        container.datum(data).call(barChart);
    });

    afterEach(() => {
        container.remove();
    });

    it('should provide height getter and setter', () => {
        const previous = barChart.height();
        const expected = 300;
        let actual;

        barChart.height(expected);
        actual = barChart.height();

        expect(previous).not.toEqual(actual);
        expect(actual).toEqual(expected);
    });
});

// Listing 9-22. Code for the height accessor
exports.height = function(_x) {
    if (!arguments.length) {
        return height;
    }
    height = _x;

    return this;
};

// Listing 9-23. Test for the "on" accessor
it('should provide a event "on" getter and setter', () => {
    const callback = () => {};
    const expected = callback;
    let actual;

    barChart.on('customMouseClick', callback);
    actual = barChart.on('customMouseClick');

    expect(actual).toEqual(expected);
});

// Listing 9-24. Testing the margin object accessor
describe('margin', () => {

    it('should provide margin getter and setter', () => {
        const previous = barChart.margin();
        const expected = {top: 4, right: 4, bottom: 4, left: 4};
        let actual;

        barChart.margin(expected);
        actual = barChart.margin();

        expect(previous).not.toEqual(actual);
        expect(actual).toEqual(expected);
    });

    describe('when margins are set partially', () => {

        it('should override the default values', () => {
            const previous = barChart.margin();
            const expected = {
                ...previous,
                top: 10,
                right: 20
            };
            let actual;

            barChart.margin({
                top: 10,
                right: 20
            });
            actual = barChart.margin();

            expect(previous).not.toEqual(actual);
            expect(actual).toEqual(expected);
        })
    });
});

// Listing 9-25. Code for the margin accessor
exports.margin = function(_x) {
    if (!arguments.length) {
        return margin;
    }
    margin = {
        ...margin,
        ..._x
    };

    return this;
};

// Listing 9-26. Code coverage summary
Executed 23 of 23 SUCCESS (0.319 secs / 0.264 secs)


=============================== Coverage summary ===============================
Statements   : 100% ( 60/60 )
Branches     : 100% ( 10/10 )
Functions    : 100% ( 22/22 )
Lines        : 100% ( 58/58 )
================================================================================
✨  Done in 8.03s.
