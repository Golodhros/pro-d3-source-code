// Listing 5-1. Core Pattern
import * as d3 from 'd3';

function bar() {
    let data;

    function exports(_selection) {
        _selection.each(function(_data) {
            data = _data;

            // Main sequence here
        });
    }

    return exports;
};

export default bar;
