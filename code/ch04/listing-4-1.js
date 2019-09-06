// Listing 4-1. Reusable Chart API core pattern
import * as d3 from 'd3';

function chart() {
    // Private Attributes declaration

    function exports(_selection) {

        _selection.each(function(_data) {
            chartWidth = width - margin.left - margin.right;
            chartHeight = height - margin.top - margin.bottom;
            data = _data;

            buildScales();
            buildAxis();
            buildSVG(this);
            // .. Rest of building blocks

        });
    }

    // API

    return exports;
};

export default chart;
