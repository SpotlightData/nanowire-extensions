import { Styles } from 'jss';

export interface NotFoundClasses extends Record<string, string> {
  root: string;
  body: string;
}

export const notFoundStyle: Styles = {
  root: {
    height: 'calc(100% - 56px)',
    width: '100%',
    margin: '2em',
  },
  body: {
    width: '360px',
  },
};
