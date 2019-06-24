import { CollapsiblePanelBareProps } from './interface';

export const height = 46;

export interface CollapsiblePanelClasses {
  root: string;
  header: string;
  arrow: string;
  content: string;
}

export const collapsiblePanelStyle = {
  root: {
    width: '100%',
    borderTop: '1px solid rgb(217, 217, 217)',
    '&:first-child': {
      borderTop: 'none',
    },
    '&.collapsed': {
      height,
    },
  },
  header: (props: CollapsiblePanelBareProps) => ({
    width: '100%',
    padding: '0.5em',
    fontSize: '15px',
    height,
    '& > div': {
      '&:first-child': {
        float: 'left',
        cursor: 'pointer',
        userSelect: 'none',
        marginTop: `calc((${props.height}px - 1em - 22px) / 2)`,
      },
      '&:last-child': {
        float: 'right',
      },
    },
  }),
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
