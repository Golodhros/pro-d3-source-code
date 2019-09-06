// Listing 3-7. Bar Chart with Billboard
import {letterFrequency} from './dataset';
import {bb} from 'billboard.js';

require('billboard.js/dist/billboard.css');

export const billboardBarChart = function() {

    // Data formatting
    const categories = letterFrequency.map(({letter}) => letter);
    const frequencies = letterFrequency.map(({frequency}) => frequency);

    bb.generate({
        data: {
            x: "x",
            columns: [
                ["x", ...categories],
                ["frequency", ...frequencies]
            ],
            type: "bar"
        },
        axis: {
            x: {
                type: "category"
            }
        },
        bindto: "#billboard-container"
    });
}
