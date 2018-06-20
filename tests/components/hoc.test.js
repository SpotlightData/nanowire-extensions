import React from 'react';
import { strictComponent } from '@spotlightdata/nanowire-extensions';
import { render } from 'react-testing-library';

// Easier to check if function was called rather than checking dom
const TestComp = ({ fn }) => fn();

describe('components/hoc', () => {
  describe('strictComponent', () => {
    it('should not render if predicate fails', () => {
      const Comp = strictComponent(props => false, props => false)(TestComp);
      const { getByText } = render(<Comp fn={() => 'test'} />);
      expect(() => {
        getByText('test');
      }).toThrow();
    });

    it('should render if predicate does not fail', () => {
      const Comp = strictComponent(props => true, props => false)(TestComp);
      const { getByText } = render(<Comp fn={() => 'test'} />);
      expect(getByText('test')).not.toBeNull();
    });

    it('should call onFail function if render fails', () => {
      const onFail = jest.fn();
      const Comp = strictComponent(props => false, onFail)(TestComp);
      render(<Comp fn={() => 'test'} />);
      expect(onFail).toHaveBeenCalled();
    });
  });
});
