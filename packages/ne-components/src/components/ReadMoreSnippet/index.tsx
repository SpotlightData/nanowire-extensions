import * as React from 'react';
import * as R from 'ramda';
import { Typography } from 'antd';
import { MarkedTextEntry, markedTextSnippetsLength } from '@spotlightdata/ne-helpers';
import { MarkedTextRender } from '../MarkedTextRender';

interface ReadMoreSnippetProps {
  entries: MarkedTextEntry[];
  cut?: (entries: MarkedTextEntry[]) => MarkedTextEntry[];
}

export const ReadMoreSnippet: React.FC<ReadMoreSnippetProps> = ({ entries, cut = R.identity }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const toggle = () => setOpen(!open);

  const post = cut(entries);
  const preLength = markedTextSnippetsLength(entries);
  const postLength = markedTextSnippetsLength(post);

  return (
    <Typography.Text>
      <MarkedTextRender entries={open ? entries : post} />
      {preLength !== postLength && (
        <span
          role="button"
          tabIndex={0}
          onClick={toggle}
          style={{ marginLeft: '1em', cursor: 'pointer' }}
          className="color-green-5"
        >
          {open ? 'View less' : `Click to view more (${preLength - postLength} characters)`}
        </span>
      )}
    </Typography.Text>
  );
};
