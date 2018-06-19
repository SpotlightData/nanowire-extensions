import { flatten } from 'ramda';
import jmespath from 'jmespath';

function stringReg(str) {
  return new RegExp(str, 'g');
}

function queryToStr(query) {
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
  throw 'Unknown query passed';
}

function buildBaseJsQuery(list) {
  return flatten(list)
    .map(queryToStr)
    .join('');
}
/**
 * Makes easier to write jmespath specifications by allowing to use objects as well as arrays
 * @example
 *
 * const sizeJsQuery = buildJsQuery({
 *  vars: {
 *    SLD: '_source.jsonLD',
 *  },
 *  query: [
 *   'hits.hits[*]',
 *    '.',
 *    {
 *      taskId: '_id',
 *      fileSize: 'SLD.fileSize',
 *      fileType: 'SLD.fileFormat || SLD."@type"',
 *      name: 'SLD.name',
 *    },
 *    ],
 * });
 *
 * @param {object|(string|object)[]} spec - jmespath spec
 * @param {any} data - Data to be validated by the schema
 */
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
    (q, vName) => q.replace(stringReg(vName), queryToStr(vars[vName])),
    buildBaseJsQuery(query)
  );
}
/**
 * Helps to handle any failures that can occur when a jmespath spec is run
 * @param {object|any[]} data -- Data the query will be ran on
 * @param {string} query -- jmespath query
 * @param {any} or -- If query fails this will be returned
 */
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
