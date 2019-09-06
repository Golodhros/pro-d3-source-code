// Listing 4-4. Using the Reusable Chart API
import * as d3 from 'd3';
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
