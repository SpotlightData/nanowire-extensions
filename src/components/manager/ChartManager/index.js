import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import sid from 'shortid';
import { propOr, equals, clone } from 'ramda';
import { of, from } from 'rxjs';
import { mergeAll, switchMap } from 'rxjs/operators';

import { placeHolderSub, identity } from '../../../shared/constants';
import { createChart as defaultCreateChart, buildIndexTable } from './utils';

export class ChartManager extends PureComponent {
  state = { charts: {} };

  charts$ = placeHolderSub;

  componentDidMount() {
    const { specs, connection, requestBuilder } = this.props;

    this.esConnector = requestBuilder(connection);
    this.run(specs);
  }

  componentDidUpdate(oldProps) {
    if (equals(oldProps.specs, this.props.specs)) {
      return;
    }
    this.run(this.props.specs);
  }

  componentWillUnmount() {
    this.charts$.unsubscribe();
  }

  getPlacement(i) {
    return this.placements[i];
  }

  resetCharts(specs) {
    this.setState({ charts: {} });
    this.placements = buildIndexTable(specs);
  }

  run(specs) {
    this.resetCharts(specs);
    this.charts$ = from(this.generateCharts())
      .pipe(mergeAll())
      .subscribe(data => {
        if (data.length === 0) {
          return false;
        }
        const [chart, i] = data[0];
        this.setState(pState => ({
          charts: { ...pState.charts, [i]: chart },
        }));
        return true;
      });
  }

  generateCharts() {
    const { specs, initialValues, queryProp, chartLib, createChart } = this.props;
    return specs.map((spec, specI) => {
      const Parent = propOr(React.Fragment, 'Parent', spec);
      const pProps = propOr({}, 'parentProps', spec);
      const cProps = propOr({}, 'chartProps', spec);

      const handler = propOr(undefined, spec.handler, chartLib.handlers);
      const tailors = propOr({}, 'tailors', handler);
      const hasEnough = propOr(() => false, 'hasEnough', handler);
      const index = this.getPlacement(specI);

      function makeChart(data) {
        if (!data) {
          return of([]);
        }
        let cleanData = data;
        if (typeof handler.transform === 'function') {
          cleanData = handler.transform(data);
        }
        if (!cleanData) {
          return of([]);
        }

        const charts = spec.charts.map((chartName, chartI) => {
          const schema = chartLib.schemas[chartName];
          const tailor = tailors[chartName] || identity;
          const tailoredData = tailor(clone(cleanData));

          if (tailoredData === false) {
            return false;
          }

          const chart = (
            <Parent {...pProps} key={sid.generate()}>
              {createChart(schema, tailoredData, cProps, spec.listeners)}
            </Parent>
          );
          return [chart, index + chartI];
        });
        // As we return false when we don't have data, this will filter that out
        return of(charts.filter(p => p));
      }

      if (!handler) {
        throw new Error(`Handler ${spec.handler} not found`);
      }
      const dataSource = hasEnough(initialValues)
        ? of(initialValues)
        : this.esConnector(handler.query(queryProp));
      return dataSource.pipe(switchMap(makeChart));
    });
  }

  render() {
    const { renderer } = this.props;
    const items = Object.values(this.state.charts);
    if (items.length === 0) {
      return null;
    } else if (renderer) {
      return renderer(items);
    }
    return <React.Fragment>{items}</React.Fragment>;
  }
}

ChartManager.propTypes = {
  connection: PropTypes.shape({
    resourceId: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
  }).isRequired,
  specs: PropTypes.arrayOf(
    PropTypes.shape({
      handler: PropTypes.string.isRequired,
      charts: PropTypes.arrayOf(PropTypes.string).isRequired,
      listeners: PropTypes.shape({}),
      Parent: PropTypes.func,
      parentProps: PropTypes.shape({}),
    })
  ).isRequired,
  chartLib: PropTypes.shape({
    handlers: PropTypes.shape({}).isRequired,
    schemas: PropTypes.shape({}).isRequired,
  }).isRequired,
  initialValues: PropTypes.shape({}),
  queryProp: PropTypes.shape({}),
  requestBuilder: PropTypes.func.isRequired,
  renderer: PropTypes.func,
  createChart: PropTypes.func,
};

ChartManager.defaultProps = {
  initialValues: {},
  queryProp: {},
  renderer: undefined,
  createChart: defaultCreateChart,
};
