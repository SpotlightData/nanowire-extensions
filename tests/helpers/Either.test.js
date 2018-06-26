import { Either } from '@spotlightdata/nanowire-extensions';

describe('helpers/Either', () => {
  it('create correct type from arguments', () => {
    expect(new Either(true, false).isLeft).toBe(true);
    expect(new Either(null, []).isLeft).toBe(false);
  });

  it('should map functions over arguments correctly', () => {
    expect(
      Either.from(1, false)
        .leftMap(a => a + 1)
        .takeLeft()
    ).toBe(2);
    expect(
      Either.from(null, 1)
        .rightMap(a => a + 1)
        .takeRight()
    ).toBe(2);
  });

  it('should not change the type when using map function', () => {
    const leftCall = jest.fn();
    const rightCall = jest.fn();

    Either.from(1, false)
      .leftMap(a => a + 1)
      .rightMap(rightCall);
    Either.from(false, 1)
      .rightMap(a => a + 1)
      .leftMap(leftCall);

    expect(leftCall.mock.calls.length).toBe(0);
    expect(rightCall.mock.calls.length).toBe(0);
  });
});
