import * as d3 from 'd3'
import bar from './barChart';

const data = [
  {
    "letter": "A",
    "frequency": 0.08167
  },
  {
    "letter": "B",
    "frequency": 0.01492
  },
  {
    "letter": "C",
    "frequency": 0.02782
  },
  {
    "letter": "D",
    "frequency": 0.04253
  },
  {
    "letter": "E",
    "frequency": 0.12702
  },
  {
    "letter": "F",
    "frequency": 0.02288
  },
  {
    "letter": "G",
    "frequency": 0.02015
  },
  {
    "letter": "H",
    "frequency": 0.06094
  },
  {
    "letter": "I",
    "frequency": 0.06966
  },
  {
    "letter": "J",
    "frequency": 0.00153
  },
  {
    "letter": "K",
    "frequency": 0.00772
  },
  {
    "letter": "L",
    "frequency": 0.04025
  },
  {
    "letter": "M",
    "frequency": 0.02406
  },
  {
    "letter": "N",
    "frequency": 0.06749
  },
  {
    "letter": "O",
    "frequency": 0.07507
  },
  {
    "letter": "P",
    "frequency": 0.01929
  },
  {
    "letter": "Q",
    "frequency": 0.00095
  },
  {
    "letter": "R",
    "frequency": 0.05987
  },
  {
    "letter": "S",
    "frequency": 0.06327
  },
  {
    "letter": "T",
    "frequency": 0.09056
  },
  {
    "letter": "U",
    "frequency": 0.02758
  },
  {
    "letter": "V",
    "frequency": 0.00978
  },
  {
    "letter": "W",
    "frequency": 0.0236
  },
  {
    "letter": "X",
    "frequency": 0.0015
  },
  {
    "letter": "Y",
    "frequency": 0.01974
  },
  {
    "letter": "Z",
    "frequency": 0.00074
  }
];
const alternativeData = [
    {
      "letter": "E",
      "frequency": 0.12702
    },
    {
      "letter": "F",
      "frequency": 0.02288
    },
    {
      "letter": "G",
      "frequency": 0.02015
    },
    {
      "letter": "H",
      "frequency": 0.06094
    },
    {
      "letter": "I",
      "frequency": 0.06966
    },
    {
      "letter": "J",
      "frequency": 0.00153
    }
];

