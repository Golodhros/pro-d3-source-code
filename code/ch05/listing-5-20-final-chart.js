// Listing 5-20. Final Bar Chart
import * as d3 from 'd3';

function bar() {
    // Attributes
    let data;
    let svg;
    let margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    };
    let width = 960;
    let height = 500;
    let chartWidth;
    let chartHeight;
    let xScale;
    let yScale;
    let xAxis;
    let yAxis;

    // Dispatcher object to broadcast the 'customHover' event
    const dispatcher = d3.dispatch('customMouseOver');

    // extractors
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
            drawBars();
        });
    }

    function buildAxes(){
        xAxis = d3.axisBottom(xScale);

        yAxis = d3.axisLeft(yScale)
            .ticks(10, '%');
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

    function buildScales(){
        xScale = d3.scaleBand()
            .rangeRound([0, chartWidth])
            .padding(0.1)
            .domain(data.map(getLetter));

        yScale = d3.scaleLinear()
            .rangeRound([chartHeight, 0])
            .domain([0, d3.max(data, getFrequency)]);
    }

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
                dispatcher.call('customMouseOver', this, d);
            });

        // Exit
        bars.exit()
            .style('opacity', 0)
            .remove();
    }

    exports.height = function(_x) {
        if (!arguments.length) {
            return height;
        }
        height = _x;

        return this;
    };

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

    exports.on = function() {
        let value = dispatcher.on.apply(dispatcher, arguments);

        return value === dispatcher ? exports : value;
    };

    exports.width = function(_x) {
        if (!arguments.length) {
            return width;
        }
        width = _x;

        return this;
    };

    return exports;
};

export default bar;
