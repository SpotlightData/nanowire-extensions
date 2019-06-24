import * as React from 'react';

import AnimateHeight from 'react-animate-height';

import injectSheets from 'react-jss';
import cn from 'classnames';

import { collapsiblePanelStyle, CollapsiblePanelClasses } from './style';
import { CollapsiblePanelBareProps } from './interface';

export interface CollapsiblePanelProps extends CollapsiblePanelBareProps {
  classes: CollapsiblePanelClasses;
}

const CollapsiblePanelBare: React.FC<CollapsiblePanelProps> = props => {
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

CollapsiblePanelBare.defaultProps = {
  header: null,
  extraContent: null,
  duration: 400,
  headerRender: null,
  renderWhenCollapsed: true,
  height: 46,
};

CollapsiblePanelBare.displayName = 'CollapsiblePanelBare';

// @ts-ignore Seems to be react-jss bug, which messes up types on classes that take component props
export const CollapsiblePanel = injectSheets(collapsiblePanelStyle)(CollapsiblePanelBare);
