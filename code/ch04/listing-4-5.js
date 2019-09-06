// Listing 4-5. Creating Multiple Charts with the Reusable Chart API
import * as d3 from 'd3';
import chart from 'chart';

const myChart = chart();

const data = [...];
const container = d3.select('.container');

const alternativeData = [...];
const alternativeContainer = d3.select('.container-alt');

myChart
    .height(300)
    .width(600)
    .margin({
        top: 20,
        bottom: 20,
    });

container.datum(data).call(myChart);
alternativeContainer.datum(alternativeData).call(myChart);
