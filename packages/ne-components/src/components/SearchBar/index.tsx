import * as React from 'react';
import { createUseStyles } from 'react-jss';
import { Row, Input, Button } from 'antd';
import { InputProps } from 'antd/lib/input';
import cn from 'classnames';

const useSearchBarStyles = createUseStyles({
  marginRight: {
    marginRight: '1em',
  },
  input: {
    extend: 'marginRight',
    width: 'auto',
  },
});

export interface SearchBarProps extends Omit<InputProps, 'onSubmit'> {
  onSubmit(text: string): void;
  initialValue?: string;
  clearOnSubmit?: boolean;
  disableOnEmpty?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSubmit,
  initialValue,
  clearOnSubmit = false,
  className,
  disableOnEmpty,
  ...rest
}) => {
  const classes = useSearchBarStyles();
  const [input, setInput] = React.useState<string>(initialValue || '');
  const disabled = disableOnEmpty && input.length === 0;

  React.useEffect(() => {
    if (initialValue) {
      setInput(initialValue);
    }
  }, [initialValue]);

  const submit = React.useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit(input);
    if (clearOnSubmit) {
      setInput('');
    }
  }, [input, disabled]);

  return (
    <Row type="flex" justify="end">
      <Input
        value={input}
        onInput={e => {
          e.preventDefault();
          e.stopPropagation();
          const element = e.target as HTMLInputElement;
          setInput(element.value);
        }}
        className={cn(classes.input, className)}
        onPressEnter={submit}
        {...rest}
      />
      <Button type="primary" onClick={submit} disabled={disabled}>
        Search
      </Button>
    </Row>
  );
};