describe('Bar Chart', () => {
    let barChart;
    let container;

    beforeEach(() => {
        const fixture = '<div id="fixture"><div class="container"></div></div>';

        // adds an html fixture to the DOM
        document.body.insertAdjacentHTML('afterbegin', fixture);
    });

    // remove the html fixture from the DOM
    afterEach(function() {
        document.body.removeChild(document.getElementById('fixture'));
    });

    describe('Render', () => {

        beforeEach(() => {
            barChart = bar();
            container = d3.select('.container');

            container.datum(data).call(barChart);
        });

        afterEach(() => {
            container.remove();
        });

        it('should render a basic bar chart', () => {
            const expected = 1;
            const actual = container.select('.bar-chart').size();

            expect(actual).toEqual(expected);
        });

        describe('groups', () => {
            it('should create a container-group', () => {
                const expected = 1;
                const actual = container.select('g.container-group').size();

                expect(actual).toEqual(expected);
            });

            it('should create a chart-group', () => {
                const expected = 1;
                const actual = container.select('g.chart-group').size();

                expect(actual).toEqual(expected);
            });

            it('should create a x-axis-group', () => {
                const expected = 1;
                const actual = container.select('g.x-axis-group').size();

                expect(actual).toEqual(expected);
            });

            it('should create a y-axis-group', () => {
                const expected = 1;
                const actual = container.select('g.y-axis-group').size();

                expect(actual).toEqual(expected);
            });
        });

        describe('axis', () => {
            it('should draw an X axis', () => {
                const expected = 1;
                const actual = container.select('.x-axis-group.axis').size();

                expect(actual).toEqual(expected);
            });

            it('should draw an Y axis', () => {
                const expected = 1;
                const actual = container.select('.y-axis-group.axis').size();

                expect(actual).toEqual(expected);
            });
        });

        it('should draw a bar for each data entry', () => {
            const expected = data.length;
            const actual = container.selectAll('.bar').size();

            expect(actual).toEqual(expected);
        });

        describe('when reloading with a different dataset', () => {

            it('should render in the same svg', () => {
                const expected = 1;
                const newDataset = alternativeData;
                let actual;

                container.datum(newDataset).call(barChart);
                actual = container.selectAll('.bar-chart').size();

                expect(actual).toEqual(expected);
            });

            it('should render six bars', () => {
                const expected = 6;
                const newDataset = alternativeData;
                let actual;

                container.datum(newDataset).call(barChart);
                actual = container.selectAll('.bar-chart .bar').size();

                expect(actual).toEqual(expected);
            });
        });
    });

    describe('Lifecycle', () => {

        beforeEach(() => {
            barChart = bar();
            container = d3.select('.container');

            container.datum(data).call(barChart);
        });

        afterEach(() => {
            container.remove();
        });

        describe('when hovering a bar', () => {

            it('should trigger a callback once on mouse over', () => {
                const expected = 1;
                const firstBar = container.selectAll('.bar:nth-child(1)');
                const callbackSpy = jasmine.createSpy('callback');
                let actual;

                barChart.on('customMouseOver', callbackSpy);
                firstBar.dispatch('mouseover');
                actual = callbackSpy.calls.count();

                expect(actual).toEqual(expected);
            });

            it('should trigger the callback with the data entry as argument', () => {
                const expected = data[0];
                const firstBar = container.selectAll('.bar:nth-child(1)');
                const callbackSpy = jasmine.createSpy('callback');
                let actual;

                barChart.on('customMouseOver', callbackSpy);
                firstBar.dispatch('mouseover');
                actual = callbackSpy.calls.first().args[0];

                expect(actual).toEqual(expected);
            });
        });

        describe('when moving over a bar', () => {

            it('should trigger a callback once on mouse over', () => {
                const expected = 1;
                const firstBar = container.selectAll('.bar:nth-child(1)');
                const callbackSpy = jasmine.createSpy('callback');
                let actual;

                barChart.on('customMouseMove', callbackSpy);
                firstBar.dispatch('mousemove');
                actual = callbackSpy.calls.count();

                expect(actual).toEqual(expected);
            });

            it('should trigger the callback with the data entry as argument', () => {
                const expected = data[0];
                const firstBar = container.selectAll('.bar:nth-child(1)');
                const callbackSpy = jasmine.createSpy('callback');
                let actual;

                barChart.on('customMouseMove', callbackSpy);
                firstBar.dispatch('mousemove');
                actual = callbackSpy.calls.first().args[0];

                expect(actual).toEqual(expected);
            });
        });

        describe('when moving out of a bar', () => {

            it('should trigger a callback once on mouse out', () => {
                const expected = 1;
                const firstBar = container.selectAll('.bar:nth-child(1)');
                const callbackSpy = jasmine.createSpy('callback');
                let actual;

                barChart.on('customMouseOut', callbackSpy);
                firstBar.dispatch('mouseout');
                actual = callbackSpy.calls.count();

                expect(actual).toEqual(expected);
            });

            it('should trigger the callback with the data entry as argument', () => {
                const expected = data[0];
                const firstBar = container.selectAll('.bar:nth-child(1)');
                const callbackSpy = jasmine.createSpy('callback');
                let actual;

                barChart.on('customMouseOut', callbackSpy);
                firstBar.dispatch('mouseout');
                actual = callbackSpy.calls.first().args[0];

                expect(actual).toEqual(expected);
            });
        });

        describe('when clicking a bar', () => {

            it('should trigger a callback once on mouse click', () => {
                const expected = 1;
                const firstBar = container.selectAll('.bar:nth-child(1)');
                const callbackSpy = jasmine.createSpy('callback');
                let actual;

                barChart.on('customMouseClick', callbackSpy);
                firstBar.dispatch('click');
                actual = callbackSpy.calls.count();

                expect(actual).toEqual(expected);
            });

            it('should trigger the callback with the data entry as argument', () => {
                const expected = data[0];
                const firstBar = container.selectAll('.bar:nth-child(1)');
                const callbackSpy = jasmine.createSpy('callback');
                let actual;

                barChart.on('customMouseClick', callbackSpy);
                firstBar.dispatch('click');
                actual = callbackSpy.calls.first().args[0];

                expect(actual).toEqual(expected);
            });
        });
    });

    describe('API', () => {

        beforeEach(() => {
            barChart = bar();
            container = d3.select('.container');

            container.datum(data).call(barChart);
        });

        afterEach(() => {
            container.remove();
        });

        it('should provide height getter and setter', () => {
            const previous = barChart.height();
            const expected = 300;
            let actual;

            barChart.height(expected);
            actual = barChart.height();

            expect(previous).not.toEqual(actual);
            expect(actual).toEqual(expected);
        });

        it('should provide a event "on" getter and setter', () => {
            const callback = () => {};
            const expected = callback;
            let actual;

            barChart.on('customMouseClick', callback);
            actual = barChart.on('customMouseClick');

            expect(actual).toEqual(expected);
        });

        describe('margin', () => {

            it('should provide margin getter and setter', () => {
                const previous = barChart.margin();
                const expected = {top: 4, right: 4, bottom: 4, left: 4};
                let actual;

                barChart.margin(expected);
                actual = barChart.margin();

                expect(previous).not.toEqual(actual);
                expect(actual).toEqual(expected);
            });

            describe('when margins are set partially', () => {

                it('should override the default values', () => {
                    const previous = barChart.margin();
                    const expected = {
                        ...previous,
                        top: 10,
                        right: 20
                    };
                    let actual;

                    barChart.margin({
                        top: 10,
                        right: 20
                    });
                    actual = barChart.margin();

                    expect(previous).not.toEqual(actual);
                    expect(actual).toEqual(expected);
                })
            });
        });

        it('should provide width getter and setter', () => {
            const previous = barChart.width();
            const expected = 200;
            let actual;

            barChart.width(expected);
            actual = barChart.width();

            expect(previous).not.toEqual(actual);
            expect(actual).toEqual(expected);
        });
    });
});
