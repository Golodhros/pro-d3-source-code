import bar from './final-chart.js';
import * as d3 from 'd3';

let container = d3.select('.chart-container');
let barChart = bar();
let dataset = [...];

barChart
    .width(300)
    .height(200)
    .margin({
        left: 50,
        bottom: 30
    })
    .on('customMouseOver', function(event, data) {
        console.log('data', data);
    });

container.datum(dataset).call(barChart);
