import React from 'react';
import { ValidateSaved } from '@spotlightdata/nanowire-extensions';
import { render, fireEvent } from 'react-testing-library';

const make = props =>
  render(
    <ValidateSaved
      saved={true}
      validate={() => Promise.resolve(false)}
      format={a => a}
      whenInValid={console.error}
      whenValid={console.log}
      contentRender={valid => (valid ? 'valid' : 'invalid')}
      loadingRender={() => <span>Loading</span>}
      {...props}
    />
  );

describe('components/ui/ValidateSaved', () => {
  it('should call whenInvalid if nothing is saved', () => {
    expect.assertions(1);
    const whenInValid = jest.fn();
    make({
      saved: false,
      whenInValid,
      contentRender: isValid => {
        expect(whenInValid).toHaveBeenCalledWith(false);
        return null;
      },
    });
  });

  it('should call whenInvalid if saved content is not valid', () => {
    expect.assertions(1);
    const whenInValid = jest.fn();
    const obj = { test: 'test' };
    make({
      saved: obj,
      whenInValid,
      validate: () => Promise.resolve(false),
      contentRender: isValid => {
        expect(whenInValid).toHaveBeenCalledWith(obj);
        return null;
      },
    });
  });

  it('should pass validated data to whenValid function', () => {
    expect.assertions(1);
    const obj = { test: 'test' };
    const whenValid = jest.fn();
    make({
      whenValid,
      saved: obj,
      validate: () => Promise.resolve(true),
      contentRender: isValid => {
        expect(whenValid).toHaveBeenCalledWith(obj);
        return null;
      },
    });
  });
});
