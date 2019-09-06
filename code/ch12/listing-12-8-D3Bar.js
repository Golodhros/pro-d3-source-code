import * as d3 from "d3";
import bar from "./barChart";

const setChartProperty = (chart, configuration, key) => {
  if (configuration[key] || typeof configuration[key] === "string") {
    chart[key](configuration[key]);
  }
};

const applyConfiguration = (chart, configuration) => {
  Object.keys(configuration).forEach(
    setChartProperty.bind(null, chart, configuration)
  );

  return chart;
};

const D3Bar = {};

D3Bar.create = (el, data, configuration = {}) => {
  const container = d3.select(el);
  const chart = bar();

  container.datum(data).call(applyConfiguration(chart, configuration));

  return chart;
};

D3Bar.update = (el, data, configuration = {}, chart) => {
  const container = d3.select(el);

  // Calls the chart with the container and dataset
  if (data) {
    container.datum(data).call(applyConfiguration(chart, configuration));
  } else {
    container.call(applyConfiguration(chart, configuration));
  }

  return chart;
};

D3Bar.destroy = () => {};

export default D3Bar;
