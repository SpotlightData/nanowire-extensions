import React from 'react';

// For some reason rollup does not find exports with es6 syntax
const { createClassFromSpec, default: Vega } = require('react-vega');

export function buildIndexTable(list) {
  // If we pass more than one chart, will index them correctly
  return list.reduce(
    (table, spec, i) => ({
      ...table,
      [i]: table.last,
      // As we can have more than one chart per handler
      last: table.last + spec.charts.length,
    }),
    { last: 0 }
  );
}

function listenerMiddleWare(cb) {
  return (type, data) => {
    if (data === null || Object.keys(data).length !== 0) {
      cb(type, data);
    }
  };
}

/**
 * Converts vega signal listeners to react-vega format.
 * @param {Object} listeners
 * @return {Object}
 */
function formatListeners(listeners) {
  return Object.keys(listeners).reduce(
    (dict, name) =>
      Object.assign({ [Vega.listenerName(name)]: listenerMiddleWare(listeners[name]) }, dict),
    {}
  );
}

export const createChart = (schema, data, props, listeners = {}) => {
  const schemaWithData = schema(data);
  const Chart = createClassFromSpec(schemaWithData);
  const listenerSpec = formatListeners(listeners);
  return <Chart {...listenerSpec} {...props} onParseError={console.error} />;
};
