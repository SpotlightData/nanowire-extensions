import React, { PureComponent } from 'react';
import { bool, node, func, number } from 'prop-types';

import AnimateHeight from 'react-animate-height';

import injectSheets from 'react-jss';
import cn from 'classnames';

import { style, height } from './style';

const CollapsiblePanelBare = props => {
  const {
    children,
    classes,
    className,
    collapsed,
    header,
    extraContent,
    onClick,
    duration,
    headerRender,
    renderWhenCollapsed,
    ...rest
  } = props;
  const rootClass = cn({
    [classes.root]: true,
    [className || '']: true,
    collapsed,
  });
  const arrowClass = cn({
    [classes.arrow]: true,
    right: collapsed,
    down: !collapsed,
  });
  const button = (
    <div role="button" onClick={() => onClick(!collapsed)}>
      <i className={arrowClass} />
      {header}
    </div>
  );
  return (
    <div className={rootClass} {...rest}>
      {headerRender ? (
        headerRender({ className: classes.header, button, extraContent })
      ) : (
        <div className={classes.header}>
          {button}
          <div>{extraContent}</div>
        </div>
      )}
      <AnimateHeight duration={duration} height={collapsed ? 0 : 'auto'}>
        <div className={classes.content}>{collapsed && !renderWhenCollapsed ? null : children}</div>
      </AnimateHeight>
    </div>
  );
};

CollapsiblePanelBare.propTypes = {
  collapsed: bool.isRequired,
  onClick: func.isRequired,
  extraContent: node,
  header: node,
  duration: number,
  headerRenderheaderRender: func,
  renderWhenCollapsed: bool,
};

CollapsiblePanelBare.defaultProps = {
  header: null,
  extraContent: null,
  duration: 400,
  headerRender: null,
  renderWhenCollapsed: true,
};

CollapsiblePanelBare.displayName = 'CollapsiblePanelBare';

export const CollapsiblePanel = injectSheets(style)(CollapsiblePanelBare);
