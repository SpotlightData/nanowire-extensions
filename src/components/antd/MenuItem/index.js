import React from 'react';
import PropTypes from 'prop-types';
import { Item } from 'rc-menu';
import { Menu, Tooltip } from 'antd';

/* 
  Because regular ant design component forces to use tooltips,
  which can result is high cpu usage for dom updates
 */
export class MenuItem extends Menu.Item {
  constructor(props) {
    super(props);
  }

  tooltipView(props, tooltipProps) {
    const { inlineCollapsed } = this.context;
    return (
      <Tooltip
        title={inlineCollapsed && props.level === 1 ? props.children : ''}
        placement="right"
        overlayClassName={`${props.rootPrefixCls}-inline-collapsed-tooltip`}
        {...tooltipProps}
      >
        <Item {...props} ref={this.saveMenuItem} />
      </Tooltip>
    );
  }

  itemView(props) {
    return <Item {...props} ref={this.saveMenuItem} />;
  }

  render() {
    const { withTooltip, tooltipProps, ...rest } = this.props;
    if (withTooltip) {
      return this.tooltipView(rest, tooltipProps);
    }
    return this.itemView(rest);
  }
}

MenuItem.propTypes = {
  withTooltip: PropTypes.bool,
  tooltipProps: PropTypes.shape({})
};

MenuItem.defaultProps = {
  withTooltip: false,
  tooltipProps: {},
};
