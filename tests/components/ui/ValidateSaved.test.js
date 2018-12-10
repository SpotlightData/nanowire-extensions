import React from 'react';
import { ValidateSaved } from '@spotlightdata/nanowire-extensions';
import { render, fireEvent } from 'react-testing-library';

const make = props => (
  <ValidateSaved
    saved={true}
    validate={() => false}
    format={a => !a}
    whenInValid={console.error}
    whenValid={console.log}
    contentRender={valid => (valid ? 'valid' : 'invalid')}
    loadingRender={() => <span>Loading</span>}
    {...props}
  />
);

describe('components/ui/ValidateSaved', done => {
  it('should call whenInvalid if nothing is saved', () => {
    const whenInValid = jest.fn();
    render(
      make({
        contentRender: isValid => {
          expect(whenInValid).toHaveBeenCalledWith(false);
          done();
        },
      })
    );
  });
  // it('should call onClick handler', () => {
  //   const onClick = jest.fn();
  //   const { container, debug } = render(<SidebarToggle open onClick={onClick} />);
  //   fireEvent.click(container.firstChild, {});
  //   expect(onClick.mock.calls.length).toBe(1);
  // });
});
