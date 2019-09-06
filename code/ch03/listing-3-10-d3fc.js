// Listing 3-10. Bar Chart with D3FC
import {letterFrequency} from './dataset';
import * as fc from 'd3fc';
import * as d3 from 'd3';


export const d3fcBarChart = function() {
    const barSeries = fc.autoBandwidth(fc.seriesSvgBar())
        .crossValue(d => d.letter)
            .align('left')
        .mainValue(d => d.frequency)
        .decorate((selection) => {
            selection.select('path')
                .style('fill', 'steelblue');
        });

    const yExtent = fc.extentLinear()
        .accessors([d => d.frequency])
        .pad([0, 0.1])
        .include([0]);

    const chart = fc.chartSvgCartesian(
            d3.scaleBand(),
            d3.scaleLinear()
        )
        .xDomain(letterFrequency.map(d => d.letter))
        .xPadding(0.2)
        .yDomain(yExtent(letterFrequency))
        .yTicks(10, '%')
        .yOrient('left')
        .plotArea(barSeries);

    d3.select('#d3fc-container')
        .datum(letterFrequency)
        .call(chart);
}
