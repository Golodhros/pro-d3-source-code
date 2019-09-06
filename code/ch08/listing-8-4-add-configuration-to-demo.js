// Listing 8-4. Grouped Bar Chart demo with animationDuration
// GroupedAreChart Setup and start
groupedBar
    .tooltipThreshold(600)
    .animationDuration(2000)
    .width(containerWidth)
    .grid('horizontal')
    .isAnimated(true)
    .groupLabel('stack')
    .nameLabel('date')
    .valueLabel('views')
    .on('customMouseOver', function() {
        chartTooltip.show();
    })
    .on('customMouseMove', function(dataPoint, topicColorMap, x,y) {
        chartTooltip.update(dataPoint, topicColorMap, x, y);
    })
    .on('customMouseOut', function() {
        chartTooltip.hide();
    });
