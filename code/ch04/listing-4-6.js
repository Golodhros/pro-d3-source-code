// Listing 4-6. Updating Properties
import * as d3 from 'd3';
import _ from 'underscore';

import chart from 'chart';

const data = [...];
const myChart = chart();
const container = d3.select('.container');

myChart
    .height(300)
    .width(600)
    .margin({
        top: 20,
        bottom: 20,
    });

container.datum(data).call(myChart);

const redrawChart = function(){
    const containerWidth = container.node()
        .getBoundingClientRect()
        .width;

    myChart.width(containerWidth);

    container.call(myChart);
};

// Redraw chart on window resize
const waitTime = 200;
window.addEventListener(
    'resize',
    _.throttle(redrawChart, waitTime)
);
