import React from "react";
import PropTypes from "prop-types";

import D3Bar from "./D3Bar";

export default class BarChart extends React.Component {
  static propTypes = {
    /**
     * Internally used, do not overwrite.
     */
    data: PropTypes.arrayOf(PropTypes.any),

    /**
     * Gets or Sets the height of the chart
     */
    height: PropTypes.number,

    /**
     * Gets or Sets the margin of the chart
     */
    margin: PropTypes.shape({
      top: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
      right: PropTypes.number
    }),

    /**
     * Gets or Sets the width of the chart
     */
    width: PropTypes.number,

    /**
     * Internally used, do not overwrite.
     *
     * @ignore
     */
    chart: PropTypes.object
  };

  static defaultProps = {
    chart: D3Bar
  };

  componentDidMount() {
    const { height, width, margin } = this.props;
    const configuration = { height, width, margin };

    this._chart = this.props.chart.create(
      this._rootNode,
      this.props.data,
      configuration
    );
  }

  componentDidUpdate() {
    const { height, width, margin } = this.props;
    const configuration = { height, width, margin };

    this.props.chart.update(
      this._rootNode,
      this.props.data,
      configuration,
      this._chart
    );
  }

  componentWillUnmount() {
    this.props.chart.destroy(this._rootNode);
  }

  _setRef(componentNode) {
    this._rootNode = componentNode;
  }

  render() {
    return <div className="bar-container" ref={this._setRef.bind(this)} />;
  }
}
