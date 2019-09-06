// Listing 3-9. Bar Chart Loading in Vega
import {parse, View} from 'vega';

import * as data from './vega.json';

export const vegaBarChart = function() {
    let view;

    render(data);

    function render(spec) {
        view = new View(parse(spec))
            .renderer('svg')                // set renderer (canvas or svg)
            .initialize('#vega-container')  // initialize view within parent DOM container
            .hover()                        // enable hover encode set processing
            .run();
    }
}
