// Listing 4-3. Margin Accessor
exports.margin = function(_x) {
    if (!arguments.length) {
        return margin;
    }
    margin = {
        ...margin,
        ..._x
    };

    return this;
};
