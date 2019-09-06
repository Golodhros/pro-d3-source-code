// Listing 3-11. Bar Chart with Britecharts
import {letterFrequency} from './dataset';
import {bar} from 'britecharts';
import {select} from 'd3-selection';

require('britecharts/dist/css/britecharts.css');

export const britechartsBarChart = function() {
    const barChart = bar();
    const barContainer = select('#britecharts-container');

    barChart
        .valueLabel('frequency')
        .nameLabel('letter')
        .width(800)
        .height(400);

    barContainer.datum(letterFrequency).call(barChart);
}
