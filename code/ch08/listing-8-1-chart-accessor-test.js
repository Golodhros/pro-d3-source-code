// Listing 8-1. Grouped Bar Chart accessor test
it('should provide an animationDuration getter and setter', () => {
    let previous = groupedBarChart.animationDuration(),
        expected = 600,
        actual;

    groupedBarChart.animationDuration(expected);
    actual = groupedBarChart.animationDuration();

    expect(previous).not.toBe(expected);
    expect(actual).toBe(expected);
});
