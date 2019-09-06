// Listing 7-1. Downloading Britecharts
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3-selection/1.2.0/d3-selection.js"></script>

<script src=" https://cdn.jsdelivr.net/npm/britecharts@2.11.0/dist/bundled/britecharts.min.js" type="text/javascript"></script>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/britecharts@2.11.0/dist/css/britecharts.min.css" type="text/css" />

// Listing 7-2. Setting up the container, data set and chart instance
<body>
    <div class="line-container"></div>

    <script>
        const container = d3.select('.line-container');
        const lineChart = britecharts.line();

    </script>
</body>

// Listing 7-3. Line chart required data schema
const lineData = {
    data: [
        {
            topicName: 'San Francisco',
            name: 1,
            date: '2017-01-16T16:00:00-08:00',
            value: 1
        },
        {
            topicName: 'San Francisco',
            name: 1,
            date: '2017-01-17T16:00:00-08:00',
            value: 2
        },
        {
            topicName: 'Oakland',
            name: 2,
            date: '2017-01-16T16:00:00-08:00',
            value: 3
        },
        {
            topicName: 'Oakland',
            name: 2,
            date: '2017-01-17T16:00:00-08:00',
            value: 7
        }
    ]
};

// Listing 7-4. Finding out the container’s width
const containerWidth = container.node().getBoundingClientRect().width;

// Listing 7-5. Configuring and rendering a simple line chart
lineChart
    .margin({bottom: 50})
    .height(400)
    .width(containerWidth);

container.datum(lineData).call(lineChart);

// Listing 7-6. Final code of the simple line chart
<div class="line-container"></div>

<script>
    // Instantiate line chart and container
    const lineChart = britecharts.line();
    const container = d3.select('.line-container');
    const containerWidth = container.node().getBoundingClientRect().width;

    // Create Dataset with proper shape
    const lineData = {...};

    // Configure chart
    lineChart
        .margin({bottom: 50})
        .height(400)
        .width(containerWidth);

    container.datum(lineData).call(lineChart);
</script>

// Listing 7-7. Responding to viewport width changes
const redrawChart = () => {
    const newContainerWidth = container.node() ? container.node().getBoundingClientRect().width : false;

    // Setting the new width on the chart
    lineChart.width(newContainerWidth);

    // Rendering the chart again
    container.call(lineChart);
};
// Create a throttled redrawChart function
const throttledRedraw = _.throttle(redrawChart, 200);

window.addEventListener("resize", throttledRedraw);

// Listing 7-8. Loading the Lodash library via CDN
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.min.js" type="text/javascript"/></script>


// Listing 7-9. Instantiating and wiring the tooltip
const chartTooltip = tooltip();
//…

lineChart
    .margin({bottom: 50})
    .height(400)
    .width(containerWidth)
    .on('customMouseOver', chartTooltip.show)
    .on('customMouseMove', chartTooltip.update)
    .on('customMouseOut', chartTooltip.hide);


// Listing 7-10. Rendering the tooltip
const tooltipContainer = d3.select('.line-container .metadata-group .hover-marker');

tooltipContainer.call(chartTooltip);

// Listing 7-11. Instantiating the legend
<div class="legend-container"></div>

const chartLegend = britecharts.legend();
const legendContainer = d3.select('.legend-container');

// Listing 7-12. Legend data schema
 [
    {
        id: 1,
        quantity: 2,
        name: 'glittering'
    },
    {
        id: 2,
        quantity: 3,
        name: 'luminous'
    }
]

// Listing 7-13. Creating the legend data
const legendData = lineData.data.reduce(
    (accum, item) => {
        let found = accum.find((element) => element.id === item.name);
        if (found) { return accum; }

        return [
            {
                id: item.name,
                name: item.topicName
            },
            ...accum
        ];
    },
    []
);

// Listing 7-14. Configuring and drawing the legend
chartLegend
    .width(containerWidth)
    .height(60)
    .isHorizontal(true);

legendContainer.datum(legendData).call(chartLegend);

