import React, { Component } from 'react';
import { func, bool, any, number } from 'prop-types';

import throttle from 'lodash.throttle';
import { Loading } from '../../ui/Loading';

const defaultLoadRender = () => <Loading />;
const defaultHasEnough = () => false;

export class ElasticConsumer extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true, data: undefined, noData: false, childState: undefined };

    this.request$ = undefined;
    this.throttledUpdate = throttle(this.tryToUpdate, props.throttle);
  }

  componentDidUpdate(prevProps, _prevState) {
    const sameQueryProp = prevProps.queryProp === this.props.queryProp;
    const sameInitialValue = prevProps.initialValue === this.props.initialValue;
    if ((!sameQueryProp || !sameInitialValue) && !this.props.manualFetch) {
      this.tryToUpdate();
    }
  }

  componentDidMount() {
    if (!this.props.manualFetch) {
      this.tryToUpdate();
    }
  }

  componentWillUnmount() {
    if (this.request$) {
      this.request$.unsubscribe();
    }
  }

  fetch = state => {
    this.setState({ childState: state });
    this.throttledUpdate(state);
  };

  tryToUpdate(state) {
    const { initialValue, hasEnough, makeQuery, request, queryProp } = this.props;

    if (typeof state === undefined) {
      this.setState({ loading: true, data: initialValue });
    }

    if (hasEnough(initialValue)) {
      this.setState({ loading: false, data: initialValue });
    } else {
      // Make sure previouse request is cancelled
      if (this.request$) {
        this.request$.unsubscribe();
      }
      this.request$ = request(makeQuery(queryProp, state)).subscribe(response => {
        if (response === null) {
          this.setState({ loading: false, noData: true });
        } else {
          this.setState({ loading: false, noData: false, data: response });
        }
      });
    }
  }

  render() {
    const { render, loadRender } = this.props;
    const { loading, data, noData, childState } = this.state;
    if (loading) {
      return loadRender();
    } else if (noData) {
      return null;
    }
    const content = render(data, childState, this.fetch);
    if (content === false) {
      return null;
    }
    return content;
  }
}

/*
  TODO
  - add re-run function (could be passed a value as well) ?
  - add onFail or onFailRender functions?
 */

ElasticConsumer.propTypes = {
  loadRender: func,
  initialValue: any,
  // Some components will need to request the data manually
  manualFetch: bool,
  queryProp: any,
  // BEFORE request is made validate if there is enough data to render, just using initialValue
  hasEnough: func,
  // Builds elastic search query
  makeQuery: func.isRequired,
  // Custom rendering function that will be passed the data. If returns false, nothing is rendered
  render: func.isRequired,
  // Function that the query will be passed to
  // MUST return an rxjs observable or return object with .subscribe(fn) method
  request: func.isRequired,
  throttle: number,
};

ElasticConsumer.defaultProps = {
  loadRender: defaultLoadRender,
  hasEnough: defaultHasEnough,
  initialValue: undefined,
  manualFetch: false,
  throttle: 400,
};
