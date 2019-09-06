// Listing 5-6. Building Containers
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

    function exports(_selection) {
        _selection.each(function(_data) {
            data = _data;
            chartHeight = height - margin.bottom - margin.top;
            chartWidth = width - margin.left - margin.right;

            // Main sequence here
            buildSVG(this);
        });
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
     * Builds the root SVG and gives it dimensions
     * @param  {HTMLElement} container DOM element that will work as the container of the graph
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

    return exports;
};

export default bar;
