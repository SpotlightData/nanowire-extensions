import * as React from 'react';
import * as R from 'ramda';
import { Timeline as AntTimeline } from 'antd';
import { Dictionary } from 'v2/source/interfaces';

export interface TimelineProps<T> {
  accessor: string | ((item: T) => string);
  items: T[];
}

export function Timeline<T extends Dictionary<T>>({
  items,
  accessor,
}: TimelineProps<T>): React.ReactElement {
  const getter = typeof accessor === 'string' ? R.prop(accessor) : accessor;

  function line(entry: T, index: number) {
    const text = getter(entry);
    return <AntTimeline.Item key={`${text}-${index}`}>{text}</AntTimeline.Item>;
  }

  return <AntTimeline>{items.map(line)}</AntTimeline>;
}

Timeline.defaultProps = {
  items: [],
  accessor: 'title',
};

Timeline.displayName = 'Timeline';
