// Listing 12-1. A data join example from our bar chart
g.selectAll(".bar")
    .data(data)
    .enter()
      .append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.letter); })
        .attr("y", function(d) { return y(d.frequency); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.frequency); });

// Listing 12-2. D3.js within React example
import React from 'react';
import * as d3 from 'd3';

class Line extends React.Component {
    componentDidMount() {
        // D3 Code to create the chart
        // using this._rootNode as container
    }

    shouldComponentUpdate() {
        // Prevents component re-rendering
        return false;
    }

    render() {
        return(
            <svg
                className="line-container"
                ref={this._setRef.bind(this)}
            />
        )
    }
}

// Listing 12-3. React Faux DOM example
import React from 'react';
import * as d3 from 'd3';
import {withFauxDOM} from 'react-faux-dom';

class Line extends React.Component {
    componentDidMount() {
        // Creates a fake div and stores its virtual DOM inside the 'chart' prop
        const faux = this.props.connectFauxDOM('div', 'chart');

        // D3 Code to create the chart
        // using faux as container
        d3.select(faux)
          .append('svg')
            {...}

        this.props.animateFauxDOM(800);
    }

    render() {
        <div className="line-container">
           {this.props.chart}
        </div>
    }
}

export default withFauxDOM(Line);

// Listing 12-4. Lifecycle methods wrapper example
import React from 'react';
import D3Line from './D3Line';

class Line extends React.Component {
    componentDidMount() {
        // D3 Code to create the chart
        this._chart = D3Line.create(
            this._rootNode,
            this.props.data,
            this.props.config
        );
    }

    componentDidUpdate() {
        // D3 Code to update the chart
        D3Line.update(
           this._rootNode,
           this.props.data,
           this.props.config,
           this._chart
        );
    }

    componentWillUnmount() {
        D3Line.destroy(this._rootNode);
    }

    _setRef(componentNode) {
        this._rootNode = componentNode;
    }

    render() {
        <div
            className="line-container"
            ref={this._setRef.bind(this)}
        />
    }
}

// Listing 12-5. Lifecycle methods chart facade example
const D3Line = {};

D3Line.create = (el, data, configuration) => {
    // D3.js Code to create the chart
};

D3Line.update = (el, data, configuration, chart) => {
    // D3.js Code to update the chart
};

D3Line.destroy = () => {
    // Cleaning code here
};

export default D3Line;

// Listing 12-6. D3.js for the Math, React for the DOM example
import React from 'react';
import * as d3 from 'd3';

class Line extends React.Component {
    drawLine() {
        let xScale = d3.scaleTime()
            .domain(d3.extent(
                this.props.data,
                ({date}) => date
            ))
            .rangeRound([0, this.props.width]);

        let yScale = d3.scaleLinear()
            .domain(d3.extent(
                this.props.data,
                ({value}) => value
            ))
            .rangeRound([this.props.height, 0]);

        let line = d3.line()
            .x((d) => xScale(d.date))
            .y((d) => yScale(d.value));

        return (
            <path
                className="line"
                d={line(this.props.data)}
            />
        );
    }

    render() {
        <svg
           className="line-container"
           width={this.props.width}
           height={this.props.height}
        >
           {this.drawLine()}
        </svg>
    }
}
