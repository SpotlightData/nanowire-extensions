import React, { Component } from 'react';
import { TableProvider, TableFilter, TableSubscriber } from '@spotlightdata/nanowire-extensions';
import { render } from 'react-testing-library';

import { tryToExpect } from '../../utils';

describe('components/managers/TableManager', () => {
  it('should inject passed items into subscribers', done => {
    const items = [{ test: 'test' }];
    render(
      <TableProvider items={items}>
        <TableSubscriber
          render={content => {
            tryToExpect(done, () => expect(content).toEqual(items));
            return null;
          }}
        />
      </TableProvider>
    );
  });

  it('should re-render when provider items are updated', done => {
    const items1 = [{ test: 'test' }];
    const items2 = [{ test2: 'test2' }];
    let count = 0;

    class TestComponent extends Component {
      state = { items: items1 };

      componentDidMount() {
        setTimeout(() => this.setState({ items: items2 }));
      }

      render() {
        return (
          <TableProvider items={this.state.items}>
            <TableSubscriber
              render={content => {
                tryToExpect(done, () => expect(content).toEqual(items2));
                return null;
              }}
            />
          </TableProvider>
        );
      }
    }

    render(<TestComponent />);
  });

  it('should re-render when filters are updated', done => {
    const items = [{ test: 'test' }, { test: '123test' }];

    const filter = (value, list) => list.filter(l => l.test === value);

    class FilterComponent extends Component {
      componentDidMount() {
        setTimeout(() => this.props.input.onChange('123test'));
      }
      render() {
        return null;
      }
    }

    render(
      <TableProvider items={items}>
        <React.Fragment>
          <TableFilter component={FilterComponent} filter={filter} />
          <TableSubscriber
            render={content => {
              tryToExpect(done, () => expect(content).toEqual([items[1]]));
              return null;
            }}
          />
        </React.Fragment>
      </TableProvider>
    );
  });
});
