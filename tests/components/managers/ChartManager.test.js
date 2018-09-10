import React from 'react';
import { ChartManager } from '@spotlightdata/nanowire-extensions';
import { render, waitForElement } from 'react-testing-library';
import { of } from 'rxjs';

import { TestObservable } from '../../utils';

const identity = a => a;

const connection = {
  resourceId: 'testId',
  level: 'testLevel',
  token: 'test-token',
};

const specs = [];

const chartLib = (hasEnough = identity, query = () => {}) => ({
  handlers: {
    test: { hasEnough, query },
  },
  schemas: {
    test: a => {},
  },
});

describe('components/managers/ChartManager', () => {
  it('should call request request builder function', () => {
    const requestBuilder = jest.fn();
    const props = { connection, specs, chartLib: chartLib(a => a), requestBuilder };

    render(<ChartManager {...props} />);
    expect(requestBuilder.mock.calls[0][0]).toEqual(props.connection);
  });

  it('should check if handler has enough data before requesting', () => {
    const hasEnough = jest.fn().mockReturnValue(true);
    const request = jest.fn();

    const props = {
      connection,
      specs: [{ charts: [], handler: 'test' }],
      chartLib: chartLib(hasEnough),
      requestBuilder: a => request,
      initialValues: { test: 'test' },
    };

    render(<ChartManager {...props} />);
    expect(hasEnough.mock.calls[0][0]).toEqual(props.initialValues);
    expect(request.mock.calls.length).toBe(0);
  });

  it('should get query from the handler', () => {
    const testQuery = { test: 'test' };
    const queryProp = { queryProp: 'test' };
    const request = jest.fn().mockReturnValue({ pipe: () => of([]) });
    const handlerQuery = jest.fn().mockReturnValue(testQuery);

    const props = {
      connection,
      specs: [{ charts: [], handler: 'test' }],
      chartLib: chartLib(() => false, handlerQuery),
      requestBuilder: a => request,
      initialValues: { test: 'test' },
      queryProp: queryProp,
    };

    render(<ChartManager {...props} />);
    expect(handlerQuery.mock.calls[0][0]).toEqual(queryProp);
    expect(request.mock.calls[0][0]).toEqual(testQuery);
  });

  it('should not make requests cancel each other', async () => {
    const testQuery = { test: 'test' };
    const queryProp = { queryProp: 'test' };

    const hasEnough = jest.fn().mockReturnValue(false);
    const onUnsubscribe = jest.fn();
    const observable = TestObservable.create({
      onUnsubscribe,
      generateData() {
        return { test: 'true' };
      },
    });
    const request = jest.fn().mockReturnValue(observable);
    const handlerQuery = jest.fn().mockReturnValue(testQuery);
    const noChart = () => null;

    const props = {
      connection,
      specs: [{ charts: ['test'], handler: 'test' }, { charts: ['test'], handler: 'test' }],
      chartLib: chartLib(hasEnough, handlerQuery),
      requestBuilder: a => request,
      initialValues: { test: 'test' },
      queryProp: queryProp,
      renderer: items => <div>Test</div>,
      createChart: noChart,
    };

    const { queryByText, debug } = render(<ChartManager {...props} />);
    await waitForElement(() => queryByText('Test'));
    expect(request.mock.calls[0][0]).toEqual(testQuery);
    expect(request.mock.calls[1][0]).toEqual(testQuery);
    expect(onUnsubscribe.mock.calls.length).toBe(0);
  });
});
