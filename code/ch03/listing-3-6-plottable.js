// Listing 3-6. Bar Chart with Plottable
import {letterFrequency} from './dataset';
import {Scales, Axes, Plots, Dataset, Components} from 'plottable';

require('plottable/plottable.css');

export const plottableBarChart = function() {
    const xScale = new Scales.Category();
    const yScale = new Scales.Linear();

    const xAxis = new Axes.Category(xScale, "bottom");
    const yAxis = new Axes.Numeric(yScale, "left");

    const plot = new Plots.Bar();
    plot.x(function(d) { return d.letter; }, xScale);
    plot.y(function(d) { return d.frequency; }, yScale);

    const dataset = new Dataset(letterFrequency);
    plot.addDataset(dataset);

    const chart = new Components.Table([[yAxis, plot], [null, xAxis]]);

    chart.renderTo("#plottable-container");
}
