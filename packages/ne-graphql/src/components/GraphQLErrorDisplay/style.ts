import { Styles } from 'jss';

export interface GraphQLErrorDisplayClasses extends Record<string, string> {
  root: string;
  title: string;
  notice: string;
  code: string;
}

export const graphqlErrorDisplayStyle: Styles = {
  root: {
    height: 'calc(100% - 56px)',
    margin: '2em',
    width: '100%',
  },
  title: {
    color: '#f5222d',
  },
  notice: {
    marginBottom: '2em',
  },
  code: {
    width: '480px',
  },
};
