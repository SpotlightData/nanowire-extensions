import React from 'react';
import { ChartManager } from '@spotlightdata/nanowire-extensions';
import { render } from 'react-testing-library';
import { of } from 'rxjs';

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
});
