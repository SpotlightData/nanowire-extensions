import React from 'react';
import { DatePicker } from '@spotlightdata/nanowire-extensions';
import { render, fireEvent, prettyDOM } from 'react-testing-library';

const getCalendarCell = (side, container) =>
  container.parentNode
    .getElementsByClassName(`ant-calendar-range-${side}`)[0]
    .getElementsByClassName('ant-calendar-cell ant-calendar-in-range-cell')[0];

describe('components/antd/DatePicker', () => {
  it('should render', () => {
    const { container } = render(
      <DatePicker minValue={0} maxValue={Date.now()} onFinished={() => false} />
    );
    expect(container).not.toBeNull();
  });

  it('should notify when dates change', () => {
    const onFinished = jest.fn();
    const { container } = render(
      <DatePicker minValue={0} maxValue={Date.now()} onFinished={onFinished} />
    );
    // Opens initial selector
    fireEvent(
      container.getElementsByClassName('ant-calendar-picker-input ant-input')[0],
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    const left = getCalendarCell('left', container);
    const right = getCalendarCell('right', container);
    // Chooses the dates
    fireEvent(left, new MouseEvent('click', { bubbles: true, cancelable: true }));
    fireEvent(right, new MouseEvent('click', { bubbles: true, cancelable: true }));
    expect(onFinished).toHaveBeenCalled();
  });
});
