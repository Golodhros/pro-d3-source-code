// Listing 8-2. Grouped Bar Chart animationDuration accessor
exports.animationDuration = function (_x) {
    if (!arguments.length) {
        return animationDuration;
    }
    animationDuration = _x;

    return this;
};
