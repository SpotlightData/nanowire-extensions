import * as React from 'react';
import { MarkedTextEntry } from '@spotlightdata/ne-helpers';
import { Typography } from 'antd';

export const MarkedRowRender: React.FC<{ row: MarkedTextEntry[]; activeClass?: string }> = ({
  row,
  activeClass = 'color-blue-7',
}) => (
  <React.Fragment>
    {row.map(n => (
      <Typography.Text key={n.start} className={n.type === 'marked' ? activeClass : undefined}>
        {n.text}
      </Typography.Text>
    ))}
  </React.Fragment>
);
