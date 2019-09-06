import * as d3 from 'd3';

function bar() {
    let data;
    let svg;
    let margin = {
        top: 20,
        bottom: 40,
        left: 40,
        right: 20
    };
    let width = 600;
    let height = 400;
    let chartWidth;
    let chartHeight;
    let xScale;
    let yScale;
    let xAxis;
    let yAxis;

    const getFrequency = ({frequency}) => frequency;
    const getLetter = ({letter}) => letter;

    function exports(_selection) {
        _selection.each(function(_data) {
            data = _data;
            chartHeight = height - margin.bottom - margin.top;
            chartWidth = width - margin.left - margin.right;

            // Main sequence here
            buildScales();
            buildAxes();
            buildSVG(this);
            drawAxes();
        });
    }

    /**
     * Creates the d3 x and y axes, setting orientations
     * @private
     */
    function buildAxes(){
        xAxis = d3.axisBottom(xScale);

        yAxis = d3.axisLeft(yScale)
            .ticks(10, '%');
    }

    /**
     * Builds containers for the chart, the axis and a wrapper for all of them
     * Also applies the Margin convention
     * @private
     */
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

    /**
     * Creates the x and y scales of the graph
     * @private
     */
    function buildScales(){
        xScale = d3.scaleBand()
            .rangeRound([0, chartWidth])
            .padding(0.1)
            .domain(data.map(getLetter));

        yScale = d3.scaleLinear()
            .rangeRound([chartHeight, 0])
            .domain([0, d3.max(data, getFrequency)]);
    }

    /**
     * Builds the root SVG and gives it dimensions
     * @param  {HTMLElement} container DOM element that will work as the container of the graph
     * @private
     */
    function buildSVG(container){
        if (!svg) {
            svg = d3.select(container)
                .append('svg')
                .classed('bar-chart', true);

            buildContainerGroups()
        }

        svg
            .attr('width', width)
            .attr('height', height);
    }

    /**
     * Draws the x and y axis on the svg object within their
     * respective groups
     * @private
     */
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

    return exports;
};

export default bar;