// Listing 7-15. Instantiating the brush
<div class="brush-container"></div>

const chartBrush = britecharts.brush();
const brushContainer = d3.select('.brush-container');

// Listing 7-16. Brush data schema
[
    {
        value: 1,
        date: "2011-01-06T00:00:00Z"
    },
    {
        value: 2,
        date: "2011-01-07T00:00:00Z"
    }
]

// Listing 7-17. Generating the brush data
const lineDataCopy = JSON.parse(JSON.stringify(lineData));
const brushData = lineDataCopy.data.reduce(
    (accum, d) => {
        let found;

        accum.forEach((item) => {
            if (item.date === d.date) {
                item.value = item.value + d.value;
                found = true;

                return;
            }
        });

        if (found) {
            return accum;
        }

        return [d, ...accum];
    },
    []
);

// Listing 7-18. Configuring and drawing the brush
chartBrush
    .width(containerWidth)
    .height(100)
    .xAxisFormat(chartBrush.axisTimeCombinations.DAY_MONTH)
    .margin({top:0, bottom: 40, left: 50, right: 30});

brushContainer.datum(brushData).call(chartBrush);

// Listing 7-19. Wiring the brush event with the line chart
chartBrush
    .width(containerWidth)
    .height(100)
    .xAxisFormat(chartBrush.axisTimeCombinations.DAY_MONTH)
    .margin({ top: 0, bottom: 40, left: 50, right: 30 })
    .on('customBrushEnd', ([brushStart, brushEnd]) => {
        if (brushStart && brushEnd) {
            let filteredLineData = filterData(brushStart, brushEnd);

            container.datum(filteredLineData).call(lineChart);
        }
    });

// Listing 7-20. Data filtering logic
const isInRange = (startDate, endDate, {date}) => new Date(date) >= startDate && new Date(date) <= endDate;

const filterData = (brushStart, brushEnd) => {
    // Copy the data
    let lineDataCopy = JSON.parse(JSON.stringify(lineData));

    lineDataCopy.data = lineDataCopy.data.reduce(
        (accum, item) => {
            if (!isInRange(brushStart, brushEnd, item)) {
                return accum;
            }

            return [...accum, item];
        },
        []
    );

    return lineDataCopy;
};

// Listing 7-21. Applying color schemas to line and legend
const colorSchemas = britecharts.colors.colorSchemas;

...

lineChart
    .margin({ bottom: 50 })
    .height(400)
    .width(containerWidth)
    .colorSchema(colorSchemas.orange)
    .on('customMouseOver', chartTooltip.show)
    .on('customMouseMove', chartTooltip.update)
    .on('customMouseOut', chartTooltip.hide);

...

chartLegend
    .height(60)
    .width(containerWidth)
    .colorSchema(colorSchemas.orange)
    .isHorizontal(true);

// Listing 7-22. Color palette example
// Britecharts palette
["#6aedc7", "#39c2c9", "#ffce00", "#ffa71a", "#f866b9", "#998ce3"]

// Listing 7-23. Loading a Google font
<link href="https://fonts.googleapis.com/css?family=Oswald:600" rel="stylesheet">

// Listing 7-24. Overriding the font styles
<style>
    .britechart,
    .tick text {
        font-family: 'Oswald', sans-serif;
    }
    .brush-chart rect.brush-rect.handle {
        fill: #ffa71a;
    }
</style>

// Listing 7-25. Styling the brush
// Configure and draw the brush chart
chartBrush
    .width(containerWidth)
    .height(100)
    .gradient(colorSchemas.orange.slice(0, 2))
    .xAxisFormat(chartBrush.axisTimeCombinations.DAY_MONTH)
    .margin({ top: 0, bottom: 40, left: 50, right: 30 })
    .on('customBrushEnd', function ([brushStart, brushEnd]) {
        if (brushStart && brushEnd) {
            let filteredLineData = filterData(brushStart, brushEnd);

            container.datum(filteredLineData).call(lineChart);
        }
    });
