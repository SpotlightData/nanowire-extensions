import React from 'react';
import { MenuItem } from '@spotlightdata/nanowire-extensions';
import { render, fireEvent } from 'react-testing-library';
import { Menu, Button } from 'antd';


function generateMenu({ withTooltip, tooltipProps }) {
  return (
    <Menu
      mode="inline"
    >
      <MenuItem withTooltip={withTooltip} tooltipProps={tooltipProps} key="1"><Button>Option 1</Button></MenuItem>
    </Menu>
  );
}

describe('components/antd/MenuItem', () => {
  it('should show tooltip if withTooltip prop is passed', async () => {
    const tooltipProps = {
      trigger: ['click'],
      overlay: <strong className="x-content">Tooltip content</strong>
    };
    const { debug, container, getByText } = render(generateMenu({ withTooltip: true, tooltipProps }));
    fireEvent.click(getByText('Option 1'));
    expect(window.document.getElementsByClassName('ant-tooltip').length).toBe(1)
  });

  it('should not show tooltip if withTooltip prop is passed', async () => {
    const tooltipProps = {
      trigger: ['click'],
      overlay: <strong className="x-content">Tooltip content</strong>
    };
    const { debug, container, getByText } = render(generateMenu({ withTooltip: false, tooltipProps }));
    fireEvent.click(getByText('Option 1'));
    expect(window.document.getElementsByClassName('ant-tooltip').length).toBe(0)
  });
});
