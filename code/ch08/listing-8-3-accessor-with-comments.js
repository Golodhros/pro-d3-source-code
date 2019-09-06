// Listing 8-3. Grouped Bar Chart animationDuration accessor with comments
/**
 * Gets or Sets the duration of the bar grow animation
 * @param  {Number} _x=1000         Desired animationDuration for chart
 * @return {Number | module}        Current animationDuration or chart module to chain calls
 * @public
 */
exports.animationDuration = function (_x) {
    if (!arguments.length) {
        return animationDuration;
    }
    animationDuration = _x;

    return this;
};
