import * as React from 'react';
import { MarkedTextEntry } from '@spotlightdata/ne-helpers';
import { Typography } from 'antd';

export const MarkedTextRender: React.FC<{ entries: MarkedTextEntry[]; activeClass?: string }> = ({
  entries,
  activeClass = 'color-blue-7',
}) => (
  <React.Fragment>
    {entries.map(n => (
      <Typography.Text key={n.start} className={n.type === 'marked' ? activeClass : undefined}>
        {n.text}
      </Typography.Text>
    ))}
  </React.Fragment>
);
