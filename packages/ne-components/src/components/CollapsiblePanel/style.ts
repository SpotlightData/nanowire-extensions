import * as React from 'react';
import { CollapsiblePanelBareProps } from './interface';

export interface CollapsiblePanelClasses {
  root: string;
  header: string;
  arrow: string;
  content: string;
}

export function calcCollapsiblePanelMargin(height: number) {
  return `calc((${height}px - 1em - ${height / 2}px) / 2)`;
}

export const collapsiblePanelStyle = {
  root: {
    width: '100%',
    borderTop: '1px solid rgb(217, 217, 217)',
    '&:first-child': {
      borderTop: 'none',
    },
    '&.collapsed': {
      height: (props: CollapsiblePanelBareProps) => props.height,
    },
  },
  header: {
    width: '100%',
    padding: '0.5em',
    fontSize: '15px',
    height: (props: CollapsiblePanelBareProps) => props.height,
    '& > div': {
      '&:first-child': {
        float: 'left',
        cursor: 'pointer',
        userSelect: 'none' as React.CSSProperties['userSelect'],
        marginTop: (props: CollapsiblePanelBareProps) => calcCollapsiblePanelMargin(props.height),
      },
      '&:last-child': {
        float: 'right',
      },
    },
  },
  arrow: {
    border: 'solid rgba(0,0,0,.85)',
    borderWidth: '0 1px 1px 0',
    display: 'inline-block',
    padding: '3px',
    transition: 'transform 0.1s linear',
    marginRight: '1em',
    marginBottom: '2px',
    '&.right': {
      transform: 'rotate(-45deg)',
    },
    '&.down': {
      transform: 'rotate(45deg)',
    },
  },
  content: {
    padding: '0.5em',
  },
};
