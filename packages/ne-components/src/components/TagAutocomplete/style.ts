export interface TagAutocompleteClasses extends Record<string, string> {
  root: string;
}

export const tagAutoCompleteStyle = {
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.1em',
    '& .ant-select-auto-complete.ant-select .ant-input': {
      border: 'none',
      outline: 'none',
      boxShadow: 'none',
    },
  },
};
