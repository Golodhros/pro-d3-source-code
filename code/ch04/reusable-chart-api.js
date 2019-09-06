import * as d3 from 'd3';

function chart() {
    let svg;
    let data;

    let chartHeight;
    let chartWidth;
    let height = 400;
    let width = 800;
    let margin = {
        bottom: 10,
        left: 10,
        right: 10,
        top: 10,
    };

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
    exports.height = function(_x) {
        if (!arguments.length) {
            return height;
        }
        height = _x;

        return this;
    };

    exports.margin = function(_x) {
        if (!arguments.length) {
            return margin;
        }
        margin = _x;

        return this;
    };

    exports.width = function(_x) {
        if (!arguments.length) {
            return width;
        }
        width = _x;

        return this;
    };

    return exports;
};

export default chart;
