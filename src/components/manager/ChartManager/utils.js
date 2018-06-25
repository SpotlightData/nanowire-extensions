import React from 'react';

// For some reason rollup does not find exports with es6 syntax
const { createClassFromSpec, default: Vega } = require('react-vega');

// import { configureBackEnd } from 'helpers/configureBackEnd';

// export function esConnection({ token, level, resourceId }) {
//   const backEnd = configureBackEnd(token);
//   const config = {
//     method: 'post',
//     url: '/searches/searchkit/_search',
//     headers: {
//       'x-level': level,
//       'x-resource-id': resourceId,
//       Authorization: `JWT ${token}`,
//       'Content-Type': 'application/json',
//     },
//   };
//   return ({ aggregation, ...data }) =>
//     backEnd({
//       ...config,
//       data,
//       aggregation,
//     }).pipe(map(([err, resp]) => resp || err));
// }

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
