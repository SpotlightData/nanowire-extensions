import jmespath from 'jmespath';
import * as R from 'ramda';

function queryToString(query) {
  if (typeof query === 'string') {
    return query;
  } else if (!Array.isArray(query)) {
    // Can't use JSON.stringify as it breaks quotes
    const obj = Object.keys(query).reduce(
      (fullq, key, i) => `${fullq}${i !== 0 ? ',' : ''} ${key}: ${query[key]}`,
      ''
    );
    return `{${obj} }`;
  }
  throw `Invalid query type passed ${typeof query}`;
}

function buildBaseJsQuery(items) {
  if (typeof items === 'string') {
    return items;
  }
  return R.flatten(items)
    .map(queryToString)
    .join('');
}

export function buildJsQuery(spec) {
  if (Array.isArray(spec)) {
    if (spec.length === 0) {
      throw new Error('Query builder cannot be empty');
    }
    return buildBaseJsQuery(spec);
  } else if (typeof spec === 'string') {
    if (spec.length === 0) {
      throw new Error('Query builder cannot be empty');
    }
    return spec;
  }

  const { vars, query } = spec;

  return Object.keys(vars).reduce(
    (q, vName) => q.replace(new RegExp(vName, 'g'), queryToString(vars[vName])),
    buildBaseJsQuery(query)
  );
}

export function runJsQuery(data, query, or) {
  let resp;
  try {
    resp = jmespath.search(data, query);
  } catch (e) {
    if (or === undefined) {
      throw `Failed to run query: ${query}`;
    }
  }
  return resp || or;
}
