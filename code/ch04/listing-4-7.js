// Listing 4-7. Accessor Generation
import * as d3 from 'd3';

function chart() {
    // Private Attributes declaration
    const privateAttribute1 = 'value';
    const privateAttribute2 = 'value2';
    //...

    // Public Attributes declaration
    const publicAttributes = {
        margin: {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10,
        },
        width: 960,
        height: 500,
    };

    function exports(_selection) {

        _selection.each(function(_data) {
            //...

            buildScales();
            buildAxis();
            // .. Rest of building blocks
        });
    }

    // Building blocks functions

    function generateAccessor(attr) {
        function accessor(value) {
            if (!arguments.length) {
                return publicAttributes[attr];
            }
            publicAttributes[attr] = value;

            return chart;
        }

        return accessor;
    }

    // API Generation
    for (let attr in publicAttributes) {
        if (
            (!chart[attr]) &&
            (publicAttributes.hasOwnProperty(attr))
        ) {
            chart[attr] = generateAccessor(attr);
        }
    }

    return exports;
};

export default chart;

