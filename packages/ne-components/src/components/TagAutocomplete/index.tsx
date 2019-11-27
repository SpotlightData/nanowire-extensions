import * as React from 'react';
import { AutoComplete, Row, Tag } from 'antd';
import injectSheet from 'react-jss';
import cn from 'classnames';
import { tagAutoCompleteStyle, TagAutocompleteClasses } from './style';

export interface TagData {
  value: string;
  text: string;
}

export interface TagAutocompleteInteractionProps {
  onSelect(text: string): void;
  onRemove(text: string): void;
}
export interface TagAutocompleteProps extends TagAutocompleteInteractionProps {
  tags: TagData[];
  suggestions: TagData[];
  onSearch(text: string): void;
  search: string;
}

export interface TagAutocompleteBareProps extends TagAutocompleteProps {
  classes: TagAutocompleteClasses;
}

export function TagAutocompleteBare({
  tags,
  suggestions,
  onSearch,
  onSelect,
  onRemove,
  classes,
  search,
}: TagAutocompleteBareProps): React.ReactElement {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const inputRef = React.createRef<AutoComplete>();

  return (
    <div
      className={cn(classes.root, 'ant-select-selection')}
      onClick={() => {
        inputRef.current.focus();
      }}
    >
      {tags.map(tag => (
        <Tag key={tag.value} closable onClose={() => onRemove(tag.value)}>
          {tag.text}
        </Tag>
      ))}
      <AutoComplete
        open={isOpen}
        onFocus={() => setIsOpen(true)}
        onBlur={() => {
          setIsOpen(false);
        }}
        ref={inputRef}
        value={search}
        style={{ width: '100%' }}
        dataSource={suggestions}
        onChange={text => {
          onSearch(text as string);
        }}
        onSearch={onSearch}
        onSelect={(text: string) => {
          onSearch('');
          onSelect(text);
        }}
      />
    </div>
  );
}
export const TagAutocomplete: React.ComponentType<TagAutocompleteProps> = injectSheet(
  tagAutoCompleteStyle
)(TagAutocompleteBare);
