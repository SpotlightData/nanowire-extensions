import * as React from 'react';

export interface CollapsiblePanelBareProps {
  collapsed: boolean;
  onClick: (isCollapsed: boolean) => void;
  className?: string;
  extraContent?: React.ReactNode;
  header?: React.ReactNode;
  duration?: number;
  height?: number;
  renderWhenCollapsed?: boolean;
  headerRender?: React.FC<{
    className: string;
    button: React.ReactNode;
    extraContent: React.ReactNode;
  }>;
}
