import * as React from 'react';
import { Timeline as AntTimeline } from 'antd';

export interface TimelineProps<T> {
  accessor: string | ((item: T) => string);
  items: T[];
}

export function Timeline<T>({ items, accessor }: TimelineProps<T>): React.ReactElement {
  const getter = typeof accessor === 'string' ? (a: T) => a[accessor] : accessor;

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
