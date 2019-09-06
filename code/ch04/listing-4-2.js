// Listing 4-2. Reusable Chart API accessors
exports.height = function(_x) {
    if (!arguments.length) {
        return height;
    }
    height = _x;

    return this;
};
