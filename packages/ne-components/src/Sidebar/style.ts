import { transition } from '../../helpers';

export type SidebarClasses = {
  root: string;
  collapsed: string;
  fixed: string;
  closeButton: string;
};

export const sidebarStyle = {
  root: {
    '& .ant-menu-item': {
      marginTop: 0,
      '& > .ant-row > div': {
        '& > .anticon': {
          fontSize: '18px',
          marginRight: '30px',
          color: 'inherit',
          ...transition(),
        },
        '& > a': {
          fontWeight: '300',
          display: 'block',
          textDecoration: 'none',
          color: 'inherit',
          ...transition(),
        },
      },
    },
  },
  collapsed: {
    '& .ant-menu-item > .ant-row > div > a': {
      display: 'none',
    },
  },
  fixed: {
    height: '100vh',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 100,
  },
  closeButton: {
    // TODO use colors from theme ?
    color: 'white',
    display: 'flex',
    position: 'absolute',
    top: 0,
    right: 0,
    fontSize: '25px',
    padding: '0.25em',
    cursor: 'pointer',
    zIndex: '100',
  },
};
